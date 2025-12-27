# Qeyafa AI — Creative Tech Stack

> **The World-Class Standard:** Engineering specifications for an Awwwards-winning, globally #1 digital experience.

---

## 1. Visual Identity

### 1.1 Theme: "Algorithmically Luxurious"

Deep Tech meets High Fashion — a seamless fusion of cutting-edge AI precision with luxury brand aesthetics.

### 1.2 Color Palette

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| **Primary** | Deep Green | `#0F4D3F` | Backgrounds, headers, cards, primary surfaces |
| **Accent** | Gold | `#D4A017` | CTAs, highlights, glows, interactive states |
| **Surface Light** | Off-White | `#FAF7F0` | Content backgrounds, cards on dark |
| **Surface Dark** | Almost-Black Green | `#0A2922` | Hero sections, premium areas |
| **Text Primary** | Charcoal | `#1A1A1A` | Body text on light backgrounds |
| **Text on Dark** | White | `#FFFFFF` | Text on green/dark backgrounds |

### 1.3 Typography

| Language | Font Family | Weights | Import |
|----------|-------------|---------|--------|
| **Arabic (RTL)** | Tajawal | 300, 400, 500, 700 | Google Fonts |
| **English (LTR)** | Inter | 300, 400, 500, 600, 700 | Google Fonts |

---

## 2. Core Stack

### 2.1 Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   React 18      │  │   Vite 5        │  │  Tailwind CSS   │  │
│  │   (UI Library)  │  │   (Build Tool)  │  │  (Styling)      │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
│           └────────────────────┼────────────────────┘            │
│                                │                                 │
│                    ┌───────────▼───────────┐                    │
│                    │   LUXURY UX ENGINE    │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ Lenis           │  │ ← Smooth Scroll   │
│                    │  │ Framer Motion   │  │ ← Animations      │
│                    │  │ Zustand         │  │ ← State Mgmt      │
│                    │  │ Magnetic Hooks  │  │ ← Cursor Effects  │
│                    │  └─────────────────┘  │                    │
│                    └───────────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Matrix

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **UI Framework** | React | 18.x | Component-based UI library |
| **Build Tool** | Vite | 5.x | Lightning-fast HMR & bundling |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS framework |
| **Scroll Engine** | Lenis | 1.x | Luxury smooth scrolling |
| **Animations** | Framer Motion | 11.x | Physics-based motion |
| **State** | Zustand | 4.x | Lightweight global state |
| **SEO** | React Helmet Async | 2.x | Dynamic metadata |
| **Routing** | React Router | 6.x | SPA navigation |
| **i18n** | react-i18next | 14.x | RTL/LTR internationalization |

---

## 3. Luxury UX Engine

### 3.1 Lenis Smooth Scrolling

High-end, buttery-smooth scrolling with ASAP performance optimization.

```typescript
// src/lib/lenis.ts
import Lenis from '@studio-freight/lenis';

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  
  return lenis;
}
```

### 3.2 Framer Motion Configuration

Physics-based animations with seamless page transitions.

```typescript
// src/lib/motion.ts
import { Variants } from 'framer-motion';

// Page transition variants - NO WHITE FLASH
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger children animation
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade up animation for list items
export const fadeUpItem: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Gold glow hover effect
export const goldGlowHover = {
  scale: 1.02,
  boxShadow: '0 0 30px rgba(212, 160, 23, 0.4)',
  transition: { duration: 0.3 },
};
```

### 3.3 Magnetic Button Hook

Custom hook for cursor-gravity UI elements.

```typescript
// src/hooks/useMagnetic.ts
import { useRef, useEffect, useState } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const pull = (radius - distance) / radius;
        setPosition({
          x: distanceX * strength * pull,
          y: distanceY * strength * pull,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius]);

  return { ref, position };
}
```

#### Magnetic Button Component

