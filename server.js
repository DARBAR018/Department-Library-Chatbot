const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Department Library Chatbot API is running!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started");
});
