const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");
const chatHeader = document.querySelector("#chat-container .border-bottom");


// Chat History
let chatHistory = [];
let isMinimized = false;

// 1. Chatbox Open/Close
chatToggle.addEventListener("click", () => {
    chatContainer.style.display = "flex";
    chatToggle.style.display = "none";
    if(chatBox.innerHTML === "") {
        showWelcome();
        showQuickButtons();
        addHeaderButtons();
    }
});

chatClose.addEventListener("click", () => {
    chatContainer.style.display = "none";
    chatToggle.style.display = "flex";
});

// 2. Header me extra buttons
function addHeaderButtons() {
if(document.getElementById("header-btns")) return;
let btns = ` 
        <div id="header-btns" style="display:flex; gap:10px;">
            <button id="clear-chat" title="Clear Chat" style="background:none; border:none; color:white; cursor:pointer;"><span class="material-icons" style="font-size:20px;">delete</span></button>
            <button id="minimize-chat" title="Minimize" style="background:none; border:none; color:white; cursor:pointer;"><span class="material-icons" style="font-size:20px;">minimize</span></button>
        </div>
    `;
    chatHeader.insertAdjacentHTML('beforeend', btns);
    
    document.getElementById("clear-chat").onclick = () => {
        if(confirm("Kya tum puri chat delete karna chahte ho?")) {
            chatBox.innerHTML = "";
            chatHistory = [];
            showWelcome();
            showQuickButtons();
        }
    };
    
    document.getElementById("minimize-chat").onclick = () => {
        isMinimized = !isMinimized;
        chatBox.style.display = isMinimized ? "none" : "block";
        document.querySelector("#chat-container .border-top").style.display = isMinimized ? "none" : "flex";
    };
}

// 2. Welcome Message
function showWelcome() {
    let welcome = `Namaste! 🙏 Main **Liby 2.0** hu

**K.D. Polytechnic - Computer Department Library**
Timing: 9:00 AM to 5:00 PM | Mon to Sat

Main ye sab kar sakta hu:

1.  **📚 Book Search** - "Data Structure book" likho
2.  **📄 GTU Papers** - "DSA 2023 paper" likho  
3.  **📢 Notice** - "Exam notice" likho
4.  **❓ Doubt** - "OOP kya hai?" koi bhi sawal
5.  **🔗 Direct Link** - Main link bhejunga to sidha click ho jayega

Tum kya search karna chahte ho?`;
    addBotMessage(welcome);
}

// 3. Quick Reply Buttons
function showQuickButtons() {
    let buttons = `
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
            <button class="quick-btn" onclick="sendQuickMsg('Books available')">📚 Books</button>
            <button class="quick-btn" onclick="sendQuickMsg('GTU Papers')">📄 Papers</button>
            <button class="quick-btn" onclick="sendQuickMsg('Latest Notice')">📢 Notice</button>
            <button class="quick-btn" onclick="sendQuickMsg('Library Timing')">⏰ Timing</button>
        </div>
        <style>
        .quick-btn { background:#0d6efd; color:white; border:none; padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; }
        .quick-btn:hover { background:#0b5ed7; }
        a.chat-link { color:#0d6efd; text-decoration:underline; }
        </style>
    `;
    chatBox.innerHTML += buttons;
}

function sendQuickMsg(msg) {
    userInput.value = msg;
    sendMessage();
}

// 4. Message Functions
function getTime() {
    return new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'});
}
function addUserMessage(msg) {
    chatHistory.push({role: "user", content: msg});
    chatBox.innerHTML += `<div style="text-align:right; margin:10px 0;"><span style="background:#0d6efd; color:white; padding:10px 14px; border-radius:18px 18px 4px 18px; display:inline-block; max-width:85%; word-wrap:break-word;">${msg}</span></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(msg) {
    msg = convertLinks(msg);
    msg = msg.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    msg = msg.replace(/\n/g, '<br>');
    
    chatHistory.push({role: "assistant", content: msg});
    chatBox.innerHTML += `<div style="text-align:left; margin:10px 0;"><span style="background:#f1f3f5; color:#000; padding:10px 14px; border-radius:18px 18px 18px 4px; display:inline-block; max-width:85%; word-wrap:break-word;">${msg}</span></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Link convert karne ka function
function convertLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" class="chat-link">$1</a>');
}

