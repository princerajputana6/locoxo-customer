import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('Select Location');
    const [selectedPincode, setSelectedPincode] = useState('');
    const [manualPincode, setManualPincode] = useState('');
    const [manualCity, setManualCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems, categories} = useContext(ShopContext);

    // Serviceable pincodes and cities
    const serviceableLocations = [
        { city: 'Mumbai', pincodes: ['400001', '400002', '400003', '400004', '400005', '400051', '400052', '400053'] },
        { city: 'Delhi', pincodes: ['110001', '110002', '110003', '110004', '110005', '110051', '110052'] },
        { city: 'Bangalore', pincodes: ['560001', '560002', '560003', '560004', '560005', '560051', '560052'] },
        { city: 'Hyderabad', pincodes: ['500001', '500002', '500003', '500004', '500005', '500051', '500052'] },
        { city: 'Chennai', pincodes: ['600001', '600002', '600003', '600004', '600005', '600051', '600052'] },
        { city: 'Kolkata', pincodes: ['700001', '700002', '700003', '700004', '700005', '700051', '700052'] },
        { city: 'Pune', pincodes: ['411001', '411002', '411003', '411004', '411005', '411051', '411052'] },
        { city: 'Ahmedabad', pincodes: ['380001', '380002', '380003', '380004', '380005', '380051', '380052'] },
    ];

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

    const checkServiceability = (pincode) => {
        for (const location of serviceableLocations) {
            if (location.pincodes.includes(pincode)) {
                return { serviceable: true, city: location.city };
            }
        }
        return { serviceable: false, city: null };
    };

    const handleManualLocationSubmit = () => {
        if (!manualPincode || !manualCity) {
            toast.error('Please enter both city and pincode');
            return;
        }

        const { serviceable, city } = checkServiceability(manualPincode);

        if (serviceable) {
            setSelectedLocation(manualCity);
            setSelectedPincode(manualPincode);
            setShowLocationModal(false);
            setManualPincode('');
            setManualCity('');
            toast.success(`Delivery available in ${manualCity} - ${manualPincode}`);
        } else {
            toast.error(`Sorry, we don't deliver to ${manualCity} - ${manualPincode} yet. We're expanding soon!`);
        }
    };

    const selectPredefinedLocation = (location) => {
        setSelectedLocation(location.city);
        setSelectedPincode(location.pincodes[0]);
        setShowLocationModal(false);
        toast.success(`Delivery available in ${location.city} - ${location.pincodes[0]}`);
    };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        
        <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

        </ul>

        <div className='flex items-center gap-6'>
            
            {/* Location Selector */}
            <button 
                onClick={() => setShowLocationModal(true)}
                className='flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
            >
                <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                <div className='text-left hidden sm:block'>
                    <p className='text-xs text-gray-500'>Deliver to</p>
                    <p className='text-sm font-semibold text-gray-800 truncate max-w-[120px]'>
                        {selectedLocation}
                    </p>
                </div>
            </button>

            {/* Search Icon */}
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

            {/* Profile Dropdown */}
            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {/* Dropdown Menu */}
                {
                    token &&
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                }
            </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
            </div>
        </div>

        {/* Location Modal */}
        {showLocationModal && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                <div className='bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-2xl font-bold'>Select Location</h2>
                        <button 
                            onClick={() => setShowLocationModal(false)}
                            className='text-gray-500 hover:text-gray-700'
                        >
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>

                    {/* Manual Input */}
                    <div className='mb-6'>
                        <h3 className='font-semibold mb-3'>Enter Your Location</h3>
                        <input
                            type='text'
                            placeholder='City (e.g., Mumbai)'
                            value={manualCity}
                            onChange={(e) => setManualCity(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black'
                        />
                        <input
                            type='text'
                            placeholder='Pincode (e.g., 400001)'
                            value={manualPincode}
                            onChange={(e) => setManualPincode(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black'
                        />
                        <button
                            onClick={handleManualLocationSubmit}
                            className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors'
                        >
                            Check Serviceability
                        </button>
                    </div>

                    {/* Predefined Locations */}
                    <div>
                        <h3 className='font-semibold mb-3'>Or Select a City</h3>
                        <div className='grid grid-cols-2 gap-2'>
                            {serviceableLocations.map((location, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectPredefinedLocation(location)}
                                    className='px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left'
                                >
                                    <p className='font-semibold'>{location.city}</p>
                                    <p className='text-xs text-gray-500'>{location.pincodes[0]}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
                        <p className='text-xs text-blue-800'>
                            💡 We currently deliver to major cities. More locations coming soon!
                        </p>
                    </div>
                </div>
            </div>
        )}

    </div>
  )
}

export default Navbar
