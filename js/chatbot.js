/**
 * Department Library AI Chatbot
 * AI Chatbot Engine (Pattern Recognition NLP, Voice TTS/STT, Session Logging)
 */

import { getFaqs, getBooks, getFaculty, getNotices } from "./db.js";

// Session storage key
const CHAT_LOGS_KEY = "lib_conversation_logs";
const VOICE_TOGGLE_KEY = "lib_voice_output_enabled";

// Chat Engine State
let isVoiceEnabled = localStorage.getItem(VOICE_TOGGLE_KEY) === "true";
let speechSynth = window.speechSynthesis;
let speechRecog = null;
let isRecording = false;

// Seed FAQs, Books, and Faculty lists globally to avoid reloading on every key hit
let faqs = [];
let books = [];
let faculty = [];
let notices = [];

// Initialize Chatbot UI bindings
export function initChatbot() {
    const triggerBtn = document.getElementById("chatbot-trigger-btn");
    const windowBox = document.getElementById("chatbot-window-box");
    const minimizeBtn = document.getElementById("chat-minimize-btn");
    const voiceToggleBtn = document.getElementById("chat-voice-toggle");
    const inputForm = document.getElementById("chat-input-form");
    const micBtn = document.getElementById("chat-mic-btn");
    
    if (!triggerBtn || !windowBox) return;

    // 1. Load Data
    loadBotIntelligence();

    // 2. Open/Close Actions
    triggerBtn.addEventListener("click", () => {
        windowBox.classList.add("active");
        document.getElementById("chat-alert-dot").classList.add("d-none");
        scrollToBottom();
        // Give focus to input
        setTimeout(() => document.getElementById("chat-user-input").focus(), 300);
    });

    minimizeBtn.addEventListener("click", () => {
        windowBox.classList.remove("active");
    });

    // 3. Render Session Log History
    renderLogsHistory();

    // 4. Submit message
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleUserMessageSubmit();
    });

    // 5. Setup Speech Recognition
    setupSpeechRecognition();
    micBtn.addEventListener("click", () => {
        if (isRecording) {
            stopVoiceRecognition();
        } else {
            startVoiceRecognition();
        }
    });

    // 6. Setup Speech Synthesis (Voice Output Toggle)
    updateVoiceToggleButtonUI();
    voiceToggleBtn.addEventListener("click", () => {
        isVoiceEnabled = !isVoiceEnabled;
        localStorage.setItem(VOICE_TOGGLE_KEY, isVoiceEnabled);
        updateVoiceToggleButtonUI();
        window.showToast("Voice Output", isVoiceEnabled ? "Text-to-speech enabled." : "Text-to-speech muted.", "info");
    });
}

// Automatically trigger initialization if file imported
setTimeout(initChatbot, 100);

async function loadBotIntelligence() {
    try {
        faqs = await getFaqs();
        books = await getBooks();
        faculty = await getFaculty();
        notices = await getNotices();
    } catch (e) {
        console.error("[Chatbot] Failed to load cognitive assets:", e);
    }
}

/**
 * Speech Recognition STT Implementation
 */
function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        document.getElementById("chat-mic-btn").style.display = "none";
        return;
    }

    speechRecog = new SpeechRecognition();
    speechRecog.continuous = false;
    speechRecog.lang = 'en-US';
    speechRecog.interimResults = false;
    speechRecog.maxAlternatives = 1;

    speechRecog.onstart = () => {
        isRecording = true;
        const micIcon = document.querySelector("#chat-mic-btn span");
        micIcon.textContent = "mic_off";
        document.getElementById("chat-mic-btn").classList.add("voice-recording-pulsing");
    };

    speechRecog.onresult = (event) => {
        const resultText = event.results[0][0].transcript;
        document.getElementById("chat-user-input").value = resultText;
    };

    speechRecog.onerror = (e) => {
        console.error("Speech Recognition Error:", e);
        stopVoiceRecognition();
    };

    speechRecog.onend = () => {
        stopVoiceRecognition();
        // Automatically submit voice transcription
        const text = document.getElementById("chat-user-input").value.trim();
        if (text.length > 0) {
            handleUserMessageSubmit();
        }
    };
}

function startVoiceRecognition() {
    if (speechRecog) {
        speechRecog.start();
    }
}

function stopVoiceRecognition() {
    if (speechRecog && isRecording) {
        speechRecog.stop();
        isRecording = false;
        const micIcon = document.querySelector("#chat-mic-btn span");
        micIcon.textContent = "mic";
        document.getElementById("chat-mic-btn").classList.remove("voice-recording-pulsing");
    }
}

