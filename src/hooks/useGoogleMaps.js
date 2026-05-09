import { useEffect, useState } from 'react';

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Get API key from environment
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY_HERE') {
      console.warn('⚠️ Google Places API key not found in .env file');
      setLoadError('API key not configured');
      return;
    }

    // Create callback function
    window.initMap = () => {
      setIsLoaded(true);
      console.log('✅ Google Maps API loaded successfully');
    };

    // Load the script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      console.error('❌ Failed to load Google Maps API');
      setLoadError('Failed to load Google Maps');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      delete window.initMap;
    };
  }, []);

  return { isLoaded, loadError };
};

export default useGoogleMaps;
