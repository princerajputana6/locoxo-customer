import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='sticky top-0 z-50 bg-white border-b border-gray-200'>
      <div className='flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 max-w-[1920px] mx-auto'>
      
      <Link to='/' className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-black flex items-center justify-center'>
          <span className='text-white font-bold text-xl'>L</span>
        </div>
        <span className='text-2xl font-bold tracking-tight'>LOCOXO</span>
      </Link>

      <ul className='hidden md:flex gap-8 text-sm font-medium tracking-wide'>
        
        <NavLink to='/' className={({isActive}) => `relative py-2 transition-colors ${isActive ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' : 'text-gray-600 hover:text-black'}`}>
            HOME
        </NavLink>
        <NavLink to='/collection' className={({isActive}) => `relative py-2 transition-colors ${isActive ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' : 'text-gray-600 hover:text-black'}`}>
            SHOP
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
            <button onClick={()=> { setShowSearch(true); navigate('/collection') }} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </button>
            
            <div className='group relative'>
                <button onClick={()=> token ? null : navigate('/login') } className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </button>
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-1 w-40 py-2 bg-white border border-gray-200 shadow-lg'>
                        <p className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'>Orders</p>
                        <p onClick={logout} className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'>Logout</p>
                    </div>
                </div>}
            </div> 
            <Link to='/cart' className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
                {getCartCount() > 0 && <span className='absolute -top-1 -right-1 w-5 h-5 text-center leading-5 bg-black text-white text-xs font-bold rounded-full'>{getCartCount()}</span>}
            </Link> 
            <button onClick={()=>setVisible(true)} className='p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
      </div>
      </div>

        {/* Sidebar menu for small screens */}
        <div className={`fixed top-0 right-0 bottom-0 bg-white shadow-2xl transition-all duration-300 z-50 ${visible ? 'w-80' : 'w-0'} overflow-hidden`}>
                <div className='flex flex-col h-full'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-6 border-b cursor-pointer hover:bg-gray-50'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                        <p className='font-medium'>Close</p>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                      <NavLink onClick={()=>setVisible(false)} className='block py-4 px-6 border-b hover:bg-gray-50 font-medium transition-colors' to='/'>HOME</NavLink>
                      <NavLink onClick={()=>setVisible(false)} className='block py-4 px-6 border-b hover:bg-gray-50 font-medium transition-colors' to='/collection'>SHOP</NavLink>
                    </div>
                </div>
        </div>
        {visible && <div onClick={()=>setVisible(false)} className='fixed inset-0 bg-black bg-opacity-50 z-40'></div>}
    </div>
  )
}

export default Navbar
