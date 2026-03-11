import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-12'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='flex flex-col lg:flex-row gap-12 mb-20'>
        <img className='w-full lg:w-1/2 object-cover' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center gap-8 lg:w-1/2'>
          <div>
            <h2 className='text-2xl font-bold mb-4'>GET IN TOUCH</h2>
            <p className='text-gray-600'>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-bold mb-2'>OUR STORE</h3>
              <p className='text-gray-600'>Mumbai, Maharashtra<br />India</p>
            </div>
            
            <div>
              <h3 className='text-lg font-bold mb-2'>CONTACT INFO</h3>
              <p className='text-gray-600'>Tel: +91 9876543210<br />Email: support@locoxo.com</p>
            </div>
            
            <div>
              <h3 className='text-lg font-bold mb-2'>CAREERS AT LOCOXO</h3>
              <p className='text-gray-600 mb-4'>Learn more about our teams and job openings.</p>
              <button className='bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors'>EXPLORE JOBS</button>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
