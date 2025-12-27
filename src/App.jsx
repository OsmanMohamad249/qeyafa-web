import { useState } from 'react';
import { AppRoutes } from './routes';
import SplashScreen from '@/components/layout/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Optional: Check if splash has already been shown in this session
  // useEffect(() => {
  //   const hasShownSplash = sessionStorage.getItem('hasShownSplash');
  //   if (hasShownSplash) {
  //     setShowSplash(false);
  //   }
  // }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // sessionStorage.setItem('hasShownSplash', 'true');
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <AppRoutes />
    </>
  );
}
