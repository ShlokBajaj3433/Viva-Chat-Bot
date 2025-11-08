# 🎓 VivaChat - AI-Powered Mock Interview Platform## <a name="tech-stack">⚙️ Tech Stack</a>

<div align="center">- Next.js

- Firebase

[![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)- Tailwind CSS

[![Firebase](https://img.shields.io/badge/Firebase-11.4.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)- Vapi AI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)- shadcn/ui

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)- Google Gemeni

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)- Zod

**VivaChat** is an AI-powered platform designed to help students master viva voce (oral examinations) through intelligent mock interviews. Practice with 50+ engineering subjects using voice-enabled AI assistants powered by Vapi AI and Google Gemini.## <a name="features">🔋 Features</a>

[Live Demo](https://viva-chat-bot.vercel.app/) • [Report Bug](https://github.com/ShlokBajaj3433/Viva-Chat-Bot/issues) • [Request Feature](https://github.com/ShlokBajaj3433/Viva-Chat-Bot/issues)👉 **Authentication**: Sign Up and Sign In using password/email authentication handled by Firebase.

</div>👉 **Create Interviews**: Easily generate job interviews with help of Vapi voice assistants and Google Gemini.

---👉 **Get feedback from AI**: Take the interview with AI voice agent, and receive instant feedback based on your conversation.

## 📋 Table of Contents👉 **Modern UI/UX**: A sleek and user-friendly interface designed for a great experience.

- [About The Project](#about-the-project)👉 **Interview Page**: Conduct AI-driven interviews with real-time feedback and detailed transcripts.

- [Features](#features)

- [Tech Stack](#tech-stack)👉 **Dashboard**: Manage and track all your interviews with easy navigation.

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)👉 **Responsiveness**: Fully responsive design that works seamlessly across devices.

  - [Installation](#installation)

  - [Environment Variables](#environment-variables)and many more, including code architecture and reusability

- [Usage](#usage)

- [Project Structure](#project-structure)## <a name="quick-start">🤸 Quick Start</a>

- [Contributing](#contributing)

- [License](#license)Follow these steps to set up the project locally on your machine.

- [Contact](#contact)

- [Acknowledgments](#acknowledgments)**Prerequisites**

---Make sure you have the following installed on your machine:

## 🎯 About The Project- [Git](https://git-scm.com/)

- [Node.js](https://nodejs.org/en)

VivaChat revolutionizes the way students prepare for oral examinations by providing:- [npm](https://www.npmjs.com/) (Node Package Manager)

- **AI-Powered Interviews**: Practice with intelligent voice assistants that simulate real viva scenarios**Cloning the Repository**

- **50+ Engineering Subjects**: Comprehensive coverage of popular academic subjects

- **Real-Time Feedback**: Instant AI-generated feedback on your performance```bash

- **Multiple Practice Modes**: 6 different learning styles to suit your needsgit clone https://github.com/adrianhajdin/ai_mock_interviews.git

- **Progress Tracking**: Dashboard to monitor your improvement over timecd ai_mock_interviews

- **Voice & Text Support**: Choose your preferred interaction method```

### Why VivaChat?**Installation**

Traditional viva preparation is limited by:Install the project dependencies using npm:

- ❌ Lack of practice partners

- ❌ Limited feedback availability```bash

- ❌ No personalized learning pathsnpm install

- ❌ Inability to practice anytime, anywhere```

**VivaChat solves these problems** by providing unlimited AI-powered practice sessions with instant, detailed feedback.**Set Up Environment Variables**

---Create a new file named `.env.local` in the root of your project and add the following content:

## ✨ Features```env

NEXT_PUBLIC_VAPI_WEB_TOKEN=

### 🔐 AuthenticationNEXT_PUBLIC_VAPI_WORKFLOW_ID=

- Secure email/password authentication via Firebase

- User profile managementGOOGLE_GENERATIVE_AI_API_KEY=

- Session persistence

NEXT_PUBLIC_BASE_URL=

### 🎤 AI Voice Interviews

- Real-time voice interaction using Vapi AINEXT_PUBLIC_FIREBASE_API_KEY=

- Natural conversation flowNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

- Intelligent follow-up questionsNEXT_PUBLIC_FIREBASE_PROJECT_ID=

- Transcript generationNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

### 📊 Intelligent Feedback SystemNEXT_PUBLIC_FIREBASE_APP_ID=

- Detailed performance analysis

- Strengths and weaknesses identificationFIREBASE_PROJECT_ID=

- Improvement suggestionsFIREBASE_CLIENT_EMAIL=

- Scoring across multiple dimensionsFIREBASE_PRIVATE_KEY=

````

### 🎯 Multiple Practice Modes

1. **Quick Practice** - Fast 10-minute sessionsReplace the placeholder values with your actual **[Firebase](https://firebase.google.com/)**, **[Vapi](https://vapi.ai/?utm_source=youtube&utm_medium=video&utm_campaign=jsmastery_recruitingpractice&utm_content=paid_partner&utm_term=recruitingpractice)** credentials.

2. **Deep Dive** - Comprehensive topic exploration

3. **Rapid Fire** - Quick question rounds**Running the Project**

4. **Mock Exam** - Full exam simulation

5. **Conceptual** - Theory-focused discussions```bash

6. **Application Based** - Practical problem-solvingnpm run dev

````

### 📚 Subject Coverage

- **Computer Science**: DSA, DBMS, OS, CN, OOPOpen [http://localhost:3000](http://localhost:3000) in your browser to view the project.

- **Electronics**: Digital Electronics, Analog Electronics

- **Core Engineering**: Thermodynamics, Mechanics, EMT## <a name="snippets">🕸️ Snippets</a>

- **Mathematics**: Calculus, Linear Algebra, Statistics

- And 40+ more subjects!<details>

<summary><code>globals.css</code></summary>

### 📈 Dashboard & Analytics

- Interview history tracking```css

- Performance trends@import "tailwindcss";

- Subject-wise analysis

- Leaderboard rankings@plugin "tailwindcss-animate";

### 📄 Report Generation@custom-variant dark (&:is(.dark \*));

- Downloadable PDF reports

- Detailed feedback summaries@theme {

- Performance metrics visualization --color-success-100: #49de50;

  --color-success-200: #42c748;

### 🎨 Modern UI/UX --color-destructive-100: #f75353;

- Responsive design for all devices --color-destructive-200: #c44141;

- Dark mode support

- Smooth animations --color-primary-100: #dddfff;

- Professional gradient themes --color-primary-200: #cac5fe;

--- --color-light-100: #d6e0ff;

--color-light-400: #6870a6;

## 🛠️ Tech Stack --color-light-600: #4f557d;

--color-light-800: #24273a;

### Frontend

- **Framework**: [Next.js 15.2.2](https://nextjs.org/) (App Router) --color-dark-100: #020408;

- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/) --color-dark-200: #27282f;

- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) --color-dark-300: #242633;

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

- **Icons**: [Lucide React](https://lucide.dev/) --font-mona-sans: "Mona Sans", sans-serif;

- **Animations**: Tailwind CSS Animate

- **Form Handling**: React Hook Form + Zod validation --bg-pattern: url("/pattern.png");

- **Notifications**: Sonner}

### Backend & Services:root {

- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth) --radius: 0.625rem;

- **Database**: [Cloud Firestore](https://firebase.google.com/products/firestore) --background: oklch(1 0 0);

- **AI Voice**: [Vapi AI](https://vapi.ai/) --foreground: oklch(0.145 0 0);

- **AI Text**: [Google Gemini](https://ai.google.dev/) --card: oklch(1 0 0);

- **PDF Generation**: jsPDF + jsPDF-AutoTable --card-foreground: oklch(0.145 0 0);

  --popover: oklch(1 0 0);

### Development Tools --popover-foreground: oklch(0.145 0 0);

- **Linting**: ESLint --primary: oklch(0.205 0 0);

- **Package Manager**: npm --primary-foreground: oklch(0.985 0 0);

- **Version Control**: Git --secondary: oklch(0.97 0 0);

- **Deployment**: Vercel --secondary-foreground: oklch(0.205 0 0);

  --muted: oklch(0.97 0 0);

--- --muted-foreground: oklch(0.556 0 0);

--accent: oklch(0.97 0 0);

## 🚀 Getting Started --accent-foreground: oklch(0.205 0 0);

--destructive: oklch(0.577 0.245 27.325);

### Prerequisites --border: oklch(0.922 0 0);

--input: oklch(0.922 0 0);

Ensure you have the following installed: --ring: oklch(0.708 0 0);

--chart-1: oklch(0.646 0.222 41.116);

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/)) --chart-2: oklch(0.6 0.118 184.704);

- **npm** >= 9.0.0 (comes with Node.js) --chart-3: oklch(0.398 0.07 227.392);

- **Git** ([Download](https://git-scm.com/)) --chart-4: oklch(0.828 0.189 84.429);

  --chart-5: oklch(0.769 0.188 70.08);

### Installation --sidebar: oklch(0.985 0 0);

--sidebar-foreground: oklch(0.145 0 0);

1. **Clone the repository** --sidebar-primary: oklch(0.205 0 0);

````bash --sidebar-primary-foreground: oklch(0.985 0 0);

git clone https://github.com/ShlokBajaj3433/Viva-Chat-Bot.git  --sidebar-accent: oklch(0.97 0 0);

cd Viva-Chat-Bot  --sidebar-accent-foreground: oklch(0.205 0 0);

```  --sidebar-border: oklch(0.922 0 0);

  --sidebar-ring: oklch(0.708 0 0);

2. **Install dependencies**}

```bash

npm install.dark {

```  --background: oklch(0.145 0 0);

  --foreground: oklch(0.985 0 0);

3. **Set up environment variables**  --card: oklch(0.205 0 0);

```bash  --card-foreground: oklch(0.985 0 0);

# Create .env.local file in the root directory  --popover: oklch(0.205 0 0);

cp .env.example .env.local  --popover-foreground: oklch(0.985 0 0);

```  --primary: oklch(0.922 0 0);

  --primary-foreground: oklch(0.205 0 0);

4. **Configure environment variables** (see [Environment Variables](#environment-variables))  --secondary: oklch(0.269 0 0);

  --secondary-foreground: oklch(0.985 0 0);

5. **Run the development server**  --muted: oklch(0.269 0 0);

```bash  --muted-foreground: var(--light-100);

npm run dev  --accent: oklch(0.269 0 0);

```  --accent-foreground: oklch(0.985 0 0);

  --destructive: oklch(0.704 0.191 22.216);

6. **Open your browser**  --border: oklch(1 0 0 / 10%);

```  --input: oklch(1 0 0 / 15%);

http://localhost:3000  --ring: oklch(0.556 0 0);

```  --chart-1: oklch(0.488 0.243 264.376);

  --chart-2: oklch(0.696 0.17 162.48);

### Environment Variables  --chart-3: oklch(0.769 0.188 70.08);

  --chart-4: oklch(0.627 0.265 303.9);

Create a `.env.local` file in the root directory with the following variables:  --chart-5: oklch(0.645 0.246 16.439);

  --sidebar: oklch(0.205 0 0);

```env  --sidebar-foreground: oklch(0.985 0 0);

# Firebase Configuration  --sidebar-primary: oklch(0.488 0.243 264.376);

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key  --sidebar-primary-foreground: oklch(0.985 0 0);

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain  --sidebar-accent: oklch(0.269 0 0);

NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id  --sidebar-accent-foreground: oklch(0.985 0 0);

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket  --sidebar-border: oklch(1 0 0 / 10%);

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id  --sidebar-ring: oklch(0.556 0 0);

NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id}



# Firebase Admin SDK (Server-side)@theme inline {

FIREBASE_PROJECT_ID=your_firebase_project_id  --radius-sm: calc(var(--radius) - 4px);

FIREBASE_CLIENT_EMAIL=your_firebase_client_email  --radius-md: calc(var(--radius) - 2px);

FIREBASE_PRIVATE_KEY=your_firebase_private_key  --radius-lg: var(--radius);

  --radius-xl: calc(var(--radius) + 4px);

# Vapi AI Configuration  --color-background: var(--background);

NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key  --color-foreground: var(--foreground);

VAPI_PRIVATE_KEY=your_vapi_private_key  --color-card: var(--card);

  --color-card-foreground: var(--card-foreground);

# Google Gemini API  --color-popover: var(--popover);

GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);

# App Configuration  --color-primary-foreground: var(--primary-foreground);

NEXT_PUBLIC_APP_URL=http://localhost:3000  --color-secondary: var(--secondary);

```  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);

#### Getting API Keys  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);

**Firebase Setup:**  --color-accent-foreground: var(--accent-foreground);

1. Go to [Firebase Console](https://console.firebase.google.com/)  --color-destructive: var(--destructive);

2. Create a new project or select existing  --color-border: var(--border);

3. Enable Authentication (Email/Password)  --color-input: var(--input);

4. Enable Cloud Firestore  --color-ring: var(--ring);

5. Get configuration from Project Settings  --color-chart-1: var(--chart-1);

  --color-chart-2: var(--chart-2);

**Vapi AI Setup:**  --color-chart-3: var(--chart-3);

1. Sign up at [Vapi.ai](https://vapi.ai/)  --color-chart-4: var(--chart-4);

2. Get your API keys from dashboard  --color-chart-5: var(--chart-5);

3. Create voice assistants for interviews  --color-sidebar: var(--sidebar);

  --color-sidebar-foreground: var(--sidebar-foreground);

**Google Gemini Setup:**  --color-sidebar-primary: var(--sidebar-primary);

1. Visit [Google AI Studio](https://ai.google.dev/)  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);

2. Create an API key  --color-sidebar-accent: var(--sidebar-accent);

3. Enable Gemini API  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);

  --color-sidebar-border: var(--sidebar-border);

---  --color-sidebar-ring: var(--sidebar-ring);

}

## 💻 Usage

@layer base {

### Starting an Interview  * {

    @apply border-border outline-ring/50;

1. **Sign Up/Login** to your account  }

2. Navigate to **Subjects** page  body {

3. Select a subject you want to practice    @apply bg-background text-foreground;

4. Choose a **Practice Mode**  }

5. Click **Start Interview**  p {

6. Grant microphone permissions (for voice mode)    @apply text-light-100;

7. Begin your AI-powered interview session  }

  h2 {

### Viewing Feedback    @apply text-3xl font-semibold;

  }

1. Complete your interview session  h3 {

2. Navigate to **Past Interviews**    @apply text-2xl font-semibold;

3. Click on any interview to view detailed feedback  }

4. Download PDF report if needed  ul {

    @apply list-disc list-inside;

### Tracking Progress  }

  li {

1. Visit your **Profile** page    @apply text-light-100;

2. View performance analytics  }

3. Check **Leaderboard** for rankings}

4. Track subject-wise improvement

@layer components {

---  .btn-call {

    @apply inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible;

## 📁 Project Structure

    .span {

```      @apply bg-success-100 h-[85%] w-[65%];

ai_mock_interviews/    }

├── app/                          # Next.js App Router  }

│   ├── (auth)/                   # Authentication pages

│   │   ├── sign-in/  .btn-disconnect {

│   │   └── sign-up/    @apply inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-destructive-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive-200 min-w-28;

│   ├── (root)/                   # Main application pages  }

│   │   ├── about/

│   │   ├── blog/  .btn-upload {

│   │   ├── careers/    @apply flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md;

│   │   ├── contact/  }

│   │   ├── cookies/  .btn-primary {

│   │   ├── docs/    @apply w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10;

│   │   ├── faq/  }

│   │   ├── features/  .btn-secondary {

│   │   ├── gdpr/    @apply w-fit !bg-dark-200 !text-primary-200 hover:!bg-dark-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10;

│   │   ├── help/  }

│   │   ├── interview/

│   │   │   └── [id]/  .btn-upload {

│   │   │       └── feedback/    @apply bg-dark-200 rounded-full min-h-12 px-5 cursor-pointer border border-input  overflow-hidden;

│   │   ├── leaderboard/  }

│   │   ├── past-interviews/

│   │   ├── practice-modes/  .card-border {

│   │   ├── press/    @apply border-gradient p-0.5 rounded-2xl w-fit;

│   │   ├── pricing/  }

│   │   ├── privacy/

│   │   ├── profile/  .card {

│   │   ├── status/    @apply dark-gradient rounded-2xl min-h-full;

│   │   ├── subjects/  }

│   │   └── terms/

│   ├── api/                      # API routes  .form {

│   │   ├── interview/    @apply w-full;

│   │   └── vapi/

│   ├── globals.css               # Global styles    .label {

│   ├── layout.tsx                # Root layout      @apply !text-light-100 !font-normal;

│   └── professional-theme.css    # Custom theme    }

├── components/                   # React components

│   ├── ui/                       # shadcn/ui components    .input {

│   ├── home/                     # Home page components      @apply !bg-dark-200 !rounded-full !min-h-12 !px-5 placeholder:!text-light-100;

│   ├── Agent.tsx    }

│   ├── AuthForm.tsx

│   ├── DisplayTechIcons.tsx    .btn {

│   ├── DownloadPDFButton.tsx      @apply !w-full !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !min-h-10 !font-bold !px-5 cursor-pointer;

│   ├── DownloadReportButton.tsx    }

│   ├── Footer.tsx  }

│   ├── FormField.tsx

│   ├── GenerateInterviewWrapper.tsx  .call-view {

│   ├── InterviewCard.tsx    @apply flex sm:flex-row flex-col gap-10 items-center justify-between w-full;

│   ├── InterviewConfigForm.tsx

│   ├── LayoutClient.tsx    h3 {

│   └── Navbar.tsx      @apply text-center text-primary-100 mt-5;

├── constants/                    # App constants    }

│   └── index.ts

├── firebase/                     # Firebase configuration    .card-interviewer {

│   ├── admin.ts                  # Firebase Admin SDK      @apply flex-center flex-col gap-2 p-7 h-[400px] blue-gradient-dark rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full;

│   └── client.ts                 # Firebase Client SDK    }

├── lib/                          # Utility libraries

│   ├── actions/                  # Server actions    .avatar {

│   │   ├── auth.action.ts      @apply z-10 flex items-center justify-center blue-gradient rounded-full size-[120px] relative;

│   │   └── general.action.ts

│   ├── utils.ts                  # Utility functions      .animate-speak {

│   └── vapi.sdk.ts              # Vapi SDK integration        @apply absolute inline-flex size-5/6 animate-ping rounded-full bg-primary-200 opacity-75;

├── public/                       # Static assets      }

│   └── covers/                   # Interview cover images    }

├── types/                        # TypeScript types

│   ├── index.d.ts    .card-border {

│   ├── jspdf-autotable.d.ts      @apply border-gradient p-0.5 rounded-2xl flex-1 sm:basis-1/2 w-full h-[400px] max-md:hidden;

│   └── vapi.d.ts    }

├── .env.local                    # Environment variables (create this)

├── .eslintrc.json               # ESLint configuration    .card-content {

├── components.json               # shadcn/ui configuration      @apply flex flex-col gap-2 justify-center items-center p-7 dark-gradient rounded-2xl min-h-full;

├── next.config.ts               # Next.js configuration    }

├── package.json                  # Dependencies  }

├── postcss.config.mjs           # PostCSS configuration

├── tailwind.config.ts           # Tailwind configuration  .transcript-border {

└── tsconfig.json                # TypeScript configuration    @apply border-gradient p-0.5 rounded-2xl w-full;

````

    .transcript {

--- @apply dark-gradient rounded-2xl min-h-12 px-5 py-3 flex items-center justify-center;

## 🤝 Contributing p {

        @apply text-lg text-center text-white;

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. }

    }

### How to Contribute }

1. **Fork the Project** .section-feedback {

````bash @apply flex flex-col gap-8 max-w-5xl mx-auto max-sm:px-4 text-lg leading-7;

git fork https://github.com/ShlokBajaj3433/Viva-Chat-Bot.git

```    .buttons {

      @apply flex w-full justify-evenly gap-4 max-sm:flex-col max-sm:items-center;

2. **Create your Feature Branch**    }

```bash  }

git checkout -b feature/AmazingFeature

```  .auth-layout {

    @apply flex items-center justify-center mx-auto max-w-7xl min-h-screen max-sm:px-4 max-sm:py-8;

3. **Commit your Changes**  }

```bash

git commit -m 'Add some AmazingFeature'  .root-layout {

```    @apply flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8;

  }

4. **Push to the Branch**

```bash  .card-cta {

git push origin feature/AmazingFeature    @apply flex flex-row blue-gradient-dark rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4;

```  }



5. **Open a Pull Request**  .interviews-section {

    @apply flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch;

### Contribution Guidelines  }



- Write clean, maintainable code  .interview-text {

- Follow the existing code style    @apply text-lg text-center text-white;

- Add comments for complex logic  }

- Update documentation as needed

- Test your changes thoroughly  .progress {

- Create detailed pull request descriptions    @apply h-1.5 text-[5px] font-bold bg-primary-200 rounded-full flex-center;

  }

---

  .tech-tooltip {

## 📝 License    @apply absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md;

  }

Distributed under the MIT License. See `LICENSE` file for more information.

  .card-interview {

---    @apply dark-gradient rounded-2xl min-h-full flex flex-col p-6 relative overflow-hidden gap-10 justify-between;



## 👨‍💻 Contact & Developer    .badge-text {

      @apply text-sm font-semibold capitalize;

<div align="center">    }

  }

### **Shlok Bajaj**}



[![GitHub](https://img.shields.io/badge/GitHub-ShlokBajaj3433-181717?style=for-the-badge&logo=github)](https://github.com/ShlokBajaj3433)@utility dark-gradient {

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Shlok%20Bajaj-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/shlok-bajaj/)  @apply bg-gradient-to-b from-[#1A1C20] to-[#08090D];

[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:shlokbajaj3433@gmail.com)}



**Full Stack Developer | AI Enthusiast | Open Source Contributor**@utility border-gradient {

  @apply bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33];

</div>}



### Project Links@utility pattern {

  @apply bg-[url('/pattern.png')] bg-top bg-no-repeat;

- **Repository**: [https://github.com/ShlokBajaj3433/Viva-Chat-Bot](https://github.com/ShlokBajaj3433/Viva-Chat-Bot)}

- **Live Demo**: [https://viva-chat-bot.vercel.app/](https://viva-chat-bot.vercel.app/)

- **Issues**: [https://github.com/ShlokBajaj3433/Viva-Chat-Bot/issues](https://github.com/ShlokBajaj3433/Viva-Chat-Bot/issues)@utility blue-gradient-dark {

  @apply bg-gradient-to-b from-[#171532] to-[#08090D];

---}



## 🙏 Acknowledgments@utility blue-gradient {

  @apply bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE];

- [Next.js Documentation](https://nextjs.org/docs)}

- [Firebase Documentation](https://firebase.google.com/docs)

- [Vapi AI](https://vapi.ai/) for voice AI capabilities@utility flex-center {

- [Google Gemini](https://ai.google.dev/) for AI text generation  @apply flex items-center justify-center;

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components}

- [Lucide Icons](https://lucide.dev/) for icon library

- [Vercel](https://vercel.com/) for deployment platform@utility animate-fadeIn {

  animation: fadeIn 0.3s ease-in-out;

---}



## 📊 Project Stats@keyframes fadeIn {

  from {

<div align="center">    opacity: 0;

    transform: translateY(5px);

![GitHub Stars](https://img.shields.io/github/stars/ShlokBajaj3433/Viva-Chat-Bot?style=social)  }

![GitHub Forks](https://img.shields.io/github/forks/ShlokBajaj3433/Viva-Chat-Bot?style=social)  to {

![GitHub Issues](https://img.shields.io/github/issues/ShlokBajaj3433/Viva-Chat-Bot)    opacity: 1;

![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ShlokBajaj3433/Viva-Chat-Bot)    transform: translateY(0);

  }

</div>}

````

---

</details>

## 🚀 Roadmap

<details>

- [ ] Add more subjects (100+ subjects)<summary><code>lib/utils.ts</code></summary>

- [ ] Implement real-time collaboration

- [ ] Add video interview support```javascript

- [ ] Mobile app development (React Native)import { interviewCovers, mappings } from "@/constants";

- [ ] Multi-language supportimport { clsx, type ClassValue } from "clsx";

- [ ] Advanced analytics dashboardimport { twMerge } from "tailwind-merge";

- [ ] Integration with learning management systems

- [ ] AI-powered study plan generationexport function cn(...inputs: ClassValue[]) {

- [ ] Community features (forums, discussions) return twMerge(clsx(inputs));

- [ ] Gamification elements}

---const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

<div align="center">const normalizeTechName = (tech: string) => {

const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");

### ⭐ If you find this project useful, please consider giving it a star! return mappings[key as keyof typeof mappings];

};

**Built with ❤️ by [Shlok Bajaj](https://github.com/ShlokBajaj3433)**

const checkIconExists = async (url: string) => {

</div>  try {

    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists

} catch {
return false;
}
};

export const getTechLogos = async (techArray: string[]) => {
const logoURLs = techArray.map((tech) => {
const normalized = normalizeTechName(tech);
return {
tech,
url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
};
});

const results = await Promise.all(
logoURLs.map(async ({ tech, url }) => ({
tech,
url: (await checkIconExists(url)) ? url : "/tech.svg",
}))
);

return results;
};

export const getRandomInterviewCover = () => {
const randomIndex = Math.floor(Math.random() \* interviewCovers.length);
return `/covers${interviewCovers[randomIndex]}`;
};

````

</details>

<details>
<summary><code>Generate questions prompt (/app/api/vapi/generate/route.tsx):</code></summary>

```javascript
`Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
    `;
````

</details>

<details>
<summary><code>Generate feedback prompt (lib/actions/general.action.ts):</code></summary>

```javascript
prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
```

</details>

<details>
<summary><code>Display feedback (app/(root)/interview/[id]/feedback/page.tsx):</code></summary>

```javascript
<section className="section-feedback">
  <div className="flex flex-row justify-center">
    <h1 className="text-4xl font-semibold">
      Feedback on the Interview -{" "}
      <span className="capitalize">{interview.role}</span> Interview
    </h1>
  </div>

  <div className="flex flex-row justify-center">
    <div className="flex flex-row gap-5">
      <div className="flex flex-row gap-2 items-center">
        <Image src="/star.svg" width={22} height={22} alt="star" />
        <p>
          Overall Impression:{" "}
          <span className="text-primary-200 font-bold">
            {feedback?.totalScore}
          </span>
          /100
        </p>
      </div>

      <div className="flex flex-row gap-2">
        <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
        <p>
          {feedback?.createdAt
            ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
            : "N/A"}
        </p>
      </div>
    </div>
  </div>

  <hr />

  <p>{feedback?.finalAssessment}</p>

  <div className="flex flex-col gap-4">
    <h2>Breakdown of the Interview:</h2>
    {feedback?.categoryScores?.map((category, index) => (
      <div key={index}>
        <p className="font-bold">
          {index + 1}. {category.name} ({category.score}/100)
        </p>
        <p>{category.comment}</p>
      </div>
    ))}
  </div>

  <div className="flex flex-col gap-3">
    <h3>Strengths</h3>
    <ul>
      {feedback?.strengths?.map((strength, index) => (
        <li key={index}>{strength}</li>
      ))}
    </ul>
  </div>

  <div className="flex flex-col gap-3">
    <h3>Areas for Improvement</h3>
    <ul>
      {feedback?.areasForImprovement?.map((area, index) => (
        <li key={index}>{area}</li>
      ))}
    </ul>
  </div>

  <div className="buttons">
    <Button className="btn-secondary flex-1">
      <Link href="/" className="flex w-full justify-center">
        <p className="text-sm font-semibold text-primary-200 text-center">
          Back to dashboard
        </p>
      </Link>
    </Button>

    <Button className="btn-primary flex-1">
      <Link href={`/interview/${id}`} className="flex w-full justify-center">
        <p className="text-sm font-semibold text-black text-center">
          Retake Interview
        </p>
      </Link>
    </Button>
  </div>
</section>
```

</details>

<details>
<summary><code>Dummy Interviews:</code></summary>

```javascript
export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];
```

</details>

## <a name="links">🔗 Assets</a>

Public assets used in the project can be found [here](https://drive.google.com/drive/folders/1DuQ9bHH3D3ZAN_CFKfBgsaB8DEhEdnog?usp=sharing)

## <a name="more">🚀 More</a>

**Advance your skills with Next.js Pro Course**

Enjoyed creating this project? Dive deeper into our PRO courses for a richer learning adventure. They're packed with
detailed explanations, cool features, and exercises to boost your skills. Give it a go!

<a href="https://jsmastery.pro/next15" target="_blank">
   <img src="https://github.com/user-attachments/assets/b8760e69-1f81-4a71-9108-ceeb1de36741" alt="Project Banner">
</a>
