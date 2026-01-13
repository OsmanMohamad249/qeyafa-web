# Qeyafa UI/UX Refactor Plan (NTDP Style)

This plan outlines the steps to overhaul the Qeyafa.com UI to match the modern, clean aesthetic of NTDP (MVPLab), while preserving the brand identity (primary colors).

### PHASE 1: PREPARATION (Completed)
- [x] Analyze existing code structure and dependencies.
- [x] Verify `framer-motion` and `lucide-react` availability.
- [x] Clean up lint/build errors in current files.

### PHASE 2: EXECUTION

#### 1. Global Layout & Canvas Settings
- [ ] Update `tailwind.config.qeyafa.js` to include new "Surface" colors (Off-white `#F9FAFB`).
- [ ] Update `index.css` to set the global body background to light mode by default.
- [ ] Configure global typography settings (Inter/Tajawal) with increased line-height (1.6 - 1.8) and lighter weights for body text.

#### 2. Header & Navigation Refactor
- [ ] Refactor `Navbar.jsx` to use a "Glassmorphism" effect on scroll (`backdrop-blur-md` with slight transparency).
- [ ] Redesign navigation links to be cleaner (black text on light bg).
- [ ] Update "Login/Register" buttons to pill-shaped, modern styles.

#### 3. Hero Section Redesign (Home.jsx)
- [ ] Remove the current dark/gold aesthetic.
- [ ] Implement the "Clean Abstract" layout:
    -   Large, bold typography (Black/Primary Green).
    -   clean background with subtle geometric patterns or gradients (using `qeyafa-primary` at very low opacity).
    -   "Fade Up" entrance animations using `framer-motion`.

#### 4. Component: "The Cards" (Services/Features)
- [ ] Create/Update `ServiceCard` component.
    -   Background: Pure White `#FFFFFF`.
    -   Border Radius: `24px`.
    -   Shadow: Soft diffused (`box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08)`).
    -   Hover: Lift effect (`translateY(-5px)`).

#### 5. Component: "The Journey Stepper"
- [ ] Build a new `JourneyStepper` component.
    -   Numbered circles connected by lines.
    -   Interactive state (clicking updates content).
    -   Active color: `qeyafa-primary`.
    -   Inactive: Light Grey.

#### 6. Global Animation & Motion
- [ ] Implement `ScrollReveal` wrapper component properly (or verify existing).
- [ ] Ensure all key sections use "Fade Up" triggers.

#### 7. Footer Redesign
- [ ] Update `Footer.jsx` to match the light theme (or keep a high-contrast dark footer if it fits the NTDP style, usually light websites have dark footers for contrast, or clean light footers).

### PHASE 3: FINAL POLISH
- [ ] Verify Mobile Responsiveness.
- [ ] Check RTL (Arabic) layout integrity.

