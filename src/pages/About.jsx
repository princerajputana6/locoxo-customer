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

      {/* Brand Name Meaning */}
      <div className='mb-16'>
        <div className='flex flex-col lg:flex-row gap-12'>
          <img className='w-full lg:w-1/2 object-cover rounded-sm' src={assets.about_img} alt='About Locoxo' />
          <div className='flex flex-col justify-center gap-6 lg:w-1/2'>
            <h2 className='text-2xl font-bold tracking-wide'>WHAT IS LOCOXO?</h2>
            <p className='text-gray-600 leading-relaxed'>
              Locoxo is a premium streetwear label crafted for those who understand that style is not just worn — it is lived. Born from the shared vision of three individuals from different professional worlds, the brand represents a unified belief that true luxury lies not in price, but in identity, confidence, and expression.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              What brought them together was a single idea — to redefine streetwear by making high-end, design-driven fashion accessible without compromising on quality or character.
            </p>
            <div className='grid grid-cols-2 gap-6 mt-2'>
              <div className='bg-gray-50 p-5 border border-gray-200'>
                <h4 className='font-bold text-sm tracking-widest mb-3'>LOCOXO</h4>
                <ul className='text-gray-600 text-sm space-y-1'>
                  <li><span className='font-semibold'>L</span> – Limitless</li>
                  <li><span className='font-semibold'>O</span> – Original</li>
                  <li><span className='font-semibold'>C</span> – Creative</li>
                  <li><span className='font-semibold'>O</span> – Outstanding</li>
                  <li><span className='font-semibold'>X</span> – X-factor</li>
                  <li><span className='font-semibold'>O</span> – Optimistic</li>
                </ul>
              </div>
              <div className='bg-gray-50 p-5 border border-gray-200'>
                <h4 className='font-bold text-sm tracking-widest mb-3'>LOCOXO</h4>
                <ul className='text-gray-600 text-sm space-y-1'>
                  <li><span className='font-semibold'>L</span> – Live</li>
                  <li><span className='font-semibold'>O</span> – Original</li>
                  <li><span className='font-semibold'>C</span> – Confident</li>
                  <li><span className='font-semibold'>O</span> – Outspoken</li>
                  <li><span className='font-semibold'>X</span> – X-factor</li>
                  <li><span className='font-semibold'>O</span> – Own it</li>
                </ul>
              </div>
            </div>
            <p className='text-gray-500 text-sm italic mt-1'>
              Live original, stay confident, speak your vibe, and own who you are.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className='mb-16'>
        <div className='mb-8'>
          <Title text1={'OUR'} text2={'STORY'} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <p className='text-gray-600 leading-relaxed'>
            At Locoxo, every piece is a statement of intention. We work with carefully selected fabrics and focus on refined construction to ensure lasting comfort, durability, and color integrity over time. Our design philosophy blends contemporary street culture with a premium aesthetic, resulting in clothing that feels distinctive, elevated, and effortlessly wearable.
          </p>
          <p className='text-gray-600 leading-relaxed'>
            More than a brand, Locoxo stands for a mindset. It is created for individuals who refuse to be ordinary — who see themselves as equal, capable, and unapologetically bold. We believe everyone deserves to experience the confidence of premium fashion, to feel seen, valued, and powerful in their own skin.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className='mb-16'>
        <div className='mb-8'>
          <Title text1={'OUR'} text2={'VALUES'} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>CRAFTSMANSHIP</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              Behind every Locoxo piece is the dedication of skilled hands — artisans and workers who invest their time, effort, and pride into crafting each garment. Their commitment is not just part of our process; it is the soul of our brand.
            </p>
          </div>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>IDENTITY</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              Each garment is designed not just to enhance appearance, but to reinforce presence. We build clothing that carries meaning — for those who refuse to be ordinary, who see themselves as equal, capable, and unapologetically bold.
            </p>
          </div>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>MADE IN INDIA</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              We remain deeply rooted in our commitment to supporting Indian craftsmanship and contributing to meaningful employment, proudly aligning with the spirit of "Made in India." By creating opportunities, we aim to build not just fashion, but a community.
            </p>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className='bg-locoxo-orange text-white p-12 mb-16 text-center'>
        <h2 className='text-2xl font-bold tracking-widest mb-6'>OUR VISION</h2>
        <p className='text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4'>
          As we grow, our ambition is to establish Locoxo as a globally respected name in streetwear — a symbol of modern luxury, authenticity, and cultural relevance. At the same time, we remain deeply rooted in our commitment to supporting Indian craftsmanship and contributing to meaningful employment.
        </p>
        <p className='text-white font-semibold text-lg mt-8'>
          Locoxo is not just clothing. It is identity, confidence, and quiet power — made visible.
        </p>
        <p className='text-gray-400 mt-4 tracking-wide'>
          Wear your attitude. Show your strength. You are Locoxo.
        </p>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About
