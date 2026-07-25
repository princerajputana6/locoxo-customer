import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

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
            <h2 className='text-2xl font-bold tracking-wide'>LOCOXO — WEAR YOUR EDGE</h2>
            <p className='text-gray-600 leading-relaxed'>
              Locoxo is for the new generation — bold fits, clean fabric, fresh designs, and a vibe that stands out wherever
              you go. We are a fashion brand created for people who want to wear something that feels confident, original,
              and meaningful.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Locoxo stands for Live, Own, Create, Outfit, X-factor, Original. That meaning reflects our belief in
              individuality, self-expression, and fashion that speaks for itself.
            </p>
            <div className='mt-2'>
              <div className='bg-locoxo-bg p-6 border border-gray-200 rounded-lg max-w-sm'>
                <h4 className='font-bold text-sm tracking-widest mb-3 text-locoxo-header'>WHAT LOCOXO STANDS FOR</h4>
                <ul className='text-gray-600 text-sm space-y-1'>
                  <li><span className='font-semibold text-locoxo-blue'>L</span> – Live</li>
                  <li><span className='font-semibold text-locoxo-blue'>O</span> – Own</li>
                  <li><span className='font-semibold text-locoxo-blue'>C</span> – Create</li>
                  <li><span className='font-semibold text-locoxo-blue'>O</span> – Outfit</li>
                  <li><span className='font-semibold text-locoxo-blue'>X</span> – X-factor</li>
                  <li><span className='font-semibold text-locoxo-blue'>O</span> – Original</li>
                </ul>
              </div>
            </div>
            <p className='text-gray-500 text-sm italic mt-1'>
              Wear your attitude. Show your strength. You are Locoxo.
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
            Locoxo started with one shared idea brought together by Akshay Kakkar, Anamika Agarwal, and Vinit Chelani. Three
            different people joined with one vision: to create a premium streetwear brand that is affordable, made in India,
            and designed for people who want fresh fashion without compromise.
          </p>
          <p className='text-gray-600 leading-relaxed'>
            We wanted to build a brand that connects with emotion — one that makes you feel confident, attractive, and
            powerful when you wear it. Our goal was simple: create new designs, use different fabrics and patterns, and offer
            clothing that feels unique every time you see it on the page or wear it in real life.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className='mb-16'>
        <div className='mb-8'>
          <Title text1={'MISSION &'} text2={'VISION'} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='border-2 border-gray-200 p-8'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>OUR MISSION</h3>
            <ul className='text-gray-600 leading-relaxed text-sm space-y-1 list-disc list-inside'>
              <li>New designs.</li>
              <li>Premium quality at affordable prices.</li>
              <li>Good-quality fabrics and raw materials.</li>
              <li>Fashion that creates impact in society.</li>
              <li>Clothing that tells a story with every collection.</li>
            </ul>
          </div>
          <div className='border-2 border-gray-200 p-8'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>OUR VISION</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              To grow Locoxo into a made-in-India fashion brand that can compete with worldwide fashion labels while staying
              true to originality, quality, and affordability.
            </p>
          </div>
        </div>
      </div>

      {/* What Makes Locoxo Different */}
      <div className='mb-16'>
        <div className='mb-8'>
          <Title text1={'WHAT MAKES US'} text2={'DIFFERENT'} />
        </div>
        <p className='text-gray-600 leading-relaxed mb-8 max-w-3xl'>
          What makes Locoxo special is that we have our own designing team and manufacturing unit. This allows us to create
          fresh designs, new fabrics, and updated patterns more often.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>ORIGINAL DESIGN</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              Original design concepts and premium-quality clothing at an affordable price. We create fresh styles, new
              patterns, and updated fabric choices regularly through our own designing team.
            </p>
          </div>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>MADE IN INDIA</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              Made-in-India production and local manufacturing, with responsible growth. We support sustainability because we
              believe a growing fashion brand should be both modern and responsible.
            </p>
          </div>
          <div className='border-2 border-gray-200 p-8 hover:border-black transition-colors'>
            <h3 className='text-lg font-bold mb-4 tracking-wide'>QUALITY & TRUST</h3>
            <p className='text-gray-600 leading-relaxed text-sm'>
              We care about quality, quantity, pricing, and customer service. That is why we maintain quality checks and
              support easy exchange and easy return policies, so every customer can shop with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* What We Sell */}
      <div className='mb-16'>
        <div className='mb-8'>
          <Title text1={'WHAT WE'} text2={'SELL'} />
        </div>
        <p className='text-gray-600 leading-relaxed max-w-3xl'>
          We offer readymade clothing for all. Our collections are designed for men, women, and anyone who enjoys modern
          fashion with a bold, stylish, and streetwear-inspired edge. We match fast fashion trends while keeping originality,
          fast delivery, and fast problem-solving service.
        </p>
      </div>

      {/* Vision Banner */}
      <div className='bg-locoxo-orange text-white p-12 mb-16 text-center'>
        <h2 className='text-2xl font-bold tracking-widest mb-6'>SHOP WITH CONFIDENCE</h2>
        <p className='text-white font-semibold text-lg mt-2'>
          At Locoxo, we don't just make clothing — we create a style that speaks for the new generation.
        </p>
        <p className='text-gray-300 mt-6 tracking-wide'>
          Follow us on Instagram: <span className='font-semibold text-white'>@locoxo.in</span>
        </p>
      </div>
    </div>
  )
}

export default About
