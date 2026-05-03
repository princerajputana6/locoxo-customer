import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('Select Location');
    const [searchQuery, setSearchQuery] = useState('');

    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems, categories} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const locations = [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
        'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/collection?search=${searchQuery}`);
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
      <Link to='/' className='flex items-center gap-1 sm:gap-2'>
        <div className='w-6 h-6 sm:w-7 sm:h-7 bg-black flex items-center justify-center'>
          <span className='text-white font-bold text-base sm:text-lg'>L</span>
        </div>
        <span className='text-base sm:text-xl font-bold tracking-tight'>LOCOXO</span>
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
                <button onClick={() => setShowLocationModal(false)} className='p-2 hover:bg-gray-100 rounded'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='grid grid-cols-2 gap-2 max-h-96 overflow-y-auto'>
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocationModal(false);
                    }}
                    className={`p-3 text-left rounded border-2 transition-colors ${
                      selectedLocation === location 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Navbar
