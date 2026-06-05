import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const faqs = [
  { q: 'How do I place an order?', a: 'Simply browse our collection, select your preferred product, choose the correct size and quantity, and add it to your cart. After that, proceed to checkout and complete your payment.' },
  { q: 'What payment methods do you accept?', a: 'We accept payments through secure online payment options available on our checkout page, including payments processed through Razorpay. Depending on availability, we may also support UPI, debit card, credit card, net banking, or other payment methods.' },
  { q: 'Is my payment secure?', a: 'Yes. Payments are processed through secure third-party payment systems, and we take reasonable measures to protect your transaction information. We do not intentionally store full card details on our own systems.' },
  { q: 'Do you use OTP verification?', a: 'Yes. We may use OTP, email verification, or SMS verification for account security, login, password reset, order confirmation, and related authentication purposes.' },
  { q: 'How long will delivery take?', a: 'Delivery time depends on your location and order volume. In most cases, orders are processed and shipped as quickly as possible, and delivery usually takes a few business days after dispatch.' },
  { q: 'Do you provide order tracking?', a: 'Yes. Once your order is shipped, you may receive tracking details by email or message so you can monitor the delivery status.' },
  { q: 'What is your return policy?', a: 'Returns are accepted only according to our return policy and within the allowed return period. Items must generally be unused, unworn, and returned in original condition with tags and packaging intact.' },
  { q: 'Can I exchange a product for a different size?', a: 'Yes, size exchange may be available subject to product availability and return eligibility. Please contact customer support with your order number and exchange request.' },
  { q: 'How do I request a refund?', a: 'If your return is approved, the refund will be processed according to the original payment method or as otherwise stated in our return policy. Refund timelines may vary depending on your bank or payment provider.' },
  { q: 'Can I cancel my order after placing it?', a: 'Order cancellation may be possible only before the order is packed or shipped. Once an order has been processed or dispatched, cancellation may no longer be possible.' },
  { q: 'What if I receive a damaged or wrong item?', a: 'If you receive a damaged, defective, or incorrect item, please contact us as soon as possible with your order details and photos of the item so we can assist you quickly.' },
  { q: 'How do I find the right size?', a: 'We recommend checking the size chart available on the product page before placing your order. If you need help choosing a size, our support team can assist you.' },
  { q: 'Do you offer cash on delivery?', a: 'Cash on delivery may be available on selected orders or locations, depending on our current shipping and payment setup.' },
  { q: 'Can I change my shipping address after ordering?', a: 'If your order has not yet been shipped, we may be able to update the shipping address. Please contact customer support immediately with your order number.' },
  { q: 'Do you ship across India?', a: 'Yes, we aim to serve customers across India, subject to delivery coverage by our shipping partners.' },
  { q: 'Do you offer international shipping?', a: 'International shipping may not be available at all times. Please check the shipping options at checkout or contact support for the latest availability.' },
  { q: 'Can I use a coupon code?', a: 'If you have a valid coupon or discount code, you can apply it during checkout before completing your payment.' },
  { q: 'What should I do if an item is out of stock?', a: 'If a product is out of stock, it will usually be shown as unavailable on the product page. You may contact us for restock updates or alternative options.' },
]

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null)

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
              We're here to help with your orders, product questions, returns, exchanges, payment issues, and general support.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='border-l-4 border-black pl-5'>
              <h3 className='text-sm font-bold tracking-widest mb-2'>CUSTOMER SUPPORT</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Email: <a href='mailto:email-support@locoxo.com' className='underline hover:text-black'>email-support@locoxo.com</a><br />
                Phone / WhatsApp: <a href='tel:+919876543210' className='underline hover:text-black'>+91 9876543210</a><br />
                Support Hours: Monday to Saturday, 10:00 AM – 8:00 PM
              </p>
              <p className='text-gray-400 text-xs mt-2'>We usually respond as quickly as possible during support hours.</p>
            </div>

            <div className='border-l-4 border-black pl-5'>
              <h3 className='text-sm font-bold tracking-widest mb-2'>OUR ADDRESS</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Locoxo Apparels<br />
                Building No. 2400/67, Friends Colony, Street No. 2<br />
                Near Rohit Trading Company, Badi Haibowal<br />
                Ludhiana, Punjab 141001, India
              </p>
            </div>

            <div className='border-l-4 border-black pl-5'>
              <h3 className='text-sm font-bold tracking-widest mb-2'>FOR FASTER SUPPORT, INCLUDE</h3>
              <ul className='text-gray-600 text-sm space-y-1 list-disc list-inside'>
                <li>Your full name</li>
                <li>Registered email address</li>
                <li>Phone number</li>
                <li>Order number, if applicable</li>
                <li>A clear message about your concern</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='mb-16'>
        <div className='mb-10'>
          <Title text1={'FREQUENTLY ASKED'} text2={'QUESTIONS'} />
        </div>
        <div className='divide-y divide-gray-200 border border-gray-200'>
          {faqs.map((item, i) => (
            <div key={i} className='cursor-pointer' onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors'>
                <h3 className='font-semibold text-sm pr-4'>{item.q}</h3>
                <span className='text-xl font-light flex-shrink-0'>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <div className='px-6 pb-5 bg-gray-50'>
                  <p className='text-gray-600 text-sm leading-relaxed'>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
