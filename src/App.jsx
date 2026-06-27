import { useState } from 'react';
import { AppRoutes } from './routes';
import SplashScreen from '@/components/layout/SplashScreen';

// Detect bots/crawlers to skip splash screen for SEO
const isBot = /bot|crawl|spider|lighthouse|googlebot|bingbot|yandex|baidu|facebookexternalhit|twitterbot|linkedinbot|whatsapp/i.test(
  navigator.userAgent
);

export default function App() {
  const [showSplash, setShowSplash] = useState(!isBot);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <AppRoutes />
    </>
  );
}
