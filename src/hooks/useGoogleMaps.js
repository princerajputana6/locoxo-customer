import { useEffect, useState } from 'react';

/**
 * Loads the Google Maps JS API exactly once for the whole app (singleton),
 * using the modern `loading=async` bootstrap so we can call
 * `google.maps.importLibrary(...)` and use the NEW Places API
 * (AutocompleteSuggestion / Place), which is the only Places API served to
 * Google Cloud accounts created after March 1, 2025.
 */

let loadPromise = null;

const loadGoogleMaps = () => {
  // Already available on the window.
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }

  // A load is already in flight (another component started it) — reuse it.
  if (loadPromise) return loadPromise;

  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY_HERE') {
    return Promise.reject(new Error('API key not configured'));
  }

  loadPromise = new Promise((resolve, reject) => {
    // If a script tag already exists (e.g. after HMR), wait for it instead of
    // injecting a duplicate (duplicates make Google throw and break the API).
    const existing = document.querySelector('script[data-google-maps-loader]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps-loader', 'true');
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null; // allow a retry on a later mount
      reject(new Error('Failed to load Google Maps'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
};

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(!!(window.google && window.google.maps));
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (!cancelled) {
          setIsLoaded(true);
          console.log('✅ Google Maps API loaded');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('❌ Google Maps failed to load:', err.message);
          setLoadError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { isLoaded, loadError };
};

export default useGoogleMaps;
