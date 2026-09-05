import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Title from './Title'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'

// Show the mobile image on small screens and the desktop image on larger ones.
const ResponsiveImg = ({ desktop, mobile, alt, className }) => (
  <picture>
    {mobile && <source media='(max-width: 640px)' srcSet={mobile} />}
    <img src={desktop || mobile} alt={alt} className={className} />
  </picture>
)

// Live column count from the admin-configured card placement (desktop/tablet/mobile).
const useCols = (section) => {
  const pick = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280
    if (w < 640) return Number(section.cardsMobile) || 2
    if (w < 1024) return Number(section.cardsTablet) || 3
    return Number(section.cardsDesktop) || 4
  }
  const [cols, setCols] = useState(pick)
  useEffect(() => {
    const on = () => setCols(pick())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [section.cardsMobile, section.cardsTablet, section.cardsDesktop])
  return Math.max(1, cols)
}

// Renders ONE merchandising section from /api/merchandising/public.
// contentType: products | categories | combo · layout: grid | slider · with
// admin-configured cards-per-row (responsive). Nothing hardcoded.
const DynamicSection = ({ section }) => {
  const { currency, navigate, addToCart } = useContext(ShopContext)
  const cols = useCols(section)
  if (!section) return null

  const type = section.contentType || 'products'
  const products = (section.products || []).filter(Boolean)
  const categories = (section.categories || []).filter(Boolean)
  const combos = (section.combos || []).filter(Boolean)
  const banner = (section.bannerImages || []).find(Boolean)
  const bannerMobile = section.bannerMobile
  const hasMedia = banner || bannerMobile || section.video
  const slider = section.layout === 'slider'

  const words = (section.name || '').trim().split(' ')
  const text2 = words.length > 1 ? words.pop() : ''
  const text1 = words.join(' ') || section.name

  // "View all" destination. A Best Sellers section filters the collection to
  // bestsellers even if the admin left a generic /collection link.
  const isBestSeller = /best\s*sell/i.test(section.name || '')
  const viewAllLink = isBestSeller
    ? '/collection?bestseller=true'
    : (section.link || null)

  const count = type === 'categories' ? categories.length : type === 'combo' ? combos.length : products.length
  if (!count && !hasMedia) return null

  // Grid uses N equal columns; slider lays cards out in a horizontal scroller
  // showing exactly N per viewport.
  const gridStyle = { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }
  const itemStyle = slider ? { flex: `0 0 calc(${100 / cols}% - ${((cols - 1) * 16) / cols}px)` } : undefined
  const Wrapper = ({ children }) => slider
    ? <div className='flex gap-4 overflow-x-auto pb-3 snap-x scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>{children}</div>
    : <div className='grid gap-4 gap-y-6' style={gridStyle}>{children}</div>

  const CategoryCard = ({ c }) => {
    const showName = c.showName !== false
    const showButton = c.showButton !== false
    return (
      <Link to={c.url || '/collection'} style={itemStyle} className={`group block ${slider ? 'snap-start' : ''}`}>
        <div className='relative overflow-hidden rounded-xl bg-gray-100 aspect-square'>
          <ResponsiveImg desktop={c.image || 'https://placehold.co/600x600?text=' + encodeURIComponent(c.name || '')} mobile={c.imageMobile} alt={c.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
          {(showName || showButton) && <div className='absolute inset-0 bg-gradient-to-t from-black/55 to-transparent' />}
          <div className='absolute inset-x-0 bottom-3 flex flex-col items-center gap-2'>
            {showName && <span className='text-center text-white font-semibold tracking-wide text-sm md:text-base'>{c.name}</span>}
            {showButton && <span className='inline-block bg-white text-black px-4 py-1.5 text-xs font-semibold tracking-wide'>{c.buttonText || 'Shop Now'}</span>}
          </div>
        </div>
      </Link>
    )
  }

  const ComboCard = ({ c }) => {
    const items = (c.products || []).filter(Boolean)
    const imgs = items.map((p) => (Array.isArray(p.image) ? p.image[0] : p.image)).filter(Boolean)
    const cover = c.image || imgs[0] || 'https://placehold.co/600x800?text=Combo'
    const firstId = items[0]?._id
    const sizeOf = (p) => (p.variants && p.variants[0]?.size) || (p.sizes && p.sizes[0]) || 'Free'
    const addCombo = () => {
      if (!items.length) return
      items.forEach((p) => addToCart(p._id, sizeOf(p)))
      toast.success(`${c.name} added to cart (${items.length} items)`)
    }
    return (
      <div style={itemStyle} className={`group block ${slider ? 'snap-start' : ''}`}>
        <Link to={firstId ? `/product/${firstId}` : '#'} className='block relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]'>
          <img src={cover} alt={c.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
          <span className='absolute top-3 left-3 bg-black text-white text-[11px] font-bold px-2 py-1 rounded'>COMBO</span>
          {imgs.length > 1 && (
            <div className='absolute bottom-2 left-2 flex gap-1'>
              {imgs.slice(0, 4).map((s, i) => <img key={i} src={s} alt='' className='w-8 h-8 rounded object-cover border-2 border-white' />)}
            </div>
          )}
        </Link>
        <h3 className='mt-3 text-sm font-medium text-gray-900 line-clamp-2'>{c.name}</h3>
        <div className='flex items-center gap-2'>
          {c.price != null && <p className='text-base font-bold text-black'>{currency}{c.price}</p>}
          {c.mrp ? <p className='text-xs text-gray-400 line-through'>{currency}{c.mrp}</p> : null}
          <span className='text-[11px] text-gray-500'>· {items.length} items</span>
        </div>
        {/* Shop the combo — its products, each linking to its own page */}
        {items.length > 0 && (
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {items.map((p) => (
              <Link key={p._id} to={`/product/${p._id}`} className='text-[11px] px-2 py-0.5 rounded-full border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors'>{p.name?.slice(0, 18)}</Link>
            ))}
          </div>
        )}
        <button onClick={addCombo} className='mt-3 w-full bg-black text-white text-sm font-semibold py-2.5 rounded hover:bg-gray-800 transition-colors'>Add Combo to Cart</button>
      </div>
    )
  }

  // A collection banner with no cards → a single clickable hero strip.
  if (type === 'products' && section.type === 'collection' && !products.length && hasMedia) {
    return (
      <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10'>
        <Link to={section.link || '/collection'} className='block group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all'>
          {section.video ? <video src={section.video} autoPlay muted loop playsInline className='w-full h-auto object-cover' />
            : <ResponsiveImg desktop={banner} mobile={bannerMobile} alt={section.name} className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105' />}
        </Link>
      </div>
    )
  }

  return (
    <div className='my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {hasMedia && (
        <Link to={section.link || '#'} className='block mb-6 group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all'>
          {section.video ? <video src={section.video} autoPlay muted loop playsInline className='w-full h-auto object-cover' />
            : <ResponsiveImg desktop={banner} mobile={bannerMobile} alt={section.name} className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105' />}
        </Link>
      )}

      {count > 0 && (
        <>
          <div className='text-center text-3xl py-8'>
            <Title text1={text1} text2={text2} />
            {section.collectionTag && <p className='mt-2 text-xs sm:text-sm text-gray-500 uppercase tracking-widest'>{section.collectionTag}</p>}
          </div>
          <Wrapper>
            {type === 'categories' && categories.map((c, i) => <CategoryCard key={i} c={c} />)}
            {type === 'combo' && combos.map((c, i) => <ComboCard key={i} c={c} />)}
            {type === 'products' && products.map((p) => (
              <div key={p._id} style={itemStyle} className={slider ? 'snap-start' : ''}>
                <ProductItem id={p._id} name={p.name} image={p.image} price={p.discountPrice || p.price} />
              </div>
            ))}
          </Wrapper>
          {type === 'products' && (viewAllLink) && (
            <div className='text-center mt-8'>
              <Link to={viewAllLink} className='inline-block border border-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition-colors'>VIEW ALL</Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DynamicSection
