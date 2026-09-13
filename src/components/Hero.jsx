import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

// Optimize Cloudinary images on the fly (smaller + auto format/quality) so the
// hero paints fast. Non-cloudinary URLs are returned unchanged.
const optimize = (url) => {
  if (!url || typeof url !== 'string') return url
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/w_900,q_auto,f_auto,c_fill/')
  }
  return url
}

const Hero = () => {
  const navigate = useNavigate()
  const { categories } = useContext(ShopContext)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([]) // built only from real category data

  useEffect(() => {
    const all = categories || []
    // Only top-level categories the admin marked for the menu, in display order.
    const roots = all.filter((c) => !c.parentCategory && c.displayInMenu !== false)
    // Real-data fallback: if a root has no image, use its first sub-category's image.
    const childImage = (root) => (all.find((c) => String(c.parentCategory) === String(root._id) && c.image)?.image) || ''
    if (roots.length > 0) {
      const built = []
      for (let i = 0; i < roots.length; i += 3) {
        built.push(roots.slice(i, i + 3).map(cat => ({
          title: cat.name.toUpperCase(),
          subtitle: cat.description || `Shop ${cat.name} Collection`,
          image: optimize(cat.image || childImage(cat)),   // actual image only — no stock placeholder
          category: cat.name,
        })))
      }
      setSlides(built); setCurrentSlide(0)
    } else {
      setSlides([])
    }
  }, [categories])

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 4000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  const go = (category) => navigate(`/collection?category=${category}`)

  // Nothing to show until real categories load — no dummy placeholder.
  if (slides.length === 0) return null

  return (
    <div className='relative w-full h-[90vh] bg-locoxo-blue overflow-hidden'>
      <div className='flex transition-transform duration-700 ease-in-out h-full' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className='min-w-full h-full flex flex-col md:flex-row'>
            {slide.map((category, catIndex) => (
              <div key={catIndex} onClick={() => go(category.category)}
                className='flex-1 relative overflow-hidden cursor-pointer group w-full h-1/3 md:h-full md:w-auto'>
                <div className='absolute inset-0 bg-gradient-to-br from-locoxo-blue to-black'>
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.title}
                      loading={slideIndex === 0 ? 'eager' : 'lazy'}
                      fetchpriority={slideIndex === 0 ? 'high' : 'auto'}
                      decoding='async'
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                  )}
                  <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300'></div>
                </div>
                <div className='relative h-full flex flex-col justify-center items-center text-center px-6'>
                  <h2 className='text-white text-3xl md:text-5xl font-heading font-extrabold mb-3 tracking-tight'>{category.title}</h2>
                  <p className='text-white/90 text-sm md:text-base tracking-wider'>{category.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2'>
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />
          ))}
        </div>
      )}

      {slides.length > 1 && (
        <>
          <button onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-sm transition-colors'>
            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' /></svg>
          </button>
          <button onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-sm transition-colors'>
            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
          </button>
        </>
      )}
    </div>
  )
}

export default Hero
