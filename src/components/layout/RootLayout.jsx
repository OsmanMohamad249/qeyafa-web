import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function RootLayout({ children }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    // Set document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;

    // Set font family — Thmanyah Sans for both, with Inter fallback for English
    document.body.style.fontFamily = isRTL
      ? "'Thmanyah Sans', system-ui, sans-serif"
      : "'Thmanyah Sans', 'Inter', system-ui, sans-serif";
  }, [isRTL, i18n.language]);

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}

