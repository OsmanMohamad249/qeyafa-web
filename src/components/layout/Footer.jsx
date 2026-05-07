import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Lock } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const companyLinks = [
    { name: t('footer.links.about', 'About Us'), href: '/about' },
    { name: t('nav.careers', 'Careers'), href: '/careers' },
    { name: t('footer.links.news', 'News/Blog'), href: '#' },
  ];

  const ecosystemLinks = [
    { name: t('nav.hub_partners', 'Partner Portal'), href: '/hub/partners' },
    { name: t('nav.hub_suppliers', 'Fabric Hub'), href: '/hub/suppliers' },
    { name: t('nav.services_b2b', 'Corporate (B2B)'), href: '/services/b2b' },
  ];

  const supportLinks = [
    { name: t('footer.links.help', 'Help Center'), href: '#' },
    { name: t('footer.links.privacy', 'Privacy Policy'), href: '#' },
    { name: t('footer.links.terms', 'Terms of Service'), href: '#' },
  ];

  return (
    <>
      <footer className="bg-background border-t border-white/10 pt-20 pb-10 mt-auto">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6 md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img src={logo} alt="Qeyafa Logo" className="h-16 w-auto object-contain brightness-0 invert" />
              </motion.div>
              <p className="text-text-body/60 text-sm leading-relaxed max-w-xs">
                {t('footer.tagline', 'Leading the fashion-tech transformation with AI precision and sustainable practices.')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-text-body/40 hover:text-gold transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="text-gold font-bold mb-6">{t('footer.company', 'Company')}</h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-text-body/60 hover:text-gold transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-bold mb-6">{t('footer.ecosystem', 'Ecosystem')}</h3>
              <ul className="space-y-4">
                {ecosystemLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-text-body/60 hover:text-gold transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-bold mb-6">{t('footer.support', 'Support')}</h3>
              <ul className="space-y-4">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-text-body/60 hover:text-gold transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-6">
               <p className="text-text-body/40 text-xs">
                 &copy; {currentYear} Qeyafa Platform. All rights reserved.
               </p>
             </div>
             <div className="flex gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
               {/* Small Badges */}
               <span className="text-xs font-bold text-gold/30 pointer-events-none">QEYAFA AI</span>
             </div>
          </div>
        </div>
      </footer>
      {/* FORCED ADMIN LINK FOR DIAGNOSTICS */}
      <a
         href="http://localhost:3333"
         target="_blank"
         rel="noopener noreferrer"
         style={{
           position: 'fixed',
           bottom: '10px',
           right: '10px',
           backgroundColor: '#C5A065',
           color: '#020402',
           padding: '10px 20px',
           borderRadius: '8px',
           zIndex: 9999,
           fontSize: '14px',
           fontWeight: 'bold',
           display: 'flex',
           alignItems: 'center',
           gap: '8px'
         }}
       >
         <Lock size={16} />
         Admin Login
       </a>
    </>
  );
};

export default Footer;
