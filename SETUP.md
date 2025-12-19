# 🚀 CropSavvy Setup Guide

## Prerequisites
- Node.js 18+ installed
- Firebase CLI installed: `npm install -g firebase-tools`
- Git installed

## 🔧 Initial Setup for New Developers

### 1. Clone Repository
```bash
git clone <repository-url>
cd CropSavvy-CH
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 3. Environment Configuration

#### Frontend Environment (.env)
```bash
# Copy the template
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Get Firebase credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Copy the config values

#### Backend Environment (functions/.env)
```bash
# Copy the template
cp functions/.env.example functions/.env
```

Edit `functions/.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_key_here
```

**Get Gemini API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

### 4. Firebase Login
```bash
firebase login
firebase use --add
# Select your Firebase project
```

### 5. Run Development Server
```bash
# Start frontend
npm run dev

# In another terminal, start Firebase emulators (optional)
firebase emulators:start
```

## 🔐 Security Best Practices

### ✅ DO:
- Keep `.env` files local (never commit)
- Use `.env.example` for templates
- Rotate API keys regularly
- Use Firebase secrets for production

### ❌ DON'T:
- Commit `.env` files to Git
- Share API keys in chat/email
- Hardcode secrets in code
- Use production keys in development

## 🚀 Deployment

### Deploy Firebase Functions
```bash
# Set production secrets
firebase functions:secrets:set GEMINI_API_KEY

# Deploy
firebase deploy --only functions
```

### Deploy Frontend
```bash
npm run build
# Deploy to your hosting platform (Vercel, Netlify, etc.)
```

## 🆘 Troubleshooting

### "Missing Firebase configuration" error
- Check `.env` file exists in project root
- Verify all `VITE_` prefixed variables are set
- Restart dev server after changing `.env`

### "Gemini API key not configured" error
- Check `functions/.env` file exists
- Verify `GEMINI_API_KEY` is set
- For production, ensure secret is set: `firebase functions:secrets:set GEMINI_API_KEY`

### Environment variables not loading
- Vite requires `VITE_` prefix for frontend vars
- Restart dev server after `.env` changes
- Check `.env` file is in correct location

## 📚 Additional Resources
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Functions Secrets](https://firebase.google.com/docs/functions/config-env)
- [Firebase Setup](https://firebase.google.com/docs/web/setup)
