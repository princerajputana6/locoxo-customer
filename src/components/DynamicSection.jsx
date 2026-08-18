import React from 'react'
import { Link } from 'react-router-dom'
import Title from './Title'
import ProductItem from './ProductItem'

// Renders ONE merchandising section from /api/merchandising/public.
// Everything is data-driven: the admin decides the section name, its products
// (including combos), an optional banner/video and a CTA link. Nothing static.
const DynamicSection = ({ section }) => {
  if (!section) return null
  const products = Array.isArray(section.products) ? section.products.filter(Boolean) : []
  const banner = (section.bannerImages || []).find(Boolean)
  const hasMedia = banner || section.video

  // Split the section name into two words so the shared <Title> can style them.
  const words = (section.name || '').trim().split(' ')
  const text2 = words.length > 1 ? words.pop() : ''
  const text1 = words.join(' ') || section.name

  // A collection with a banner but no products → a single clickable hero strip.
  if (section.type === 'collection' && !products.length && hasMedia) {
    return (
      <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10'>
        <Link to={section.link || '/collection'} className='block group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all'>
          {section.video
            ? <video src={section.video} autoPlay muted loop playsInline className='w-full h-auto object-cover' />
            : <img src={banner} alt={section.name} className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105' />}
        </Link>
      </div>
    )
  }

  if (!products.length && !hasMedia) return null

  return (
    <div className='my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Optional section banner */}
      {hasMedia && (
        <Link to={section.link || '#'} className='block mb-6 group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all'>
          {section.video
            ? <video src={section.video} autoPlay muted loop playsInline className='w-full h-auto object-cover' />
            : <img src={banner} alt={section.name} className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105' />}
        </Link>
      )}

      {products.length > 0 && (
        <>
          <div className='text-center text-3xl py-8'>
            <Title text1={text1} text2={text2} />
            {section.collectionTag && <p className='mt-2 text-xs sm:text-sm text-gray-500 uppercase tracking-widest'>{section.collectionTag}</p>}
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {products.slice(0, 10).map((p) => (
              <ProductItem key={p._id} id={p._id} name={p.name} image={p.image} price={p.discountPrice || p.price} />
            ))}
          </div>
          {section.link && (
            <div className='text-center mt-8'>
              <Link to={section.link} className='inline-block border border-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition-colors'>VIEW ALL</Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DynamicSection
