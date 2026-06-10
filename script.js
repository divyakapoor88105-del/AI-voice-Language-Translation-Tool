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

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = sourceLang.value === "hi" ? "hi-IN" : "en-US";
  speechSynthesis.speak(utter);
});

/* 🌐 TRANSLATE + AUTO SPEAK OUTPUT */
translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return;

  try {
    const res = await fetch("http://localhost:5000/api/translate", {
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

    // 🔊 SPEAK TRANSLATED TEXT
    const utter = new SpeechSynthesisUtterance(data.translatedText);
    utter.lang = targetLang.value === "hi" ? "hi-IN" : "en-US";
    speechSynthesis.speak(utter);

  } catch (err) {
    alert("Translation failed");
  }
});

/* 🔊 OUTPUT SPEAK BUTTON */
outputSpeakBtn.addEventListener("click", () => {
  const text = outputText.value.trim();
  if (!text) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = targetLang.value === "hi" ? "hi-IN" : "en-US";
  speechSynthesis.speak(utter);
});

/* 📋 COPY OUTPUT */
copyBtn.addEventListener("click", () => {
  if (!outputText.value) return;
  navigator.clipboard.writeText(outputText.value);
  alert("Copied!");
});