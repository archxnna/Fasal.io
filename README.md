# 🌱 Fasal.io - AI-Powered Crop Disease Detection

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://cropsaavy.web.app)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> **Empowering farmers with AI-driven crop disease detection and intelligent farming recommendations.**

Fasal.io is a cutting-edge web application that combines computer vision and artificial intelligence to help farmers instantly identify plant diseases and receive expert agricultural guidance. Upload a crop image and get immediate disease detection with comprehensive treatment recommendations.

## 🚀 Live Demo

**[Try Fasal.io Now →](https://cropsaavy.web.app)**

## ✨ Key Features

### 🔍 **Instant Disease Detection**
- Upload crop images via drag-and-drop or file picker
- Real-time AI analysis using TensorFlow.js
- Detects common diseases: Early Blight, Late Blight, Powdery Mildew, Leaf Spot, Rust, and more
- Confidence scoring for accurate results

### 🧠 **AI-Powered Recommendations**
- Google Gemini AI provides detailed farming advice
- Comprehensive treatment options and prevention strategies
- Scientific explanations and best practices
- Educational content for agricultural learning

### 🎨 **Modern User Experience**
- Responsive design for all devices
- Beautiful animations with Framer Motion
- Intuitive interface with drag-and-drop functionality
- Real-time analysis feedback

### 📊 **Comprehensive Analysis**
- Disease overview and scientific causes
- Environmental conditions analysis
- Symptom identification guide
- Management practices and prevention tips

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript 5.9.2** - Type-safe development
- **Vite 7.2.2** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### AI/ML
- **TensorFlow.js 4.22.0** - Client-side machine learning
- **Google Gemini API** - Advanced language model for recommendations
- **Custom CNN Model** - Plant disease classification

### Backend & Hosting
- **Firebase Functions** - Serverless backend
- **Firebase Hosting** - Fast, secure web hosting
- **Node.js 24** - Runtime environment

### Development Tools
- **ESLint & Prettier** - Code quality and formatting
- **Vitest** - Unit testing framework
- **SWC** - Fast TypeScript/JavaScript compiler

## 🏗️ Project Structure

```
Fasal.io/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Radix UI components
│   │   ├── UploadBox.tsx  # Image upload component
│   │   ├── Dock.tsx       # Navigation dock
│   │   └── ...
│   ├── pages/             # Application pages
│   ├── lib/               # Utilities and configurations
│   │   ├── plantModel.ts  # TensorFlow.js model
│   │   └── firebase.ts    # Firebase configuration
│   └── hooks/             # Custom React hooks
├── functions/             # Firebase Cloud Functions
│   ├── index.js          # Main function definitions
│   └── package.json      # Backend dependencies
├── public/               # Static assets
└── dist/                # Build output
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Firebase CLI (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fasal.io.git
   cd fasal.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp functions/.env.example functions/.env
   ```

4. **Configure Firebase**
   ```bash
   # Update firebase configuration in client/lib/firebase.ts
   # Add your Gemini API key in functions/.env
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit** `http://localhost:5173`

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm run test            # Run unit tests
npm run typecheck       # TypeScript type checking

# Code Quality
npm run format.fix      # Format code with Prettier

# Deployment
firebase deploy         # Deploy to Firebase
```

## 🌐 Deployment

### Firebase Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

3. **Your app will be live at**: `https://your-project.web.app`

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend (functions/.env)
```env
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

## 🤖 AI Models

### Disease Detection
- **TensorFlow.js CNN Model** - Trained for plant disease classification
- **Supported Diseases**: Early Blight, Late Blight, Powdery Mildew, Leaf Spot, Rust, Bacterial Spot
- **Input**: 224x224 RGB images
- **Output**: Disease classification with confidence scores

### Recommendation Engine
- **Google Gemini API** - Advanced language model
- **Features**: Contextual farming advice, treatment recommendations, prevention strategies
- **Educational Content**: Scientific explanations and best practices

## 📱 Supported Formats

- **Image Types**: JPG, JPEG, PNG, WEBP
- **Max File Size**: 10MB
- **Recommended**: Clear, well-lit crop images
- **Best Results**: Close-up shots of affected plant areas

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TensorFlow.js** - For enabling client-side machine learning
- **Google Gemini** - For advanced AI recommendations
- **Firebase** - For reliable hosting and backend services
- **React Community** - For the amazing ecosystem
- **Agricultural Experts** - For domain knowledge and guidance

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/fasal.io/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/fasal.io/discussions)
- **Email**: support@fasal.io

---

<div align="center">

**Made with ❤️ for farmers worldwide**

[Live Demo](https://cropsaavy.web.app) • [Documentation](https://github.com/yourusername/fasal.io/wiki) • [Report Bug](https://github.com/yourusername/fasal.io/issues)

</div>