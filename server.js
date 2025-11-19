/* eslint-env node */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn("Warning: OPENAI_API_KEY not set in environment");
} else {
  console.log("Loaded OpenAI key:", OPENAI_KEY);
}

const client = new OpenAI({ apiKey: OPENAI_KEY });

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Taylor Advice Bot API is running" });
});

app.post("/api/responses", async (req, res) => {
  try {
    const response = await client.chat.completions.create(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    const status = err?.status || 500;
    res.status(status).json({ error: "Proxy server error", details: err?.message || err });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
