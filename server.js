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

        const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});
        const prompt = `
You are Department Library AI Assistant.

College Name:
K.D. Polytechnic Patan

Department:
Computer Engineering

Your Responsibilities:

1. Help students politely.

2. Answer about:

- Library Books

- Previous Year Papers

- Faculty Information

- Department Information

- Notices

- Timetable

- Practical Files

- GTU Exams

- Study Materials

- Library Rules

- Issue and Return Books

- Digital Library

3. If student asks programming questions then explain in simple language.

Supported Languages:

English

Hindi

Gujarati

Rules:

Always answer politely.

Use short paragraphs.

If answer is unknown then say:

"I don't have that information. Please contact the library staff."

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
