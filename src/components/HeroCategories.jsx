import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// Full-height HERO driven by a merchandising section (contentType categories,
// layout 'hero'). Categories are grouped into slides using heroSlides, e.g.
// [3,1,2] → slide 1 shows 3 categories, slide 2 shows 1, slide 3 shows 2.
const HeroCategories = ({ section }) => {
  const cats = (section?.categories || []).filter(Boolean)
  const slides = useMemo(() => {
    const counts = (section?.heroSlides || []).filter((n) => n > 0)
    const out = []
    let i = 0
    for (const n of (counts.length ? counts : [cats.length || 1])) { out.push(cats.slice(i, i + n)); i += n }
    if (i < cats.length) out.push(cats.slice(i))            // leftover → extra slide
    return out.filter((s) => s.length)
  }, [cats, section?.heroSlides])

  const [cur, setCur] = useState(0)
  useEffect(() => {
    if (slides.length > 1) { const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 4500); return () => clearInterval(t) }
  }, [slides.length])

  if (!slides.length) return null

  return (
    <div className='relative w-full h-[88vh] overflow-hidden bg-black'>
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 flex transition-opacity duration-700 ${i === cur ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {slide.map((cat, j) => (
            <Link key={j} to={cat.url || '/collection'} className='relative flex-1 group overflow-hidden'>
              <img src={cat.image || 'https://placehold.co/800x1000?text=' + encodeURIComponent(cat.name || '')} alt={cat.name} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' />
              <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors' />
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
                <h2 className='text-white text-3xl md:text-5xl font-heading font-extrabold tracking-tight drop-shadow'>{cat.name}</h2>
                <span className='mt-4 inline-block bg-white text-black px-6 py-2 text-xs md:text-sm font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity'>Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
      {slides.length > 1 && (
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)} className={`h-2 rounded-full transition-all ${i === cur ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HeroCategories
