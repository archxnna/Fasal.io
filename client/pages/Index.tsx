import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import StickyFeatures from '@/components/StickyFeatures';
import RatingSection from '@/components/RatingSection';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoginRequired = () => {
    console.log('Login required');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      {isLoading && <LoadingScreen />}

      {!isLoading && (
        <>
          <HeroSection />
          <StickyFeatures />
          <RatingSection isLoggedIn={false} onLoginRequired={handleLoginRequired} />
        </>
      )}
    </div>
  );
}
