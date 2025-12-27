# Qeyafa AI — UI/UX Masterclass

> **The "Wow" Factor:** Design system and interaction philosophy for an Awwwards-winning experience.

---

## 1. Design Philosophy: "No Static Elements"

### 1.1 Core Principle

**Everything must react to user interaction.** No element on the page should be truly static. Every component should respond to:
- Hover states
- Click/tap interactions
- Scroll position
- Cursor proximity
- Focus states

### 1.2 Visual Identity Recap

| Element | Value | Application |
|---------|-------|-------------|
| **Primary** | Deep Green `#0F4D3F` | Backgrounds, headers, cards |
| **Accent** | Gold `#D4A017` | CTAs, glows, highlights |
| **Theme** | "Algorithmically Luxurious" | Deep tech meets high fashion |
| **Typography** | Tajawal (AR) / Inter (EN) | Bilingual support |

---

## 2. The "Glass & Gold" Design System

### 2.1 Glassmorphism Components

```css
/* Base Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark Glass (on light backgrounds) */
.glass-card-dark {
  background: rgba(15, 77, 63, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(15, 77, 63, 0.2);
  border-radius: 16px;
}

/* Gold-Bordered Glass */
.glass-card-gold {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 2px solid rgba(212, 160, 23, 0.5);
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(212, 160, 23, 0.15);
}
```

### 2.2 React Component

```tsx
// src/components/common/GlassCard.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'gold';
  hover?: boolean;
  className?: string;
}

export function GlassCard({ 
  children, 
  variant = 'light', 
  hover = true,
  className = '' 
}: GlassCardProps) {
  const variants = {
    light: 'bg-white/10 border-white/20',
    dark: 'bg-qeyafa-green/10 border-qeyafa-green/20',
    gold: 'bg-white/8 border-qeyafa-gold/50 shadow-gold-glow' // Custom class defined in Tailwind config (Section 9)
  };

  return (
    <motion.div
      className={`
        backdrop-blur-xl rounded-2xl p-6 border
        ${variants[variant]}
        ${className}
      `}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(212, 160, 23, 0.3)',
        borderColor: 'rgba(212, 160, 23, 0.6)'
      } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 3. Micro-interactions

### 3.1 Magnetic Buttons

Buttons that react to cursor gravity — they subtly "pull" towards the cursor.

```tsx
// src/components/common/MagneticButton.tsx
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}: MagneticButtonProps) {
  const { ref, position } = useMagnetic<HTMLButtonElement>({
    strength: 0.35,
    radius: 120
  });

  const variantStyles = {
    primary: `
      bg-qeyafa-gold text-qeyafa-green font-semibold
      hover:shadow-[0_0_30px_rgba(212,160,23,0.5)]
    `,
    secondary: `
      bg-qeyafa-green text-white font-semibold
      hover:shadow-[0_0_30px_rgba(15,77,63,0.5)]
    `,
    outline: `
      bg-transparent border-2 border-qeyafa-gold text-qeyafa-gold font-semibold
      hover:bg-qeyafa-gold/10
    `
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        transition-all duration-300
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      animate={{
        x: position.x,
        y: position.y
      }}
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.98
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25
      }}
    >
      {/* Gold glow effect on hover */}
      <motion.span
        className="absolute inset-0 rounded-xl bg-qeyafa-gold/20 blur-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

### 3.2 Gold Glow Hover Effects

All interactive elements must have hover states with gold glows.

```tsx
// src/components/common/GoldGlow.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GoldGlowProps {
  children: ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export function GoldGlow({ 
  children, 
  intensity = 'medium',
  className = '' 
}: GoldGlowProps) {
  const glowIntensity = {
    subtle: '0 0 15px rgba(212, 160, 23, 0.2)',
    medium: '0 0 25px rgba(212, 160, 23, 0.4)',
    strong: '0 0 40px rgba(212, 160, 23, 0.6)'
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: glowIntensity[intensity]
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### 3.3 Interactive Form Inputs

```tsx
// src/components/common/GlowInput.tsx
import { motion } from 'framer-motion';
import { InputHTMLAttributes, useState } from 'react';

interface GlowInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function GlowInput({ label, error, ...props }: GlowInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <motion.label
        className={`
          absolute left-4 transition-all duration-300 pointer-events-none
          ${isFocused || props.value 
            ? 'top-1 text-xs text-qeyafa-gold' 
            : 'top-4 text-gray-400'}
        `}
        animate={{
          color: isFocused ? '#D4A017' : error ? '#EF4444' : '#9CA3AF'
        }}
      >
        {label}
      </motion.label>
      
      <motion.input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full pt-6 pb-3 px-4 rounded-xl
          bg-white/5 border backdrop-blur-sm
          text-white placeholder-transparent
          outline-none transition-all duration-300
          ${error 
            ? 'border-red-500' 
            : isFocused 
              ? 'border-qeyafa-gold shadow-[0_0_20px_rgba(212,160,23,0.3)]' 
              : 'border-white/20'}
        `}
        animate={{
          boxShadow: isFocused 
            ? '0 0 20px rgba(212, 160, 23, 0.3)' 
            : 'none'
        }}
      />
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
```

---

## 4. Page Transitions

### 4.1 No White Flash Rule

**CRITICAL:** Page transitions must be seamless. No white flash between pages.

```tsx
// src/components/layout/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 4.2 App Router Setup

```tsx
// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PageTransition } from '@/components/layout/PageTransition';
import { AppRoutes } from '@/routes';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* Background must be set at root level - NO WHITE */}
        <div className="bg-qeyafa-green-dark min-h-screen">
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
```

---

## 5. RTL/LTR Animation Direction

### 5.1 Direction-Aware Animations

**CRITICAL:** Animations must flip direction based on language (Arabic = right-to-left).

```tsx
// src/hooks/useDirectionalAnimation.ts
import { useTranslation } from 'react-i18next';

