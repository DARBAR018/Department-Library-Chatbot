// chatbot.js - Render API se connect
async function getBotReply(userMsg){
    try {
        const response = await fetch("https://library-chatbot-api.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMsg })
        });

        const data = await response.json();
        return data.reply; // maan ke chal raha hu API { "reply": "..." } return karta hai
        
    } catch (error) {
        return "Server se connect nahi ho pa raha 😅 Thodi der baad try karo";
    }
}

// Chatbox ka button dabane pe ye chalega
document.getElementById("sendBtn").addEventListener("click", async () => {
    let userInput = document.getElementById("userInput").value;
    let botReply = await getBotReply(userInput);
    // yaha reply ko chatbox me show karo
    document.getElementById("chatBox").innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
});