function updateVoiceToggleButtonUI() {
    const btnIcon = document.querySelector("#chat-voice-toggle span");
    if (!btnIcon) return;
    btnIcon.textContent = isVoiceEnabled ? "volume_up" : "volume_off";
}

/**
 * Handle Submissions
 */
function handleUserMessageSubmit() {
    const input = document.getElementById("chat-user-input");
    const text = input.value.trim();
    if (text.length === 0) return;

    input.value = "";
    appendMessage(text, "user");
    
    // Show typing animation
    appendTypingIndicator();
    
    // Simulate AI response offset
    setTimeout(async () => {
        removeTypingIndicator();
        const responseText = await processCognitiveResponse(text);
        appendMessage(responseText, "bot");
        
        // Read response aloud if toggle is on
        if (isVoiceEnabled && speechSynth) {
            speechSynth.cancel(); // Mute overlapping voice lines
            const speechText = responseText.replace(/<\/?[^>]+(>|$)/g, ""); // strip HTML tags
            const utterance = new SpeechSynthesisUtterance(speechText);
            speechSynth.speak(utterance);
        }
    }, 1000);
}

/**
 * Core Matching NLP Framework
 */
async function processCognitiveResponse(userQuery) {
    try {
    const response = await fetch("https://library-chatbot-api.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: userQuery
        })
    });

    const data = await response.json();

    if (data.reply) {
        return data.reply;
    }

} catch (error) {
    console.error("Gemini API Error:", error);
    }
    const queryClean = userQuery.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const tokens = queryClean.split(/\s+/);
    
    // 1. CHECK FACULTY DETAILS MATCH
    const facultyMatch = searchFacultyDetails(queryClean, tokens);
    if (facultyMatch) return facultyMatch;

    // 2. CHECK BOOK AVAILABILITY MATCH
    const bookMatch = searchBookAvailability(queryClean, tokens);
    if (bookMatch) return bookMatch;

    // 3. CHECK FAQ COLLECTION KEYWORDS
    let bestMatch = null;
    let highestScore = 0;

    faqs.forEach(faq => {
        let score = 0;
        faq.keywords.forEach(keyword => {
            if (tokens.includes(keyword) || queryClean.includes(keyword)) {
                score++;
            }
        });
        
        if (score > highestScore) {
            highestScore = score;
            bestMatch = faq;
        }
    });

    if (bestMatch && highestScore > 0) {
        return bestMatch.answer;
    }

    // 4. CHECK NOTICE BOARD MATCHES
    if (tokens.includes("notice") || tokens.includes("exam") || tokens.includes("schedule")) {
        const topNotices = notices.slice(0, 2);
        if (topNotices.length > 0) {
            return `Here are the latest Notice Board announcements:<br>` + 
                topNotices.map(n => `• <strong>${n.title}</strong> (${n.date}): ${n.content}`).join("<br><br>");
        }
    }

    // 5. FALLBACK DIALOGUE
    return "I'm sorry, I don't quite understand that. You can ask me about library hours, rules, book issues/returns, check specific book availability, or get faculty contact info.";
}

function searchFacultyDetails(query, tokens) {
    // Check if user is asking about faculty, HOD, or staff names
    for (let f of faculty) {
        const nameParts = f.name.toLowerCase().split(/\s+/);
        // check if name is mentioned
        const nameMentioned = nameParts.some(part => part.length > 2 && query.includes(part));
        const isHodQuery = (query.includes("hod") || query.includes("head")) && f.designation.toLowerCase().includes("hod");

        if (nameMentioned || isHodQuery) {
            return `Here are the details for <strong>${f.name}</strong>:<br>
                    • Designation: ${f.designation}<br>
                    • Dept: ${f.department} Engineering<br>
                    • Qualifications: ${f.qualification}<br>
                    • Email: <a href="mailto:${f.email}">${f.email}</a><br>
                    • Contact: ${f.contact}`;
        }
    }
    return null;
}

