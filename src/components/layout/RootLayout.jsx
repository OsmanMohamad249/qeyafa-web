import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function RootLayout({ children }) {
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

