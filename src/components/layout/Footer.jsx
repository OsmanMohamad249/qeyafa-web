import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
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
    { name: t('footer.links.about'), href: '/about' },
    { name: t('nav.careers'), href: '/careers' },
    { name: t('footer.links.news'), href: '#' },
  ];

  const ecosystemLinks = [
    { name: t('nav.hub_partners'), href: '/hub/partners' },
    { name: t('nav.hub_suppliers'), href: '/hub/suppliers' },
    { name: t('nav.services_b2b'), href: '/services/b2b' },
  ];

  const supportLinks = [
    { name: t('footer.links.help'), href: '#' },
    { name: t('footer.links.privacy'), href: '#' },
    { name: t('footer.links.terms'), href: '#' },
  ];

  return (
    <footer className="bg-qeyafa-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={logo} alt="Qeyafa Logo" className="h-56 w-auto object-contain mix-blend-screen" />
            </motion.div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200 border border-white/5 hover:border-qeyafa-gold/30"
                >
                  <social.icon className="w-4 h-4 text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-qeyafa-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('footer.ecosystem')}</h4>
            <ul className="space-y-2">
              {ecosystemLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-qeyafa-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('footer.support')}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-qeyafa-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Qeyafa. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
             {/* Badges placeholders */}
             <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs text-white/60">
               {t('footer.saudi_made')}
             </div>
             <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs text-white/60">
               {t('footer.monshaat')}
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
