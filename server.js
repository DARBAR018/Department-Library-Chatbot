const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
    res.send("Department Library Chatbot API is running!");
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
You are an AI Department Library Assistant.

Rules:
- Help students with library-related questions.
- Answer questions about books, previous papers, study materials and library rules.
- If the question is general, answer politely.
- Keep answers short and easy to understand.

Student Question:
${message}
`;

        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        res.json({ reply });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            reply: "Sorry, AI server is not available right now."
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
