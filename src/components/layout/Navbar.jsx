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
          ? 'bg-qeyafa-black/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-44">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse z-50">
            <motion.img
              src={logo}
              alt="Qeyafa Logo"
              whileHover={{ scale: 1.05 }}
              className="h-40 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium text-white/80">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className="flex items-center gap-1 hover:text-qeyafa-gold transition-colors py-2">
                    {link.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="hover:text-qeyafa-gold transition-colors relative group py-2 block"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-qeyafa-gold group-hover:w-full transition-all duration-300"></span>
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
                        className="absolute top-full left-0 w-56 bg-qeyafa-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden pt-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
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
             {/* Language Toggle */}
             <button
              onClick={toggleLanguage}
              className="hover:text-qeyafa-gold transition-colors flex items-center gap-1 text-white/80"
            >
              <Languages className="w-4 h-4" />
              <span>{i18n.language === 'en' ? 'AR' : 'EN'}</span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4 rtl:space-x-reverse z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
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
