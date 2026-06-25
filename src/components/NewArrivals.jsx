import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const NewArrivals = () => {
  const { products } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Get products sorted by creation date (newest first)
      const sortedProducts = [...products]
        .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
        .slice(0, 8);
      
      setNewArrivals(sortedProducts);
    }
  }, [products]);

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-[1920px] mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-10'>
          <div className='inline-flex items-center gap-2 bg-locoxo-orange text-white px-4 py-2 rounded-full mb-4'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
            </svg>
            <span className='text-sm font-semibold'>NEW</span>
          </div>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3'>New Arrivals</h2>
          <p className='text-gray-600 text-sm sm:text-base'>Fresh styles just dropped - Be the first to wear them</p>
        </div>

        {/* Products Grid */}
        {newArrivals.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
            {newArrivals.map((item, index) => (
              <div key={index} className='relative group'>
                {/* New Badge */}
                <div className='absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                  NEW
                </div>
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No new arrivals at the moment. Check back soon!</p>
          </div>
        )}

        {/* View More Button */}
        {newArrivals.length > 0 && (
          <div className='text-center mt-10'>
            <button
              onClick={() => window.location.href = '/collection?sort=newest'}
              className='bg-locoxo-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-locoxo-orange-dark transition-colors'
            >
              View All New Arrivals
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewArrivals
