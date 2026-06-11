
let voices = [];

speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
};

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const inputSpeakBtn = document.getElementById("inputSpeakBtn");
const outputSpeakBtn = document.getElementById("outputSpeakBtn");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");

/* 🔊 INPUT TEXT TO SPEECH */
inputSpeakBtn.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (!text) return;
 
  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = sourceLang.value === "hi" ? "hi-IN" : "en-US";
  speechSynthesis.speak(utter);
});

/* 🌐 TRANSLATE + AUTO SPEAK OUTPUT */
translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return;

  try {
    const res = await fetch("http://localhost:5001/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        source: sourceLang.value,
        target: targetLang.value
      })
    });

    const data = await res.json();

    outputText.value = data.translatedText;

    // 🔊 FORCE SPEAK OUTPUT
    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(data.translatedText);

    const voiceMap = {
      hi: "hi-IN",
      en: "en-US",
      fr: "fr-FR",
      de: "de-DE",
      es: "es-ES",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      ru: "ru-RU",
      zh: "zh-CN",
      ar: "ar-SA",
      ta: "ta-IN",
      te: "te-IN",
      mr: "mr-IN",
      ur: "ur-PK"
    };

    const lang = voiceMap[targetLang.value] || "en-US";
    utter.lang = lang;

    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === lang);
    if (voice) utter.voice = voice;

    speechSynthesis.speak(utter);

  } catch (err) {
    alert("Translation failed");
  }
});

/* 🔊 OUTPUT SPEAK BUTTON */
outputSpeakBtn.addEventListener("click", () => {
  if (!outputText.value) return;

  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance();
  u.text = outputText.value;
  u.lang = "hi-IN"; // hardcoded Hindi for test

  u.onstart = () => console.log("Speech started");
  u.onerror = (e) => console.log("Speech error", e);

  speechSynthesis.speak(u);
});

/* 📋 COPY OUTPUT */
copyBtn.addEventListener("click", () => {
  if (!outputText.value) return;
  navigator.clipboard.writeText(outputText.value);
  alert("Copied!");
});