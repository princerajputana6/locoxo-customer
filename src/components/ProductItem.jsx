import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link onClick={() => scrollTo(0, 0)} className='group block' to={`/product/${id}`}>
      <div className='relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4'>
        <img 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
          src={image[0]} 
          alt={name} 
        />
        {image[1] && (
          <img 
            className='absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500' 
            src={image[1]} 
            alt={name} 
          />
        )}
        <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
        
        {/* Quick View Button */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button className='bg-white text-black px-6 py-2 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition-colors'>
            QUICK VIEW
          </button>
        </div>
      </div>
      
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-2'>
          {name}
        </h3>
        <p className='text-base font-bold text-black'>
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
