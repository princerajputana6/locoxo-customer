import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Package, Layers, Users, Grid3x3, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react'
import Title from './Title'

const OurPolicy = () => {
  const { products } = useContext(ShopContext)
  const [stats, setStats] = useState({ orders: 0, products: 0, customers: 0, categories: 0 })

  useEffect(() => {
    const target = {
      orders: 15000,
      products: products?.length || 500,
      customers: 25000,
      categories: 50,
    }
    const steps = 60
    const interval = 2000 / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const p = step / steps
      setStats({
        orders: Math.floor(target.orders * p),
        products: Math.floor(target.products * p),
        customers: Math.floor(target.customers * p),
        categories: Math.floor(target.categories * p),
      })
      if (step >= steps) {
        clearInterval(timer)
        setStats(target)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [products])

  const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+' : num + '+')

  const statsData = [
    { value: stats.orders,     label: 'Orders Delivered',  Icon: Package },
    { value: stats.products,   label: 'Products Available', Icon: Layers },
    { value: stats.customers,  label: 'Happy Customers',    Icon: Users },
    { value: stats.categories, label: 'Categories',         Icon: Grid3x3 },
  ]

  const trustData = [
    { Icon: ShieldCheck, title: '100% Secure Payment',    desc: 'SSL encrypted & PCI compliant' },
    { Icon: Truck,       title: 'Fast Delivery',           desc: '2–5 days across India' },
    { Icon: RotateCcw,   title: 'Hassle-Free Returns',     desc: '7-day easy return policy' },
    { Icon: Headphones,  title: '24/7 Support',            desc: 'Always here to help you' },
  ]

  return (
    <section className='my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'OUR JOURNEY'} text2={'IN NUMBERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Trusted by thousands of customers across India.
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 lg:grid-cols-4 border-y border-gray-200 divide-x divide-gray-200'>
        {statsData.map(({ value, label, Icon }) => (
          <div key={label} className='px-4 py-8 sm:py-10 text-center'>
            <Icon className='w-6 h-6 mx-auto mb-3 text-gray-700' strokeWidth={1.5} />
            <p className='text-3xl sm:text-4xl font-bold tracking-tight'>{formatNumber(value)}</p>
            <p className='mt-2 text-xs sm:text-sm uppercase tracking-widest text-gray-500'>{label}</p>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className='mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10'>
        {trustData.map(({ Icon, title, desc }) => (
          <div key={title} className='flex items-start gap-4'>
            <div className='w-11 h-11 border border-gray-200 flex items-center justify-center flex-shrink-0'>
              <Icon className='w-5 h-5 text-black' strokeWidth={1.5} />
            </div>
            <div>
              <p className='font-semibold text-sm sm:text-base mb-1'>{title}</p>
              <p className='text-xs sm:text-sm text-gray-600 leading-relaxed'>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
