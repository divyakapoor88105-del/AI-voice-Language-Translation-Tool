import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

router.post("/translate", async (req, res) => {
  const { text, source = "en", target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ error: "text and target required" });
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${source}|${target}`;

    const response = await fetch(url);
    const data = await response.json();

    // 🔥 SAFE CHECK (IMPORTANT)
    const translated = data?.responseData?.translatedText || null;

    if (!translated) {
      return res.json({
        translatedText: "",
        warning: "Translation temporarily unavailable",
      });
    }

    res.json({
      translatedText: translated,
      source: "online",
    });
  } catch (err) {
    res.status(500).json({
      error: "Translation service failed",
    });
  }
});

export default router;