const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  }),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// TEMP STORAGE (NO DATABASE)
let storedTokens = [];

// Save token from frontend
app.post("/save-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({ success: false, error: "Token missing" });
  }

  if (!storedTokens.includes(token)) {
    storedTokens.push(token);
    console.log("Token saved:", token);
  } else {
    console.log("Token already exists.");
  }

  res.json({ success: true });
});

// Send notification to a single token
app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  if (!token) {
    return res.json({ success: false, error: "FCM token is required" });
  }

  const message = {
    token,
    notification: {
      title: title || "Default Title",
      body: body || "Default Message Body"
    }
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);
    res.json({ success: true, response });
  } catch (error) {
    console.error("Error sending:", error);
    res.status(400).json({ success: false, error });
  }
});

// Send notification to ALL tokens
app.post("/broadcast", async (req, res) => {
  const { title, body } = req.body;

  if (storedTokens.length === 0) {
    return res.json({ success: false, message: "No tokens saved yet" });
  }

  let results = [];

  for (let token of storedTokens) {
    try {
      const message = {
        token,
        notification: { title, body }
      };

      const response = await admin.messaging().send(message);
      results.push({ token, response });
    } catch (err) {
      results.push({ token, error: err });
    }
  }

  res.json({ success: true, results });
});

// Start Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
