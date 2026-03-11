import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-12'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='flex flex-col lg:flex-row gap-12 mb-20'>
          <img className='w-full lg:w-1/2 object-cover' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 lg:w-1/2'>
              <h2 className='text-2xl font-bold'>OUR STORY</h2>
              <p className='text-gray-600 leading-relaxed'>Locoxo was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase premium fashion products from the comfort of their homes.</p>
              <p className='text-gray-600 leading-relaxed'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From contemporary streetwear to timeless classics, we offer an extensive collection sourced from trusted brands and suppliers.</p>
              <h3 className='text-xl font-bold mt-4'>OUR MISSION</h3>
              <p className='text-gray-600 leading-relaxed'>Our mission at Locoxo is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </div>

      <div className='mb-12'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4'>QUALITY ASSURANCE</h3>
            <p className='text-gray-600 leading-relaxed'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4'>CONVENIENCE</h3>
            <p className='text-gray-600 leading-relaxed'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4'>EXCEPTIONAL SERVICE</h3>
            <p className='text-gray-600 leading-relaxed'>Our team of dedicated professionals is here to assist you, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About
