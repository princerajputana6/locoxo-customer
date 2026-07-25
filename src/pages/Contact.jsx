import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-12'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='flex flex-col lg:flex-row gap-12 mb-16'>
        <img className='w-full lg:w-1/2 object-cover' src={assets.contact_img} alt='Contact Locoxo' />
        <div className='flex flex-col justify-center gap-8 lg:w-1/2'>
          <div>
            <h2 className='text-2xl font-bold mb-3 tracking-wide'>GET IN TOUCH</h2>
            <p className='text-gray-600 leading-relaxed'>
              We're here to help. If you have questions about your order, product details, exchange, return, payment issues,
              or anything else, please reach out to us using the details below.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='border-l-4 border-black pl-5'>
              <h3 className='text-sm font-bold tracking-widest mb-2'>CUSTOMER SUPPORT</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a><br />
                Phone / WhatsApp: <a href='https://wa.me/918824589682' className='underline hover:text-black'>+91 8824589682</a><br />
                Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST<br />
                Languages: English &amp; Hindi
              </p>
              <p className='text-gray-400 text-xs mt-2'>We usually respond as quickly as possible during support hours.</p>
            </div>

            <div className='border-l-4 border-black pl-5'>
              <h3 className='text-sm font-bold tracking-widest mb-2'>OUR ADDRESS</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                LOCOXO APPARELS<br />
                2400/67, Friends Colony, Street No. 2<br />
                Near Rohit Trading Company, Badi Haibowal<br />
                Ludhiana, Punjab – 141001, India<br />
                Region: India only
              </p>
            </div>

            <div className='border-l-4 border-black pl-5'>
              <h3 className='text-sm font-bold tracking-widest mb-2'>WHAT YOU CAN CONTACT US ABOUT</h3>
              <ul className='text-gray-600 text-sm space-y-1 list-disc list-inside'>
                <li>Order status and tracking</li>
                <li>Return, refund, and exchange support</li>
                <li>Product size or fit questions</li>
                <li>Damaged or wrong item issues</li>
                <li>Account, login, or OTP verification support</li>
                <li>General brand or website inquiries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Support note */}
      <div className='bg-gray-50 border border-gray-200 p-6 mb-16 max-w-4xl'>
        <h3 className='font-semibold text-gray-800 mb-2'>Before You Contact Us</h3>
        <p className='text-gray-600 text-sm leading-relaxed'>
          For faster support, please include your full name, registered email address, phone number, order ID (if applicable),
          and a clear message about your concern. We aim to respond within 24–48 hours during working days, and sooner for
          urgent order-related issues.
        </p>
      </div>

      {/* Helpful links */}
      <div className='mb-8'>
        <div className='mb-8'>
          <Title text1={'HELPFUL'} text2={'LINKS'} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl'>
          <Link to='/faq' className='border-2 border-gray-200 p-6 hover:border-black transition-colors text-center'>
            <h3 className='font-bold tracking-wide mb-2'>FAQ</h3>
            <p className='text-gray-500 text-sm'>Answers to common questions about orders, delivery, and returns.</p>
          </Link>
          <Link to='/return-policy' className='border-2 border-gray-200 p-6 hover:border-black transition-colors text-center'>
            <h3 className='font-bold tracking-wide mb-2'>RETURN & REFUND</h3>
            <p className='text-gray-500 text-sm'>Our return, refund, exchange, and delivery policy.</p>
          </Link>
          <Link to='/about' className='border-2 border-gray-200 p-6 hover:border-black transition-colors text-center'>
            <h3 className='font-bold tracking-wide mb-2'>ABOUT US</h3>
            <p className='text-gray-500 text-sm'>Learn the story and vision behind Locoxo.</p>
          </Link>
        </div>
        <p className='text-gray-500 text-sm mt-8'>
          Follow us on Instagram: <span className='font-semibold text-gray-700'>@locoxo.in</span>
        </p>
      </div>
    </div>
  )
}

export default Contact