function addTyping() {
    chatBox.innerHTML += `<div id="typing-indicator" style="text-align:left; margin:10px 0;">
        <span style="background:#f1f3f5; padding:10px 14px; border-radius:18px 18px 18px 4px; display:inline-block;">
            Liby likh raha hai<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
        </span>
    </div>`;
    let style = document.createElement('style');
    style.innerHTML = `.dot { animation: blink 1.4s infinite; } .dot:nth-child(2){animation-delay:0.2s} .dot:nth-child(3){animation-delay:0.4s} @keyframes blink{0%,80%,100%{opacity:0}}`;
      if(!document.getElementById('typing-style')) {
        style.id = 'typing-style';
        document.head.appendChild(style);
      }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    let typing = document.getElementById("typing-indicator");
    if(typing) typing.remove();
}
// 6. Voice Input - Mic
function addMicButton() {
    if(!('webkitSpeechRecognition' in window)) return;
    let micBtn = document.createElement('button');
    micBtn.innerHTML = '<span class="material-icons">mic</span>';
    micBtn.style = 'background:none; border:none; color:#0d6efd; cursor:pointer; padding:5px;';
    micBtn.onclick = startVoice;
    userInput.parentElement.insertBefore(micBtn, sendBtn);
}

function startVoice() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (e) => {
        userInput.value = e.results[0][0].transcript;
        sendMessage();
    };
    recognition.start();
}

Render API + Error Handling
async function getBotReply(userMsg){
    addTyping();
    try {
        const response = await fetch("https://library-chatbot-api.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                message: userMsg,
                history: chatHistory.slice(-8),
                department: "Computer Engineering",
                college: "K.D. Polytechnic Patan"
            })
        });

        removeTyping();
        if(!response.ok) throw new Error("API Error: " + response.status);
        const data = await response.json();
        
        if(data.type === "books" && data.books) {
            let bookList = "📚 **Mili hui Books:**<br><br>";
            data.books.forEach((b,i) => {
                bookList += `<b>${i+1}. ${b.title}</b><br>✍️ Author: ${b.author}<br>📍 Rack: ${b.rack || 'N/A'}<br>📖 Status: ${b.available ? 'Available' : 'Issued'}<br><br>`;
            });
            addBotMessage(bookList);
        } 
        else if(data.type === "papers" && data.papers) {
            let paperList = "📄 **GTU Previous Papers:**<br><br>";
            data.papers.forEach(p => {
                paperList += `- <b>${p.subject}</b> ${p.year} Sem-${p.sem} <a href="${p.link}" target="_blank" class="chat-link">[Download PDF]</a><br>`;
            });
            addBotMessage(paperList);
        }
        else if(data.type === "notice" && data.notices) {
            let noticeList = "📢 **Latest Notices:**<br><br>";
            data.notices.forEach(n => noticeList += `- <b>${n.title}</b> <br> 📅 Date: ${n.date}<br> ${n.link ? `<a href="${n.link}" target="_blank" class="chat-link">View Details</a>` : ''}<br><br>`);
            addBotMessage(noticeList);
        }
        else {
            addBotMessage(data.reply || "Maaf karna, main samjha nahi 😅 Kya tum 'Books', 'Papers' ya 'Doubt' ke baare me pooch rahe ho?");
        }
        
    } catch (error) {
        removeTyping();
        addBotMessage("⚠️ Server se connect nahi ho pa raha 😅 <br><br><b>Backup Options:</b><br>1. Website: <a href='https://gtu.ac.in' target='_blank' class='chat-link'>gtu.ac.in</a><br>2. Library: 9AM - 5PM aao<br>3. Email: library@kdpolytechnic.ac.in");
    }
}
// 8. Send Logic + Enter
function sendMessage() {
    let userMsg = userInput.value.trim();
    if(userMsg === "") return;
    addUserMessage(userMsg);
    userInput.value = "";
    getBotReply(userMsg);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMessage();
});

userInput.addEventListener("focus", () => {
    setTimeout(() => chatBox.scrollTop = chatBox.scrollHeight, 300);
});
// Init
addMicButton();        isRecording = true;
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
