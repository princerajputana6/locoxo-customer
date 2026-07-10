/**
 * Location helpers built on the NEW Google Places API
 * (google.maps.places.AutocompleteSuggestion / Place) plus the Geocoding API
 * for reverse geocoding. The legacy AutocompleteService / PlacesService is NOT
 * served to Google Cloud accounts created after March 1, 2025, so we must not
 * use it here.
 *
 * Requires (in Google Cloud Console, for the same key):
 *   - Maps JavaScript API   (enabled)
 *   - Places API (New)      (enabled)  -> city search
 *   - Geocoding API         (enabled)  -> reverse geocoding (current location)
 */

// A single session token reused across a "typing session" reduces billing and
// improves prediction quality. We rotate it after a place is selected.
let sessionToken = null;

const ensureSessionToken = async () => {
  const { AutocompleteSessionToken } = await window.google.maps.importLibrary('places');
  if (!sessionToken) sessionToken = new AutocompleteSessionToken();
  return sessionToken;
};

/**
 * City autocomplete using the new AutocompleteSuggestion API.
 * @returns {Promise<Array<{placeId:string, description:string}>>}
 */
export const fetchCitySuggestions = async (input) => {
  if (!input || input.trim().length < 3) return [];

  const { AutocompleteSuggestion } = await window.google.maps.importLibrary('places');
  const token = await ensureSessionToken();

  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    includedRegionCodes: ['in'],
    includedPrimaryTypes: ['(cities)'],
    sessionToken: token,
  });

  return (suggestions || [])
    .map((s) => s.placePrediction)
    .filter(Boolean)
    .map((p) => ({
      placeId: p.placeId,
      description: p.text?.text || '',
    }));
};

/**
 * Full address autocomplete (streets, establishments, etc.) using the new API.
 * @returns {Promise<Array<{placeId:string, description:string, mainText:string, secondaryText:string}>>}
 */
export const fetchAddressSuggestions = async (input) => {
  if (!input || input.trim().length < 3) return [];

  const { AutocompleteSuggestion } = await window.google.maps.importLibrary('places');
  const token = await ensureSessionToken();

  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    includedRegionCodes: ['in'],
    sessionToken: token,
  });

  return (suggestions || [])
    .map((s) => s.placePrediction)
    .filter(Boolean)
    .map((p) => ({
      placeId: p.placeId,
      description: p.text?.text || '',
      mainText: p.mainText?.text || p.text?.text || '',
      secondaryText: p.secondaryText?.text || '',
    }));
};

/**
 * Fetch the full place record (raw address components) for detailed address forms.
 * @returns {Promise<{addressComponents:Array, formatted:string, location:{lat:number, lng:number}|null}>}
 */
export const getPlaceRaw = async (placeId) => {
  const { Place } = await window.google.maps.importLibrary('places');
  const place = new Place({ id: placeId });
  await place.fetchFields({
    fields: ['addressComponents', 'location', 'formattedAddress'],
  });
  sessionToken = null;
  return {
    addressComponents: place.addressComponents || [],
    formatted: place.formattedAddress || '',
    location: place.location ? { lat: place.location.lat(), lng: place.location.lng() } : null,
  };
};

const parseComponents = (addressComponents = []) => {
  let pincode = '';
  let city = '';
  let state = '';
  addressComponents.forEach((c) => {
    const types = c.types || [];
    const value = c.longText || c.long_name || '';
    if (types.includes('postal_code')) pincode = value;
    if (types.includes('locality')) city = value;
    if (types.includes('administrative_area_level_1')) state = value;
  });
  return { pincode, city, state };
};

/**
 * Resolve a selected suggestion to usable address fields using the new Place class.
 * @returns {Promise<{city:string, state:string, pincode:string, formatted:string, lat:number|null, lng:number|null}>}
 */
export const getPlaceDetails = async (placeId) => {
  const { Place } = await window.google.maps.importLibrary('places');
  const place = new Place({ id: placeId });
  await place.fetchFields({
    fields: ['addressComponents', 'location', 'formattedAddress'],
  });

  // Rotate the session token after a selection completes the session.
  sessionToken = null;

  const { pincode, city, state } = parseComponents(place.addressComponents);
  return {
    city,
    state,
    pincode,
    formatted: place.formattedAddress || '',
    lat: place.location ? place.location.lat() : null,
    lng: place.location ? place.location.lng() : null,
  };
};

/**
 * Reverse geocode a lat/lng to address fields (needs the Geocoding API enabled).
 * @returns {Promise<{city:string, state:string, pincode:string, formatted:string}>}
 */
export const reverseGeocode = async (lat, lng) => {
  await window.google.maps.importLibrary('geocoding');
  const geocoder = new window.google.maps.Geocoder();
  const { results } = await geocoder.geocode({ location: { lat, lng } });
  if (!results || !results[0]) {
    throw new Error('NO_RESULTS');
  }
  const { pincode, city, state } = parseComponents(results[0].address_components);
  return { city, state, pincode, formatted: results[0].formatted_address };
};

/**
 * Reverse geocode returning the raw first result (address_components / geometry)
 * for detailed address forms. Needs the Geocoding API enabled.
 */
export const reverseGeocodeRaw = async (lat, lng) => {
  await window.google.maps.importLibrary('geocoding');
  const geocoder = new window.google.maps.Geocoder();
  const { results } = await geocoder.geocode({ location: { lat, lng } });
  if (!results || !results[0]) throw new Error('NO_RESULTS');
  return {
    addressComponents: results[0].address_components || [],
    formatted: results[0].formatted_address || '',
    location: { lat, lng },
  };
};

/** Get the browser's current position as a promise. */
export const getCurrentPosition = (options = {}) =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('GEOLOCATION_UNSUPPORTED'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options,
    });
  });
