import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const OurPolicy = () => {
  const { products } = useContext(ShopContext);
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    customers: 0,
    categories: 0
  });

  useEffect(() => {
    // Animate counter
    const targetStats = {
      orders: 15000,
      products: products?.length || 500,
      customers: 25000,
      categories: 50
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        orders: Math.floor(targetStats.orders * progress),
        products: Math.floor(targetStats.products * progress),
        customers: Math.floor(targetStats.customers * progress),
        categories: Math.floor(targetStats.categories * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [products]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num + '+';
  };

  const statsData = [
    {
      value: stats.orders,
      label: 'Orders Delivered',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
        </svg>
      ),
      color: 'from-green-500 to-emerald-600'
    },
    {
      value: stats.products,
      label: 'Products Available',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-600'
    },
    {
      value: stats.customers,
      label: 'Happy Customers',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
        </svg>
      ),
      color: 'from-purple-500 to-pink-600'
    },
    {
      value: stats.categories,
      label: 'Categories',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
        </svg>
      ),
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className='py-16 sm:py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-[1920px] mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3'>Our Journey in Numbers</h2>
          <p className='text-gray-600 text-sm sm:text-base'>Trusted by thousands of customers across India</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className='relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              
              {/* Value */}
              <h3 className='text-3xl sm:text-4xl font-bold mb-2'>{formatNumber(stat.value)}</h3>
              
              {/* Label */}
              <p className='text-gray-600 text-sm sm:text-base font-medium'>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className='mt-12 flex flex-wrap justify-center gap-8 sm:gap-12'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-sm'>100% Secure</p>
              <p className='text-xs text-gray-500'>Payment</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-sm'>Fast Delivery</p>
              <p className='text-xs text-gray-500'>2-5 Days</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center'>
              <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-sm'>Easy Returns</p>
              <p className='text-xs text-gray-500'>7 Days Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
