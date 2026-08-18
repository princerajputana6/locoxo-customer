import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import DynamicSection from '../components/DynamicSection'
import CountdownTimer from '../components/CountdownTimer'

// The storefront home is fully data-driven:
//   • Hero        → homepage_slider banners (falls back to the category hero)
//   • Sections    → /api/merchandising/public (products, combos, collections)
//   • Promo strips→ remaining banners, interleaved, with live countdowns
// Nothing here is hardcoded — the admin controls every section from the panel.
const Home = () => {
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [banners, setBanners] = useState([])
  const [sections, setSections] = useState([])
  const [heroIdx, setHeroIdx] = useState(0)

  useEffect(() => {
    axios.get(`${backendUrl}/api/banner/list`)
      .then((r) => { if (r.data.success) setBanners(r.data.banners.filter((b) => b.isActive)) })
      .catch(() => {})
    axios.get(`${backendUrl}/api/merchandising/public`)
      .then((r) => { if (r.data.success) setSections(r.data.sections || []) })
      .catch(() => {})
  }, [])

  const heroBanners = banners.filter((b) => b.bannerType === 'homepage_slider').sort((a, b) => a.displayOrder - b.displayOrder)
  // Everything else becomes a promo strip interleaved between sections.
  const promoBanners = banners.filter((b) => b.bannerType !== 'homepage_slider').sort((a, b) => a.displayOrder - b.displayOrder)

  useEffect(() => {
    if (heroBanners.length > 1) {
      const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroBanners.length), 4500)
      return () => clearInterval(t)
    }
  }, [heroBanners.length])

  const isLive = (b) => b.endDate && new Date(b.endDate).getTime() > Date.now()
  const goBanner = (b) => { const to = b.buttonLink || b.link; if (to) navigate(to) }

  const OfferBanner = ({ b }) => (
    <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10'>
      <div onClick={() => goBanner(b)} className={`relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all ${(b.buttonLink || b.link) ? 'cursor-pointer' : ''}`}>
        {b.video
          ? <video src={b.video} autoPlay muted loop playsInline className='w-full h-auto object-cover' />
          : <img src={b.image} alt={b.title} className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105' />}
        {(b.title || b.subtitle || isLive(b)) && (
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-start justify-end p-6 text-white'>
            {b.title && <h3 className='text-2xl md:text-3xl font-bold mb-1'>{b.title}</h3>}
            {b.subtitle && <p className='text-sm mb-3 text-white/90'>{b.subtitle}</p>}
            {isLive(b) && <CountdownTimer endDate={b.endDate} className='mb-3' />}
            {(b.buttonLink || b.link) && <span className='inline-block bg-white text-black px-6 py-2 text-sm font-semibold tracking-wide'>{b.buttonText || 'Shop Now'}</span>}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div>
      {/* Hero — banner slider if the admin uploaded slider banners, else category hero */}
      {heroBanners.length > 0 ? (
        <div className='relative w-full h-[90vh] overflow-hidden bg-locoxo-blue'>
          {heroBanners.map((b, i) => (
            <div key={b._id} onClick={() => goBanner(b)} className={`absolute inset-0 transition-opacity duration-700 ${i === heroIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${(b.buttonLink || b.link) ? 'cursor-pointer' : ''}`}>
              {b.video
                ? <video src={b.video} autoPlay muted loop playsInline className='w-full h-full object-cover' />
                : <img src={b.image} alt={b.title} className='w-full h-full object-cover' />}
              <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-6 text-white'>
                {b.title && <h2 className='text-4xl md:text-6xl font-heading font-extrabold mb-3 tracking-tight'>{b.title}</h2>}
                {b.subtitle && <p className='text-base md:text-lg text-white/90 mb-4 tracking-wide'>{b.subtitle}</p>}
                {isLive(b) && <CountdownTimer endDate={b.endDate} className='mb-4' />}
                {(b.buttonLink || b.link) && <span className='inline-block bg-white text-black px-8 py-3 text-sm font-semibold tracking-wide'>{b.buttonText || 'Shop Now'}</span>}
              </div>
            </div>
          ))}
          {heroBanners.length > 1 && (
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
              {heroBanners.map((_, i) => (
                <button key={i} onClick={() => setHeroIdx(i)} className={`h-2 rounded-full transition-all ${i === heroIdx ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Hero />
      )}

      {/* Dynamic merchandising sections, with promo banners interleaved */}
      {sections.map((s, i) => (
        <React.Fragment key={s._id || i}>
          <DynamicSection section={s} />
          {promoBanners[i] && <OfferBanner b={promoBanners[i]} />}
        </React.Fragment>
      ))}

      {/* Any promo banners left over after the sections run out */}
      {promoBanners.slice(sections.length).map((b) => <OfferBanner key={b._id} b={b} />)}

      {/* Friendly empty state until the admin publishes sections */}
      {sections.length === 0 && promoBanners.length === 0 && heroBanners.length === 0 && (
        <div className='py-24 text-center text-gray-500'>
          <p className='text-lg font-medium'>New collections dropping soon.</p>
          <button onClick={() => navigate('/collection')} className='mt-4 inline-block border border-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors'>SHOP ALL</button>
        </div>
      )}

      <OurPolicy />
    </div>
  )
}

export default Home
