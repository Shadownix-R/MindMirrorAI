# MindMirror AI 🧠✨

A peaceful, private emotional self-reflection companion powered by React and n8n workflows. MindMirror AI helps users understand their emotions through a guided wellness journey and provides personalized suggestions with AI-generated wellness reports.

![MindMirror AI](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🎯 Guided Wellness Journey**: Step-by-step assessment covering mood, stress levels, lifestyle habits, and personal reflections
- **🤖 AI-Powered Reflections**: Integrates with n8n workflows for intelligent, personalized wellness insights
- **🔒 Privacy-First**: No personal identity or sensitive data stored locally; all processing via encrypted webhooks
- **🌙 Interactive Wellness Corner**: 
  - Guided breathing exercises (4-4-4 box breathing)
  - Mood garden with growth visualization
  - Gratitude constellation wall
  - Bubble pop stress release
  - Ambient nature soundscapes (rain, forest, ocean)
- **🎨 Beautiful UI**: Modern glass-morphism design with smooth animations and dark mode support
- **📊 Personalized Reports**: Downloadable wellness summaries with actionable micro-challenges

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shadownix-R/MindMirrorAI.git
cd MindMirrorAI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.10
- **Styling**: TailwindCSS 3.4.19
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Audio**: Web Audio API (custom synthesizer for nature sounds)
- **Backend Integration**: n8n webhooks

## 🔧 Configuration

### n8n Webhook Setup

MindMirror AI can integrate with n8n workflows for AI-powered reflections. Configure your webhook URL in the settings modal (gear icon in navbar):

1. Create an n8n workflow with a POST webhook trigger
2. The workflow should accept JSON payload with wellness data
3. Return a JSON response with reflection insights
4. Paste your webhook URL in the app settings

**Fallback Mode**: If no webhook is configured or the service is unavailable, MindMirror AI uses a smart fallback reflection engine.

## 📁 Project Structure

```
mindmirror-ai/
├── src/
│   ├── components/
│   │   ├── WellnessCorner/      # Interactive relaxation tools
│   │   ├── WellnessWizard/      # Multi-step assessment form
│   │   ├── AIProcessingModal.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   └── ResultsReport.jsx
│   ├── utils/
│   │   ├── audioSynth.js        # Web Audio API synthesizer
│   │   ├── exportReport.js      # PDF export functionality
│   │   └── n8nApi.js            # n8n webhook integration
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🌟 Key Components

### Wellness Wizard
A 5-step guided assessment:
1. Basic Information (age, occupation)
2. Current Feelings (mood, stress, energy levels)
3. Lifestyle & Habits (sleep quality, positive habits)
4. Main Stress Source
5. Personal Reflection (thoughts, email for report)

### Interactive Wellness Corner
- **Guided Breathing**: 4-4-4 box breathing with visual cues and audio chimes
- **Mood Garden**: Visual plant growth based on reflection completion
- **Gratitude Wall**: Interactive constellation of gratitude stars
- **Bubble Pop**: Stress release by popping negative thought bubbles
- **Nature Sounds**: Synthesized ambient soundscapes using Web Audio API

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Soft Blue, Sage, Lavender gradients
- Calm slate backgrounds
- Rose, amber, teal accents

### Animations
Custom animations defined in `index.css`:
- Blob animations for background effects
- Breathing circle expansion
- Float, fade-in transitions

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Powered by [n8n](https://n8n.io/)

---

**⚠️ Medical Disclaimer**: MindMirror AI is an interactive emotional self-reflection companion tool. AI is not a replacement for mental health professionals, medical diagnosis, or therapy. If you or someone you know is in crisis, please contact professional emergency services or crisis helplines immediately.
