import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

const InfluencerSection = () => {
  const influencers = [
    {
      id: 1,
      name: "@fashionicon",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      product: "Floral Summer Dress"
    },
    {
      id: 2,
      name: "@styleguru",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      product: "Classic White Tee"
    },
    {
      id: 3,
      name: "@trendsetter",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      product: "Denim Jacket"
    },
    {
      id: 4,
      name: "@urbanwear",
      image: "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      product: "Cargo Pants"
    }
  ]

  return (
    <div className='my-16 sm:my-20 px-4 sm:px-6 lg:px-8'>
        <div className='text-center py-6 sm:py-8 text-2xl sm:text-3xl'>
            <Title text1={'SPOTTED'} text2={'ON INSTAGRAM'} />
            <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 px-4'>
                Shop the looks from your favorite creators. Tag us to be featured!
            </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
            {influencers.map((item) => (
                <div key={item.id} className='relative group cursor-pointer overflow-hidden rounded-lg'>
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className='w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100'>
                        <p className='text-white font-bold'>{item.name}</p>
                        <p className='text-gray-200 text-sm mt-1'>Shop {item.product}</p>
                        <button className='mt-3 bg-white text-black py-2 px-4 text-sm font-medium hover:bg-gray-100 transition-colors w-full'>
                            SHOP THE LOOK
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default InfluencerSection