function searchBookAvailability(query, tokens) {
    // Check if user queries book names
    if (tokens.includes("book") || tokens.includes("available") || tokens.includes("read") || tokens.includes("borrow") || tokens.includes("author")) {
        // Find matching book
        for (let b of books) {
            const titleWords = b.title.toLowerCase().split(/\s+/);
            const authorWords = b.author.toLowerCase().split(/\s+/);
            
            // Check if title keywords or author keywords overlap significantly with query
            const titleMatch = titleWords.filter(w => w.length > 3 && query.includes(w)).length >= 2;
            const authorMatch = authorWords.filter(w => w.length > 2 && query.includes(w)).length >= 1;

            if (titleMatch || authorMatch || query.includes(b.title.toLowerCase()) || query.includes(b.author.toLowerCase())) {
                const availStatus = b.available > 0 
                    ? `<span class="text-success fw-600">Available (${b.available} copies left)</span>` 
                    : `<span class="text-danger fw-600">Out of Stock</span>`;
                
                return `I found a matching book in our library shelves:<br>
                        • <strong>${b.title}</strong><br>
                        • Author: ${b.author}<br>
                        • Status: ${availStatus}<br>
                        • Shelf Location: ${b.location}<br>
                        • Department: Sem ${b.semester} (${b.department})`;
            }
        }
    }
    return null;
}

/**
 * Message DOM Rendering & Sessions Caches
 */
function appendMessage(text, sender) {
    const logsContainer = document.getElementById("chat-logs-container");
    if (!logsContainer) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgHTML = `
        <div class="chat-message ${sender}">
            <div class="chat-msg-avatar">
                <span class="material-icons">${sender === 'bot' ? 'smart_toy' : 'person'}</span>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">${text}</div>
                <div class="chat-msg-time">${time}</div>
            </div>
        </div>
    `;

    logsContainer.insertAdjacentHTML("beforeend", msgHTML);
    scrollToBottom();

    // Cache log
    saveMessageToSession(text, sender, time);
}

function appendTypingIndicator() {
    const logsContainer = document.getElementById("chat-logs-container");
    if (!logsContainer) return;

    const indicatorHTML = `
        <div class="chat-message bot" id="chat-typing-indicator-node">
            <div class="chat-msg-avatar">
                <span class="material-icons">smart_toy</span>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text py-2">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    logsContainer.insertAdjacentHTML("beforeend", indicatorHTML);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator-node");
    if (indicator) {
        indicator.remove();
    }
}

function scrollToBottom() {
    const logsContainer = document.getElementById("chat-logs-container");
    if (logsContainer) {
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }
}

function saveMessageToSession(text, sender, time) {
    const logs = JSON.parse(sessionStorage.getItem(CHAT_LOGS_KEY)) || [];
    logs.push({ text, sender, time });
    sessionStorage.setItem(CHAT_LOGS_KEY, JSON.stringify(logs));
}

function renderLogsHistory() {
    const logsContainer = document.getElementById("chat-logs-container");
    const suggestionsContainer = document.getElementById("chat-suggestion-container");
    if (!logsContainer) return;

    const cached = sessionStorage.getItem(CHAT_LOGS_KEY);
    
    if (!cached) {
        // Inject Welcome Message
        const initialText = "Hello! I am Liby, your Department Library AI Assistant. Ask me about books, syllabus papers, timings, or faculty members!";
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        logsContainer.innerHTML = `
            <div class="chat-message bot">
                <div class="chat-msg-avatar">
                    <span class="material-icons">smart_toy</span>
                </div>
                <div class="chat-msg-content">
                    <div class="chat-msg-text">${initialText}</div>
                    <div class="chat-msg-time">${time}</div>
                </div>
            </div>
        `;
        sessionStorage.setItem(CHAT_LOGS_KEY, JSON.stringify([{ text: initialText, sender: "bot", time }]));
    } else {
        const logs = JSON.parse(cached);
        logsContainer.innerHTML = logs.map(msg => `
            <div class="chat-message ${msg.sender}">
                <div class="chat-msg-avatar">
                    <span class="material-icons">${msg.sender === 'bot' ? 'smart_toy' : 'person'}</span>
                </div>
                <div class="chat-msg-content">
                    <div class="chat-msg-text">${msg.text}</div>
                    <div class="chat-msg-time">${msg.time}</div>
                </div>
            </div>
        `).join('');
    }

    // Populate suggested questions
    const suggestions = [
        "Library Rules",
        "Library Timings",
        "Overdue Fine?",
        "Computer Books?"
    ];

    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = suggestions.map(q => `
            <button class="suggestion-chip" data-question="${q}">${q}</button>
        `).join('');

        // Bind clicks
        suggestionsContainer.querySelectorAll(".suggestion-chip").forEach(chip => {
            chip.addEventListener("click", () => {
                document.getElementById("chat-user-input").value = chip.dataset.question;
                handleUserMessageSubmit();
            });
        });
    }
}
