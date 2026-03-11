import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Category slides - each slide has 3 categories
  const slides = [
    [
      {
        title: 'LIVE IN DENIMS',
        subtitle: 'MUST HAVE DENIMS',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
        category: 'Men',
        bgColor: 'bg-blue-100'
      },
      {
        title: 'TECHNICAL WEAR',
        subtitle: 'LIGHT WEIGHT • STRETCHLESS • BREATHABLE',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
        category: 'Men',
        bgColor: 'bg-gray-100'
      },
      {
        title: 'PERFUMES',
        subtitle: 'THAT MAKE AN IMPRESSION',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        category: 'Men',
        bgColor: 'bg-black'
      }
    ],
    [
      {
        title: 'WOMEN COLLECTION',
        subtitle: 'ELEGANCE REDEFINED',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
        category: 'Women',
        bgColor: 'bg-pink-100'
      },
      {
        title: 'KIDS FASHION',
        subtitle: 'PLAYFUL & COMFORTABLE',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
        category: 'Kids',
        bgColor: 'bg-yellow-100'
      },
      {
        title: 'ACCESSORIES',
        subtitle: 'COMPLETE YOUR LOOK',
        image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=800&q=80',
        category: 'Men',
        bgColor: 'bg-gray-200'
      }
    ]
  ];

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleCategoryClick = (category) => {
    navigate(`/collection?category=${category}`);
  };

  return (
    <div className='relative w-full h-[500px] md:h-[600px] bg-white overflow-hidden'>
      {/* Slider Container */}
      <div 
        className='flex transition-transform duration-700 ease-in-out h-full'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className='min-w-full h-full flex'>
            {slide.map((category, catIndex) => (
              <div 
                key={catIndex}
                onClick={() => handleCategoryClick(category.category)}
                className='flex-1 relative overflow-hidden cursor-pointer group'
              >
                {/* Background Image */}
                <div className='absolute inset-0'>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className={`absolute inset-0 ${category.bgColor === 'bg-black' ? 'bg-black/60' : 'bg-black/30'} group-hover:bg-black/40 transition-colors duration-300`}></div>
                </div>

                {/* Content */}
                <div className='relative h-full flex flex-col justify-center items-center text-center px-6'>
                  <h2 className='text-white text-3xl md:text-5xl font-bold mb-3 tracking-tight'>
                    {category.title}
                  </h2>
                  <p className='text-white/90 text-sm md:text-base tracking-wider mb-6'>
                    {category.subtitle}
                  </p>
                  <button className='bg-white text-black px-6 py-3 font-semibold text-sm tracking-wide hover:bg-black hover:text-white transition-colors duration-300'>
                    SHOP NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-sm transition-colors'
      >
        <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-sm transition-colors'
      >
        <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </button>
    </div>
  )
}

export default Hero
