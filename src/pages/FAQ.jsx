import React, { useState } from 'react'
import Title from '../components/Title'

const faqs = [
  {
    q: 'What sizes are available?',
    a: 'We offer a range of sizes depending on the product. Size availability is shown on each product page, and we recommend checking the size chart before placing your order to choose the best fit. If you need help choosing a size, our support team is always happy to assist you.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Our usual delivery timeline is 5 to 10 days within India, depending on your location, courier availability, and operational conditions. Once your order is shipped, you will receive tracking details through email, WhatsApp, or SMS.'
  },
  {
    q: 'Do you ship only in India?',
    a: 'Yes, Locoxo currently ships only within India. We do not offer international shipping at this time.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, net banking, debit card, credit card, and cash on delivery. All available payment options will be shown during checkout.'
  },
  {
    q: 'Can I cancel my order?',
    a: 'Yes, but only under certain conditions. Orders can be cancelled within 3 hours of placing the order through the website or WhatsApp. After 3 hours, cancellation is not allowed if the order has already been processed or shipped. If your order has already been shipped, you will need to wait for delivery and then request a return as per our policy.'
  },
  {
    q: 'How do returns and exchanges work?',
    a: 'We accept return requests within 5 to 7 days from the date of delivery. The return window starts from the delivery date, not the order date. Items must be unused, unworn, and unwashed, with original tags attached and original packaging and invoice included. Exchanges are available for size only — free exchange shipping on orders ₹999 and above, customer pays exchange shipping for orders below ₹999, and free exchange on first-time orders regardless of order value. Certain items are non-returnable and non-exchangeable, such as innerwear, undergarments, customized products, and sale/combo/offer products.'
  },
  {
    q: 'What if the item is damaged or wrong?',
    a: 'If you receive a damaged, defective, or wrong item, please report it within 3 to 5 days of delivery. To help us resolve it quickly, please share photos of the product, photos of the packaging, and an unboxing video if available. Based on the case, we may provide a replacement, repair, or refund.'
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is dispatched, we will share your tracking details by email, WhatsApp, or SMS. You can use the tracking link to follow your parcel until delivery. If you face any issue while tracking, our support team can assist you.'
  },
  {
    q: 'Are product colors exactly the same as the photos?',
    a: 'We try our best to show products as accurately as possible. However, slight differences in colour, shade, texture, or print may happen because of lighting, photography, screen settings, and manufacturing variation. These small differences are normal and should not be considered a defect unless the item is damaged, incorrect, or materially different from the description.'
  },
  {
    q: 'How can I contact customer support?',
    a: 'You can contact us by email at locoxo.support@gmail.com or via WhatsApp at +91 8824589682. Our support hours are Monday–Saturday, 10:00 AM – 8:00 PM IST (English & Hindi).'
  },
  {
    q: 'Do you offer easy returns and exchange support?',
    a: 'Yes, we aim to keep the process simple and customer-friendly. We provide easy exchange support and a clear return process so you can shop with confidence.'
  },
  {
    q: 'Are your products made in India?',
    a: 'Yes, Locoxo supports made-in-India production and local manufacturing. We focus on quality fabrics, original designs, and responsible growth.'
  },
  {
    q: 'Why should I buy from Locoxo?',
    a: 'Locoxo is designed for the new generation. We focus on fresh and original designs, premium quality at affordable prices, strong fabrics and raw materials, fast delivery, easy exchange and return support, and a confident, stylish look that stands out.'
  },
  {
    q: 'Do you use your own designs and manufacturing?',
    a: 'Yes. Locoxo has its own designing team and manufacturing unit, which allows us to create fresh styles, new patterns, and updated fabric choices regularly.'
  },
]

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'FREQUENTLY ASKED'} text2={'QUESTIONS'} />
      </div>

      <div className='max-w-4xl mx-auto'>
        <p className='text-gray-600 text-sm leading-relaxed mb-10 text-center'>
          Welcome to the Locoxo FAQ page. Here you'll find answers to the most common questions about sizing, delivery,
          payments, returns, exchanges, order cancellation, and more. Our goal is to make your shopping experience smooth,
          clear, and confident.
        </p>

        <div className='divide-y divide-gray-200 border border-gray-200'>
          {faqs.map((item, i) => (
            <div key={i} className='cursor-pointer' onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors'>
                <h3 className='font-semibold text-sm pr-4'>{i + 1}. {item.q}</h3>
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

        <div className='bg-gray-50 border border-gray-200 p-6 mt-10'>
          <h3 className='font-semibold text-gray-800 mb-2'>Contact Support</h3>
          <p className='text-gray-600 text-sm leading-relaxed'>
            Still have a question? Reach out anytime.<br />
            Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a><br />
            WhatsApp: <a href='https://wa.me/918824589682' className='underline hover:text-black'>+91 8824589682</a><br />
            Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST
          </p>
        </div>
      </div>
    </div>
  )
}

export default FAQ
