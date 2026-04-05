import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const InfluencerSection = () => {
  const { backendUrl, navigate } = useContext(ShopContext)
  const [influencers, setInfluencers] = useState([])

  const fetchInfluencers = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/influencer/active/all')
      if (response.data.success) {
        setInfluencers(response.data.influencers)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchInfluencers()
  }, [])

  const handleInfluencerClick = async (influencer) => {
    try {
      // Track click
      await axios.post(backendUrl + '/api/influencer/track-click', { 
        referralCode: influencer.referralCode 
      })
      
      // Store referral code in localStorage for order placement
      localStorage.setItem('referralCode', influencer.referralCode)
      
      // Navigate to product page
      navigate(`/product/${influencer.productId._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  if (influencers.length === 0) {
    return null
  }

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
                <div 
                    key={item._id} 
                    onClick={() => handleInfluencerClick(item)}
                    className='relative group cursor-pointer overflow-hidden rounded-lg'
                >
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className='w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100'>
                        <p className='text-white font-bold'>{item.instagramHandle || item.name}</p>
                        <p className='text-gray-200 text-sm mt-1'>Shop {item.productId?.name}</p>
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
