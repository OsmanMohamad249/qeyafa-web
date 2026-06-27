import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    {
      name: t('nav.services'),
      path: '/services',
      children: [
        { name: t('nav.services_individual'), path: '/services/individual' },
        { name: t('nav.services_b2b'), path: '/services/b2b' },
      ]
    },
    {
      name: t('nav.ecosystem'),
      path: '/hub',
      children: [
        { name: t('nav.hub_partners'), path: '/hub/partners' },
        { name: t('nav.hub_suppliers'), path: '/hub/suppliers' },
      ]
    },
    { name: t('nav.careers'), path: '/careers' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse z-50">
            <motion.img
              src={logo}
              alt="Qeyafa Logo"
              width="40"
              height="40"
              whileHover={{ scale: 1.05 }}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse text-sm font-medium text-white/90">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className="flex items-center gap-1 hover:text-qeyafa-primary transition-colors py-2">
                    {link.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="hover:text-qeyafa-primary transition-colors relative group py-2 block"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-qeyafa-primary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-64 bg-black/90 border border-white/10 rounded-2xl shadow-luxury-lg overflow-hidden py-2 backdrop-blur-xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
             {/* Language Toggle - New Style */}
             <button
              onClick={toggleLanguage}
              className="text-white hover:text-qeyafa-primary transition-colors text-sm font-medium tracking-wide"
            >
              E / ع
            </button>

            {/* Help Button - Pill Style */}
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
              <span>HELP</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4 rtl:space-x-reverse z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-qeyafa-black/98 backdrop-blur-xl pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-3">
                  {link.children ? (
                    <>
                      <div className="text-qeyafa-gold font-bold text-lg border-b border-white/10 pb-2">
                        {link.name}
                      </div>
                      <div className="pl-4 space-y-3 border-l border-white/10 ml-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-white/70 hover:text-white text-base"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-xl font-bold text-white hover:text-qeyafa-gold"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-white/80 hover:text-qeyafa-gold"
                >
                  <Languages className="w-5 h-5" />
                  <span>{i18n.language === 'en' ? t('nav.switch_ar') : t('nav.switch_en')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
