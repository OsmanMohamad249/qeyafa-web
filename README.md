# Qeyafa Web

> AI-Powered Custom Tailoring Technology Platform

Qeyafa is a Deep Tech AI startup using proprietary Computer Vision & GenAI to digitize custom tailoring for men & women. Our on-device engine extracts 3D body measurements from 2D photos with 95% accuracy, solving the "wrong fit" problem in the MENA fashion market.

## 🚀 Features

- ⚡ **React + Vite** - Lightning-fast development with Hot Module Replacement (HMR)
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework with dark/futuristic theme
- 🌐 **i18next** - Full internationalization support for Arabic and English with RTL
- 🎭 **Framer Motion** - Smooth animations and transitions
- 🎯 **React Router DOM** - Client-side routing
- 🎨 **Lucide Icons** - Beautiful, consistent icon set
- 🔥 **Firebase** - Backend services integration ready

## 🎨 Design System

- **Background**: Slate-950 (deep dark theme)
- **Gradients**: Blue to Purple (modern, futuristic)
- **Typography**: System fonts optimized for readability
- **Components**: Reusable button styles, cards, and gradient text utilities
- **Responsive**: Mobile-first design with breakpoints

## 📁 Project Structure

```
qeyafa-web/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.jsx       # Main layout wrapper
│   │       ├── Navbar.jsx       # Navigation with language toggle
│   │       └── Footer.jsx       # Footer component
│   ├── pages/
│   │   ├── Home.jsx            # Home page with hero section
│   │   ├── About.jsx           # About page (placeholder)
│   │   ├── Services.jsx        # Services page (placeholder)
│   │   └── Contact.jsx         # Contact page (placeholder)
│   ├── i18n/
│   │   └── config.js           # i18next configuration
│   ├── locales/
│   │   ├── en/
│   │   │   └── translation.json # English translations
│   │   └── ar/
│   │       └── translation.json # Arabic translations
│   ├── firebase/
│   │   └── config.js           # Firebase configuration
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles with Tailwind
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
└── vite.config.js            # Vite configuration
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OsmanMohamad249/qeyafa-web.git
   cd qeyafa-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📦 Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🧹 Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🌐 Internationalization (i18n)

The app supports both English and Arabic with automatic RTL layout switching:

- **Language Toggle**: Click the language button in the navbar
- **Persistent**: Language preference is stored in localStorage
- **RTL Support**: Automatic direction switching for Arabic
- **Extensible**: Easy to add more languages by adding translation files

### Adding a New Language

1. Create a new folder in `src/locales/` (e.g., `fr/`)
2. Add a `translation.json` file with your translations
3. Import and add the language in `src/i18n/config.js`

## 🔥 Firebase Setup

The project includes Firebase configuration for:
- **Authentication** (`firebase/auth`)
- **Firestore Database** (`firebase/firestore`)
- **Cloud Storage** (`firebase/storage`)
- **Analytics** (`firebase/analytics`)

Update `src/firebase/config.js` with your Firebase project credentials or use environment variables.

## 🎨 Tailwind CSS v4

This project uses Tailwind CSS v4 with the new `@import` syntax. Custom theme tokens are defined using CSS custom properties:

```css
@theme {
  --color-primary-500: #0ea5e9;
  --color-purple-600: #9333ea;
}
```

Custom component classes are available:
- `.gradient-text` - Blue to purple gradient text
- `.btn-primary` - Primary gradient button
- `.btn-secondary` - Secondary outline button
- `.card` - Card component with hover effects

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first approach
- Hamburger menu for mobile devices
- Optimized layouts for tablets and desktops
- Touch-friendly interactive elements

## 🎭 Animations

Powered by Framer Motion:
- Smooth page transitions
- Scroll-triggered animations
- Interactive hover effects
- Mobile menu animations

## 📄 License

All rights reserved © 2025 Qeyafa

## 🤝 Contributing

This is a private project. For inquiries, please contact the Qeyafa team.

## 📧 Contact

For more information about Qeyafa and our AI-powered tailoring technology, visit our website or contact us through the app.

---

Built with ❤️ by the Qeyafa team
