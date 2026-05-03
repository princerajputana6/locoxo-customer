import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const PriceBasedCombo = () => {
  const { products, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const comboDealss = [
    {
      id: 1,
      title: '2 T-Shirts',
      price: 399,
      originalPrice: 798,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
      color: 'from-green-500 to-emerald-600',
      description: 'Mix & Match any 2 T-shirts',
      badge: 'BESTSELLER'
    },
    {
      id: 2,
      title: '3 T-Shirts',
      price: 599,
      originalPrice: 1197,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80',
      color: 'from-blue-500 to-cyan-600',
      description: 'Pick any 3 T-shirts',
      badge: 'POPULAR'
    },
    {
      id: 3,
      title: 'Buy 2 Get 1 Free',
      price: 799,
      originalPrice: 1197,
      discount: 'BUY 2 GET 1',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80',
      color: 'from-purple-500 to-pink-600',
      description: 'Premium collection combo',
      badge: 'HOT DEAL'
    },
    {
      id: 4,
      title: '5 T-Shirts Combo',
      price: 999,
      originalPrice: 1995,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80',
      color: 'from-orange-500 to-red-600',
      description: 'Best value pack',
      badge: 'SAVE MORE'
    },
    {
      id: 5,
      title: 'Couple Combo',
      price: 699,
      originalPrice: 1398,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80',
      color: 'from-pink-500 to-rose-600',
      description: '1 Men + 1 Women T-shirt',
      badge: 'TRENDING'
    },
    {
      id: 6,
      title: 'Family Pack',
      price: 1299,
      originalPrice: 2598,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
      color: 'from-indigo-500 to-purple-600',
      description: '4 T-shirts for family',
      badge: 'VALUE PACK'
    }
  ];

  const handleComboClick = (combo) => {
    navigate('/collection');
  };

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-[1920px] mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3'>Shop By Budget</h2>
          <p className='text-gray-600 text-sm sm:text-base'>Amazing combo deals - Save more, Shop more!</p>
        </div>

        {/* Combo Deals Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {comboDealss.map((combo) => (
            <div
              key={combo.id}
              onClick={() => handleComboClick(combo)}
              className='group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2'
            >
              {/* Badge */}
              <div className='absolute top-4 left-4 z-10'>
                <span className={`bg-gradient-to-r ${combo.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {combo.badge}
                </span>
              </div>

              {/* Discount Badge */}
              <div className='absolute top-4 right-4 z-10'>
                <span className='bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                  {combo.discount}
                </span>
              </div>

              {/* Image */}
              <div className='aspect-[4/3] overflow-hidden'>
                <img
                  src={combo.image}
                  alt={combo.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <h3 className='text-xl sm:text-2xl font-bold mb-2'>{combo.title}</h3>
                <p className='text-gray-600 text-sm mb-4'>{combo.description}</p>

                {/* Price */}
                <div className='flex items-center gap-3 mb-4'>
                  <span className='text-3xl font-bold text-black'>₹{combo.price}</span>
                  <span className='text-lg text-gray-400 line-through'>₹{combo.originalPrice}</span>
                </div>

                {/* CTA Button */}
                <button className={`w-full bg-gradient-to-r ${combo.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                  Shop This Combo
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient rounded-xl transition-all duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-12 text-center bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 sm:p-12 text-white'>
          <h3 className='text-2xl sm:text-3xl font-bold mb-4'>Want to Create Your Own Combo?</h3>
          <p className='text-white/90 mb-6 text-sm sm:text-base'>Browse our collection and mix & match your favorites</p>
          <button
            onClick={() => navigate('/collection')}
            className='bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2'
          >
            <span>Browse All Products</span>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PriceBasedCombo
