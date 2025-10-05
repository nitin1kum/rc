// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config({ path: "../.env" }); // adjust if your .env is one level up

console.log("Gemini key loaded:", process.env.GOOGLE_GEMINI_API_KEY?.slice(0, 8));

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });


app.post("/api/questions", async (req, res) => {
  const { topic } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an AI quiz generator. Generate 5 **fresh and unique** multiple-choice questions about ${topic}.
Return only valid JSON array like this:
[{"question":"...","options":["A","B","C","D"],"answerIndex":0}]`
    });

    let text = response.output_text || response.text || "";
    console.log("Raw AI response:", text);

    // 🧹 Remove markdown & any non-JSON preface
    text = text.replace(/```json/gi, "")
               .replace(/```/g, "")
               .trim();

    // 🧠 Extract JSON array part if Gemini adds intro text
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      text = text.slice(jsonStart, jsonEnd + 1);
    }

    const questions = JSON.parse(text);
    res.json(questions);
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});


// Generate feedback
app.post("/api/feedback", async (req, res) => {
  const { score, topic } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are a quiz coach. The user scored ${score}/5 on ${topic}.
Give a short personalized feedback message (2-3 sentences).`
    });

    let text = response.output_text || response.text || "";
    text = text.replace(/```/g, "").trim();

    res.json({ feedback: text });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