```tsx
// src/components/MagneticButton.tsx
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic'; // Note: @ alias configured in vite.config.ts to point to src/

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function MagneticButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}: MagneticButtonProps) {
  const { ref, position } = useMagnetic<HTMLButtonElement>({ strength: 0.4 });

  const variants = {
    primary: 'bg-qeyafa-gold text-qeyafa-green hover:shadow-gold-glow',
    secondary: 'border-2 border-qeyafa-gold text-qeyafa-gold hover:bg-qeyafa-gold/10',
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 25px rgba(212, 160, 23, 0.5)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
```

---

## 4. Backend Architecture

### 4.1 Firebase Stack

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | OTP authentication (Email), Agency passwords |
| **Cloud Firestore** | NoSQL database for all collections |
| **Cloud Functions** | AI screening, email triggers, API integrations |
| **Cloud Storage** | CV uploads, assessment media |

### 4.2 AI & Integrations

| Integration | Purpose | API |
|-------------|---------|-----|
| **OpenAI GPT-4o** | Dynamic exam question generation | OpenAI API |
| **Google Calendar** | Interview slot fetching | Google Calendar API |
| **Google Meet** | Auto-generate meeting links | Google Meet API |
| **SendGrid** | Transactional emails (OTP, notifications) | SendGrid API |

---

## 5. Performance Engineering

### 5.1 Code Splitting Strategy

```typescript
// src/routes/index.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy load all heavy components
const HomePage = lazy(() => import('@/pages/Home'));
const CareersPage = lazy(() => import('@/pages/Careers'));
const ApplyPage = lazy(() => import('@/pages/Apply'));
const AssessmentPage = lazy(() => import('@/pages/Assessment'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AgencyPortal = lazy(() => import('@/pages/agency/Portal'));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
        <Route path="/assessment/:token" element={<AssessmentPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/agency/*" element={<AgencyPortal />} />
      </Routes>
    </Suspense>
  );
}
```

### 5.2 Critical Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **First Contentful Paint** | < 1.0s | Lighthouse |
| **Largest Contentful Paint** | < 2.0s | Lighthouse |
| **Time to Interactive** | < 2.5s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | Lighthouse |
| **Total Blocking Time** | < 150ms | Lighthouse |
| **Lighthouse Score** | > 95 | All categories |

### 5.3 Asset Optimization

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

---

## 6. SEO Configuration

### 6.1 React Helmet Async

```tsx
// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SEO({ 
  title, 
  description, 
  image = '/og-image.jpg',
  url = 'https://qeyafa.ai',
  type = 'website'
}: SEOProps) {
  const fullTitle = `${title} | Qeyafa AI`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
```

---

## 7. Project Structure

```
qeyafa-web/
├── public/
│   ├── locales/
│   │   ├── ar/translation.json
│   │   └── en/translation.json
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── GoldGlow.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageTransition.tsx
│   │   └── seo/
│   │       └── SEO.tsx
│   ├── hooks/
│   │   ├── useMagnetic.ts
│   │   ├── useLenis.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── lenis.ts
│   │   ├── motion.ts
│   │   └── api/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Careers.tsx
│   │   ├── Apply.tsx
│   │   ├── Assessment.tsx
│   │   ├── admin/
│   │   └── agency/
│   ├── stores/
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   ├── styles/
│   │   └── globals.css
│   ├── routes/
│   │   └── index.tsx
│   └── main.tsx
├── functions/
│   └── src/
│       ├── screening/
│       ├── assessment/
│       └── notifications/
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 8. Dependencies

### 8.1 Production Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "framer-motion": "^11.0.0",
    "@studio-freight/lenis": "^1.0.0",
    "zustand": "^4.5.0",
    "react-helmet-async": "^2.0.0",
    "react-i18next": "^14.0.0",
    "i18next": "^23.0.0",
    "firebase": "^10.8.0",
    "clsx": "^2.1.0"
  }
}
```

### 8.2 Development Dependencies

```json
{
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.1.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "terser": "^5.27.0",
    "rollup-plugin-visualizer": "^5.12.0"
  }
}
```

---

**Document Version:** 2.0  
**Last Updated:** December 2024  
**Standard:** Awwwards World-Class Engineering
