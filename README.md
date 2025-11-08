# 🎓 VivaChat — AI-Powered Mock Interview Platform

**VivaChat** is an AI-powered platform designed to help students master viva voce (oral examinations) through intelligent mock interviews.  
Practice with 50+ engineering subjects using voice-enabled AI assistants powered by **Vapi AI** and **Google Gemini**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-blue?style=for-the-badge)](https://viva-chat-bot.vercel.app/)
[![Report Bug](https://img.shields.io/badge/Report-Bug-red?style=for-the-badge)](https://github.com/ShlokBajaj3433/Viva-Chat-Bot/issues)
[![Request Feature](https://img.shields.io/badge/Request-Feature-green?style=for-the-badge)](https://github.com/ShlokBajaj3433/Viva-Chat-Bot/issues)

---

## ⚙️ Tech Stack

| Category                      | Technologies                                    |
| ----------------------------- | ----------------------------------------------- |
| **Framework**                 | [Next.js 15.2.2](https://nextjs.org/)           |
| **Language**                  | [TypeScript](https://www.typescriptlang.org/)   |
| **Styling**                   | [Tailwind CSS 4.0](https://tailwindcss.com/)    |
| **UI Components**             | [shadcn/ui](https://ui.shadcn.com/)             |
| **Authentication & Database** | [Firebase 11.4.0](https://firebase.google.com/) |
| **AI Voice**                  | [Vapi AI](https://vapi.ai/)                     |
| **AI Text Generation**        | [Google Gemini](https://ai.google.dev/)         |
| **Form Validation**           | [Zod](https://zod.dev/)                         |
| **Icons**                     | [Lucide React](https://lucide.dev/)             |
| **PDF Generation**            | jsPDF + jsPDF-AutoTable                         |

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Links](#project-links)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

**VivaChat** revolutionizes the way students prepare for oral examinations by offering unlimited AI-powered practice sessions with instant, detailed feedback.  
Practice anytime, anywhere with intelligent voice assistants that simulate real viva scenarios across 50+ engineering subjects.

---

## 🔋 Features

### 🔐 Authentication

- Secure sign-up & login via Firebase
- User profiles and session persistence

### 🎤 AI Voice Interviews

- Real-time voice interaction using **Vapi AI**
- Natural conversation flow and follow-up questions
- Automatic transcript generation

### 📊 Intelligent Feedback

- Instant AI-based performance analysis
- Strengths and weaknesses summary
- Personalized improvement suggestions

### 🎯 Multiple Practice Modes

1. Quick Practice — short sessions
2. Deep Dive — detailed topic exploration
3. Rapid Fire — fast question rounds
4. Mock Exam — full exam simulation
5. Conceptual — theory-based
6. Application Based — practical scenarios

### 📚 Subject Coverage

- **Computer Science:** DSA, DBMS, OS, CN, OOP
- **Electronics:** Digital & Analog Electronics
- **Core Engineering:** Thermodynamics, Mechanics, EMT
- **Mathematics:** Calculus, Linear Algebra, Statistics
- +40 more engineering subjects

### 📈 Dashboard & Analytics

- View interview history
- Track progress and improvement
- Subject-wise analysis and leaderboards

### 💾 PDF Reports

- Download detailed interview reports for offline review

### 💻 Responsive Design

- Fully optimized for desktop, tablet, and mobile

---

## 🚀 Getting Started

Follow these steps to run VivaChat locally.

### Prerequisites

Ensure the following are installed:

- [Git](https://git-scm.com/)
- [Node.js ≥ 18.0.0](https://nodejs.org/)
- [npm ≥ 9.0.0](https://www.npmjs.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/ShlokBajaj3433/Viva-Chat-Bot.git
cd Viva-Chat-Bot

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run the development server
npm run dev
```

Now open http://localhost:3000 in your browser 🎉

---

## 🔐 Environment Variables

Create a .env.local file in the root directory:

```
# Firebase

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Firebase Admin SDK (Server)

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

# Vapi AI

NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_PRIVATE_KEY=your_vapi_private_key

# Google Gemini

GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

```

**App Config:**
- `NEXT_PUBLIC_APP_URL` — Set to `http://localhost:3000` for local development

---

## 🗝️ Getting API Keys

### 🔹 Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password) and Cloud Firestore
4. Copy your Firebase config from Project Settings

### 🔹 Vapi AI
1. Sign up at [Vapi.ai](https://vapi.ai/)
2. Get your API keys from the dashboard
3. Create voice assistants for interviews

### 🔹 Google Gemini
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Generate your API key
3. Enable the Gemini API

---

## 🧩 Project Links

- **Repository:** [GitHub](https://github.com/ShlokBajaj3433/Viva-Chat-Bot)
- **Live Demo:** [Vercel](https://viva-chat-bot.vercel.app/)
- **LinkedIn:** [Shlok Bajaj](https://www.linkedin.com/in/shlok-bajaj/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — Framework
- [Firebase](https://firebase.google.com/) — Auth & Database
- [Vapi AI](https://vapi.ai/) — Voice AI
- [Google Gemini](https://ai.google.dev/) — Text AI
- [shadcn/ui](https://ui.shadcn.com/) — UI Components
- [Vercel](https://vercel.com/) — Deployment

---

<div align="center">

⭐ If you found this project helpful, please give it a star! ⭐
Built with ❤️ by Shlok Bajaj

</div>