export function useDirectionalAnimation() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Flip X-axis animations for RTL
  const getDirectionalVariants = (distance: number = 50) => ({
    initial: {
      opacity: 0,
      x: isRTL ? distance : -distance  // Flip direction
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: isRTL ? -distance : distance  // Flip direction
    }
  });

  const getSlideDirection = () => ({
    enter: isRTL ? 'right' : 'left',
    exit: isRTL ? 'left' : 'right'
  });

  return {
    isRTL,
    getDirectionalVariants,
    getSlideDirection
  };
}
```

### 5.2 RTL-Aware Component

```tsx
// src/components/common/DirectionalSlide.tsx
import { motion } from 'framer-motion';
import { useDirectionalAnimation } from '@/hooks/useDirectionalAnimation';
import { ReactNode } from 'react';

interface DirectionalSlideProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function DirectionalSlide({ 
  children, 
  delay = 0,
  className = '' 
}: DirectionalSlideProps) {
  const { getDirectionalVariants } = useDirectionalAnimation();
  const variants = getDirectionalVariants(60);

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
```

### 5.3 RTL Layout Configuration

```tsx
// src/components/layout/RootLayout.tsx
import { useTranslation } from 'react-i18next';
import { ReactNode, useEffect } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    // Set document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Set font family
    document.body.style.fontFamily = isRTL 
      ? "'Tajawal', sans-serif" 
      : "'Inter', sans-serif";
  }, [isRTL, i18n.language]);

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
```

---

## 6. Scroll Animations

### 6.1 Scroll-Triggered Reveal

```tsx
// src/components/common/ScrollReveal.tsx
import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useDirectionalAnimation } from '@/hooks/useDirectionalAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isRTL } = useDirectionalAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 60, x: 0 };
      case 'down': return { y: -60, x: 0 };
      case 'left': return { y: 0, x: isRTL ? -60 : 60 };
      case 'right': return { y: 0, x: isRTL ? 60 : -60 };
      default: return { y: 60, x: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...getInitialPosition()
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0
      } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
```

### 6.2 Parallax Effect

```tsx
// src/hooks/useParallax.ts
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

export function useParallax({ speed = 0.5, direction = 'up' }: ParallaxOptions = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor]);

  return { ref, y };
}
```

---

## 7. Loading States

### 7.1 Skeleton Loaders with Shimmer

```tsx
// src/components/common/Skeleton.tsx
import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = 20,
  rounded = 'md',
  className = ''
}: SkeletonProps) {
  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full'
  };

  return (
    <motion.div
      className={`
        bg-gradient-to-r from-qeyafa-green/20 via-qeyafa-gold/10 to-qeyafa-green/20
        ${roundedClasses[rounded]}
        ${className}
      `}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}
```

### 7.2 Full Page Loader

```tsx
// src/components/common/PageLoader.tsx
import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-qeyafa-green-dark flex items-center justify-center z-50">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-qeyafa-gold rounded-full"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>
      
      <motion.p
        className="absolute bottom-1/3 text-qeyafa-gold font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
```

---

## 8. Hover State Inventory

Every interactive element must have defined hover states:

| Element | Default State | Hover State |
|---------|---------------|-------------|
| **Primary Button** | Gold bg, Green text | Scale 1.05, Gold glow shadow |
| **Secondary Button** | Transparent, Gold border | Gold bg at 10% opacity |
| **Card** | White/Green bg | Scale 1.02, Gold border, Lift shadow |
| **Link** | White/Gold text | Gold underline slide-in |
| **Image** | Normal | Scale 1.05, Brightness 1.1 |
| **Input** | Gray border | Gold border, Gold glow |
| **Icon** | Gray | Gold color, Rotate 5deg |
| **Nav Item** | White text | Gold text, Scale 1.05 |

---

## 9. Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'qeyafa-green': {
          DEFAULT: '#0F4D3F',
          dark: '#0A2922',
          light: '#1A6B57'
        },
        'qeyafa-gold': {
          DEFAULT: '#D4A017',
          light: '#F0D78C',
          dark: '#B8890F'
        },
        'qeyafa-cream': '#FAF7F0'
      },
      fontFamily: {
        'arabic': ['Tajawal', 'sans-serif'],
        'english': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212, 160, 23, 0.4)',
        'gold-glow-lg': '0 0 50px rgba(212, 160, 23, 0.5)',
        'green-glow': '0 0 30px rgba(15, 77, 63, 0.4)'
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.6)' }
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-rtl')
  ]
}
```

---

## 10. Accessibility Requirements

Despite heavy animations, accessibility must not be compromised:

### 10.1 Reduced Motion Support

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 10.2 Motion Preference Hook

```tsx
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

### 10.3 Focus States

All interactive elements must have visible focus indicators:

```css
/* Focus ring for keyboard navigation */
*:focus-visible {
  outline: 2px solid #D4A017;
  outline-offset: 3px;
}
```

---

**Document Version:** 2.0  
**Last Updated:** December 2024  
**Standard:** Awwwards-Worthy UI/UX
