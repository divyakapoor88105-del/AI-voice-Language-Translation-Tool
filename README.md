# AI-voice-Language-Translation-Tool
AI Voice Language Translator is a web-based application that enables users to translate text between multiple languages with an interactive black-themed UI. It supports source and target language selection, real-time online translation, text-to-speech for both input and output, and a copy feature for better accessibility and usability.

## 🚀 Features

### 🔤 Text Translation
- Enter text manually in the input box
- Select **source** and **target** languages
- Get instant translated output using an **online translation API**

### 🌐 Multiple Languages (A–Z)
- Supports multiple languages such as:
  - Arabic, Bengali, Chinese, English, French, German, Hindi, Japanese, Korean, Marathi, Portuguese, Russian, Spanish, Tamil, Telugu, Turkish, Urdu, and more
- Languages are listed **alphabetically** for better user experience

### 🔊 Text-to-Speech (TTS)
- **Speak Input**: Converts typed input text into speech
- **Speak Output**: Converts translated text into speech automatically
- Supports language-specific voice output

### 📋 Copy to Clipboard
- One-click copy button to copy translated text easily

### 🎨 Modern UI
- Clean **black-themed interface**
- Side-by-side layout:
  - **Left** → Input
  - **Right** → Output
- Designed for clarity, accessibility, and hackathon presentation


## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Web Speech API (Text-to-Speech)

### Backend
- Node.js
- Express.js
- Online Translation API (MyMemory)

---

## ⚙️ How It Works

1. User enters text in the input box  
2. Selects source & target language  
3. Clicks **Translate**  
4. Backend sends request to translation API  
5. Translated text is displayed on screen  
6. Translated text is automatically spoken aloud  
7. User can copy or replay speech if needed

## ▶️ How to Run Locally

### Backend
```bash
cd backend
npm install
node server.js
### Frontend
Open frontend/index.html in browser
OR
Use VS Code Live Server extension
