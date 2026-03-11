import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
    
  return showSearch && visible ? (
    <div className='border-b bg-white py-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='flex items-center gap-4 max-w-2xl mx-auto'>
        <div className='flex-1 flex items-center gap-3 border-2 border-gray-300 px-4 py-3 focus-within:border-black transition-colors'>
          <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <input 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)} 
            className='flex-1 outline-none text-sm' 
            type="text" 
            placeholder='Search for products...'
            autoFocus
          />
        </div>
        <button onClick={()=>setShowSearch(false)} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
    </div>
  ) : null
}

export default SearchBar
