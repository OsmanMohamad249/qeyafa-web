import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Shield, Building2 } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const footerLinks = [
    { name: t('footer.links.about'), href: '/about' },
    { name: t('footer.links.privacy'), href: '#' },
    { name: t('footer.links.terms'), href: '#' },
    { name: t('footer.links.contact'), href: '/contact' },
  ];

  const portalLinks = [
    { name: 'Admin Dashboard', href: '/admin', icon: Shield },
    { name: 'Agency Portal', href: '/agency', icon: Building2 },
  ];

  return (
    <footer className="bg-qeyafa-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold gradient-text"
            >
              Qeyafa
            </motion.h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
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

          {/* Portal Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Portals</h4>
            <ul className="space-y-2">
              {portalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-qeyafa-gold transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/careers"
                  className="text-white/60 hover:text-qeyafa-gold transition-colors duration-200 text-sm"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200 border border-white/5 hover:border-qeyafa-gold/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/60 hover:text-qeyafa-gold transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/40 text-sm">
            © {currentYear} Qeyafa. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
