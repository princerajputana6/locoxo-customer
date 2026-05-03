import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
  const navigate = useNavigate();
  const { categories } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Default images for categories
  const categoryImages = {
    'Men': 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    'Women': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    'Anime': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
    'Super Hero': 'https://images.unsplash.com/photo-1612036782180-6f0b6ce846ce?w=800&q=80'
  };

  const categoryColors = {
    'Men': 'bg-blue-100',
    'Women': 'bg-pink-100',
    'Anime': 'bg-purple-100',
    'Super Hero': 'bg-red-100'
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      // Create slides from categories (3 categories per slide)
      const categorySlides = [];
      for (let i = 0; i < categories.length; i += 3) {
        const slideCategories = categories.slice(i, i + 3).map(cat => ({
          title: cat.name.toUpperCase(),
          subtitle: cat.description || `Shop ${cat.name} Collection`,
          image: cat.image || categoryImages[cat.name] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
          category: cat.name,
          bgColor: categoryColors[cat.name] || 'bg-gray-100'
        }));
        categorySlides.push(slideCategories);
      }
      setSlides(categorySlides);
    }
  }, [categories]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const handleCategoryClick = (category) => {
    navigate(`/collection?category=${category}`);
  };

  if (slides.length === 0) {
    return (
      <div className='relative w-full h-[700px] sm:h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center'>
        <p className='text-gray-500'>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className='relative w-full h-[700px] sm:h-[500px] md:h-[600px] bg-white overflow-hidden'>
      {/* Slider Container */}
      <div 
        className='flex transition-transform duration-700 ease-in-out h-full'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className='min-w-full h-full flex flex-col md:flex-row'>
            {slide.map((category, catIndex) => (
              <div 
                key={catIndex}
                onClick={() => handleCategoryClick(category.category)}
                className='flex-1 relative overflow-hidden cursor-pointer group w-full h-1/3 md:h-full md:w-auto'
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
                  <p className='text-white/90 text-sm md:text-base tracking-wider'>
                    {category.subtitle}
                  </p>
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
