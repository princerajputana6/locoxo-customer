import React, { useContext, useState, useEffect, useRef } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import useGoogleMaps from '../hooks/useGoogleMaps';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('Select Location');
    const [selectedPincode, setSelectedPincode] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const autocompleteService = useRef(null);
    const geocoder = useRef(null);

    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems, categories} = useContext(ShopContext);
    const { isLoaded: googleMapsLoaded, loadError } = useGoogleMaps();

    // Serviceable pincodes - Currently only Rajasthan
    const serviceablePincodes = [
        // Jaipur
        '302001', '302002', '302003', '302004', '302005', '302006', '302012', '302013', '302015', '302016', '302017', '302018', '302019', '302020', '302021', '302022', '302023', '302026', '302027', '302028', '302029', '302031', '302033', '302034', '302036', '302037', '302038', '302039', '302040', '302041', '302042',
        // Jodhpur
        '342001', '342002', '342003', '342004', '342005', '342006', '342007', '342008', '342009', '342010', '342011', '342012', '342013', '342014', '342015',
        // Udaipur
        '313001', '313002', '313003', '313004', '313011', '313015', '313022', '313024',
        // Kota
        '324001', '324002', '324003', '324004', '324005', '324006', '324007', '324008', '324009', '324010',
        // Ajmer
        '305001', '305002', '305003', '305004', '305005', '305006', '305007', '305008', '305009', '305010',
        // Bikaner
        '334001', '334002', '334003', '334004', '334005', '334006', '334007', '334008', '334009',
        // Alwar
        '301001', '301002', '301003', '301004', '301005', '301006', '301007', '301008',
        // Bharatpur
        '321001', '321002', '321003', '321004', '321005', '321006',
        // Sikar
        '332001', '332002', '332003', '332004', '332005', '332006', '332007',
        // Pali
        '306001', '306002', '306003', '306004', '306005', '306006',
        // Sri Ganganagar
        '335001', '335002', '335003', '335004', '335005', '335006', '335007', '335008',
        // Bhilwara
        '311001', '311002', '311003', '311004', '311005',
    ];

    useEffect(() => {
        // Initialize Google Places API when loaded
        if (googleMapsLoaded && window.google && window.google.maps && window.google.maps.places) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            geocoder.current = new window.google.maps.Geocoder();
            console.log('✅ Google Maps services initialized');
        }
    }, [googleMapsLoaded]);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/collection?search=${searchQuery}`);
        }
    };

    const handleLocationSearch = (value) => {
        setLocationInput(value);
        
        if (value.length > 2) {
            if (!autocompleteService.current) {
                console.warn('Google Places API not loaded yet. Please wait...');
                toast.error('Location service is loading. Please try again in a moment.');
                return;
            }
            
            autocompleteService.current.getPlacePredictions(
                {
                    input: value,
                    componentRestrictions: { country: 'in' },
                    types: ['(cities)']
                },
                (predictions, status) => {
                    if (status === window.google?.maps?.places?.PlacesServiceStatus?.OK && predictions) {
                        setPredictions(predictions);
                    } else if (status === window.google?.maps?.places?.PlacesServiceStatus?.ZERO_RESULTS) {
                        setPredictions([]);
                        console.log('No results found for:', value);
                    } else {
                        setPredictions([]);
                        console.error('Places API error:', status);
                    }
                }
            );
        } else {
            setPredictions([]);
        }
    };

    const selectLocation = async (prediction) => {
        if (!googleMapsLoaded || !geocoder.current) {
            toast.error('Location service not ready. Please try again.');
            return;
        }
        
        try {
            const { results } = await geocoder.current.geocode({ placeId: prediction.place_id });
            
            if (results && results[0]) {
                const addressComponents = results[0].address_components;
                let pincode = '';
                let city = '';

                addressComponents.forEach(component => {
                    if (component.types.includes('postal_code')) {
                        pincode = component.long_name;
                    }
                    if (component.types.includes('locality')) {
                        city = component.long_name;
                    }
                });

                if (pincode) {
                    // Check if pincode is serviceable
                    const isServiceable = serviceablePincodes.some(code => 
                        pincode.startsWith(code.substring(0, 3))
                    );

                    if (isServiceable) {
                        setSelectedLocation(city || prediction.description);
                        setSelectedPincode(pincode);
                        setShowLocationModal(false);
                        setLocationInput('');
                        setPredictions([]);
                        toast.success(`Delivery available in ${city} - ${pincode}`);
                    } else {
                        toast.error(`Sorry, we currently deliver only in Rajasthan. ${city} - ${pincode} is not serviceable yet.`);
                    }
                } else {
                    // No pincode found, still allow selection but warn
                    setSelectedLocation(city || prediction.description);
                    setShowLocationModal(false);
                    setLocationInput('');
                    setPredictions([]);
                    toast.warning(`Location selected: ${city || prediction.description}. Pincode verification unavailable.`);
                }
            } else {
                toast.error('Unable to get location details. Please try again.');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            toast.error('Unable to get location details. Please try again.');
        }
    };

    const useCurrentLocation = async () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }

        if (!googleMapsLoaded || !geocoder.current) {
            toast.error('Location service not ready. Please wait a moment and try again.');
            return;
        }

        setLoadingLocation(true);
        toast.info('Getting your location...');

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            });

            const { latitude, longitude } = position.coords;

            // Use modern Promise-based geocode
            const { results } = await geocoder.current.geocode({
                location: { lat: latitude, lng: longitude }
            });

            setLoadingLocation(false);

            if (results && results[0]) {
                const addressComponents = results[0].address_components;
                let pincode = '';
                let city = '';
                let fullAddress = results[0].formatted_address;

                addressComponents.forEach(component => {
                    if (component.types.includes('postal_code')) {
                        pincode = component.long_name;
                    }
                    if (component.types.includes('locality')) {
                        city = component.long_name;
                    }
                });

                if (pincode) {
                    const isServiceable = serviceablePincodes.some(code => 
                        pincode.startsWith(code.substring(0, 3))
                    );

                    if (isServiceable) {
                        setSelectedLocation(city || fullAddress);
                        setSelectedPincode(pincode);
                        setShowLocationModal(false);
                        toast.success(`Delivery available in ${city} - ${pincode}`);
                    } else {
                        toast.error(`Sorry, we currently deliver only in Rajasthan. ${city} - ${pincode} is not serviceable yet.`);
                    }
                } else {
                    setSelectedLocation(city || fullAddress);
                    setShowLocationModal(false);
                    toast.warning(`Location detected: ${city || fullAddress}`);
                }
            } else {
                toast.error('Unable to get address from your location');
            }
        } catch (error) {
            setLoadingLocation(false);
            console.error('Location error:', error);

            if (error.code) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toast.error('Location permission denied. Please enable location access.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        toast.error('Location information unavailable.');
                        break;
                    case error.TIMEOUT:
                        toast.error('Location request timed out.');
                        break;
                    default:
                        toast.error('An error occurred while getting your location.');
                }
            } else {
                toast.error('Unable to get address from your location');
            }
        }
    };

  return (
    <div className='sticky top-0 z-50 bg-white border-b border-gray-200'>
      {/* Top Header */}
      <div className='flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3 max-w-[1920px] mx-auto border-b border-gray-100'>
      
      {/* Left side - Hamburger menu + Location */}
      <div className='flex items-center gap-4'>
        <button onClick={()=>setVisible(true)} className='p-2 hover:bg-gray-100 rounded transition-colors'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
        
        {/* Location Picker */}
        <button 
          onClick={() => setShowLocationModal(true)}
          className='hidden sm:flex items-center gap-1 text-xs hover:bg-gray-100 px-2 py-1 rounded transition-colors'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
          <span className='font-medium'>{selectedLocation}</span>
          <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>
      </div>

      {/* Center - Logo */}
      <Link to='/' className='flex items-center'>
        <img src={assets.logo} alt='LOCOXO' className='h-6 sm:h-8 w-auto object-contain' />
      </Link>

      {/* Right side - Search + Icons */}
      <div className='flex items-center gap-2 sm:gap-4'>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className='hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-48 lg:w-64'>
              <svg className='w-4 h-4 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input 
                type='text'
                placeholder='Search "WHITE SHIRT"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-transparent outline-none text-sm ml-2 w-full placeholder-gray-500'
              />
            </form>

            {/* Mobile Search Icon */}
            <button onClick={()=> { setShowSearch(true); navigate('/collection') }} className='md:hidden p-1.5 hover:bg-gray-100 rounded transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </button>
            
            <div className='group relative'>
                <button onClick={()=> token ? null : navigate('/login') } className='p-1.5 hover:bg-gray-100 rounded transition-colors'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </button>
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-1 w-40 py-2 bg-white border border-gray-200 shadow-lg rounded-lg'>
                        <p onClick={()=>navigate('/profile')} className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'>Orders</p>
                        <p onClick={logout} className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'>Logout</p>
                    </div>
                </div>}
            </div> 
            <Link to='/cart' className='relative p-1.5 hover:bg-gray-100 rounded transition-colors'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
                {getCartCount() > 0 && <span className='absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-center leading-4 sm:leading-5 bg-black text-white text-[10px] sm:text-xs font-bold rounded-full'>{getCartCount()}</span>}
            </Link> 
      </div>
      </div>

      {/* Category Navigation Bar */}
      <div className='hidden lg:block bg-white'>
        <div className='max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16'>
          <div className='flex items-center justify-center gap-8 py-3 overflow-x-auto scrollbar-hide'>
            <NavLink to='/collection' className='text-sm font-medium hover:text-gray-600 transition-colors whitespace-nowrap'>
              Discover
            </NavLink>
            {categories.slice(0, 8).map((category) => (
              <NavLink 
                key={category._id}
                to={`/collection?category=${category.name}`}
                className='text-sm font-medium hover:text-gray-600 transition-colors whitespace-nowrap'
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

        {/* Sidebar menu with categories */}
        <div className={`fixed top-0 left-0 bottom-0 bg-white shadow-2xl transition-all duration-300 z-50 ${visible ? 'w-80' : 'w-0'} overflow-hidden`}>
                <div className='flex flex-col h-full'>
                    <div onClick={()=>setVisible(false)} className='flex items-center justify-between p-6 border-b'>
                        <span className='font-bold text-lg tracking-wide'>MENU</span>
                        <button className='p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                          </svg>
                        </button>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                      <NavLink onClick={()=>setVisible(false)} className='block py-4 px-6 border-b hover:bg-gray-50 font-medium transition-colors' to='/'>HOME</NavLink>
                      <NavLink onClick={()=>setVisible(false)} className='block py-4 px-6 border-b hover:bg-gray-50 font-medium transition-colors' to='/collection'>SHOP ALL</NavLink>
                      
                      {categories.length > 0 && (
                        <>
                          <div className='py-4 px-6 border-b bg-gray-50'>
                            <span className='text-xs font-bold text-gray-500 uppercase tracking-wider'>Categories</span>
                          </div>
                          
                          {categories.filter(cat => !cat.parentCategory).map((category) => (
                            <div key={category._id}>
                              <NavLink 
                                onClick={()=>setVisible(false)} 
                                className='flex items-center justify-between py-4 px-6 border-b hover:bg-gray-50 font-medium transition-colors' 
                                to={`/collection?category=${category.name}`}
                              >
                                {category.name}
                                <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
                              </NavLink>
                              {categories.filter(sub => sub.parentCategory === category._id).length > 0 && (
                                <div className='bg-gray-50'>
                                  {categories.filter(sub => sub.parentCategory === category._id).map((subCat) => (
                                    <NavLink
                                      key={subCat._id}
                                      onClick={()=>setVisible(false)}
                                      className='flex items-center justify-between py-3 px-6 pl-12 border-b hover:bg-gray-100 text-sm transition-colors'
                                      to={`/collection?category=${subCat.name}`}
                                    >
                                      {subCat.name}
                                      <svg className='w-3 h-3 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
                                    </NavLink>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                </div>
        </div>
        {visible && <div onClick={()=>setVisible(false)} className='fixed inset-0 bg-black bg-opacity-50 z-40'></div>}

        {/* Location Modal */}
        {showLocationModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg max-w-md w-full p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-bold'>Select Your Location</h3>
                <button onClick={() => {
                  setShowLocationModal(false);
                  setLocationInput('');
                  setPredictions([]);
                }} className='p-2 hover:bg-gray-100 rounded'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              
              {/* Use Current Location Button */}
              <button
                onClick={useCurrentLocation}
                disabled={loadingLocation}
                className='w-full mb-4 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                {loadingLocation ? (
                  <>
                    <svg className='animate-spin w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                    </svg>
                    <span>Getting location...</span>
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    <span>Use My Current Location</span>
                  </>
                )}
              </button>

              <div className='relative mb-4'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>or search manually</span>
                </div>
              </div>

              {/* Search Input */}
              <div className='mb-4'>
                <div className='relative'>
                  <svg className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                  <input
                    type='text'
                    value={locationInput}
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    placeholder='Search for your city...'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-gray-100 outline-none'
                  />
                </div>
              </div>

              {/* Predictions */}
              <div className='max-h-96 overflow-y-auto'>
                {predictions.length > 0 ? (
                  <div className='space-y-2'>
                    {predictions.map((prediction) => (
                      <button
                        key={prediction.place_id}
                        onClick={() => selectLocation(prediction)}
                        className='w-full p-3 text-left rounded border-2 border-gray-200 hover:border-black transition-colors flex items-center gap-2'
                      >
                        <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        <span className='text-sm'>{prediction.description}</span>
                      </button>
                    ))}
                  </div>
                ) : locationInput.length > 0 ? (
                  <p className='text-center text-gray-500 py-8'>No locations found. Try searching for a city name.</p>
                ) : (
                  <div className='text-center text-gray-500 py-8'>
                    <svg className='w-12 h-12 mx-auto mb-3 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    <p>Start typing to search for your city</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Navbar
