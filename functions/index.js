const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// 👇 Mock AI endpoint
app.post("/extract-text", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).send("No image URL provided");

    // Just mock response (you can later integrate Gemini or OpenAI)
    const fakeResult = `Prescription extracted from: ${imageUrl}\n\nDetected text: Paracetamol 500mg, Take 1 tablet twice daily`;
    res.send({ result: fakeResult });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing image");
  }
});

// Firebase Function export
exports.api = functions.https.onRequest(app);