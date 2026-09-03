import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// Premium product card — image with badges (Best Seller / rating / colour count),
// price · MRP · %OFF, optional best price, name and Add to Cart.
const ProductItem = ({ id, image, name, price, product: passedProduct }) => {
  const { currency, products, addToCart } = useContext(ShopContext)
  const product = passedProduct || products?.find((p) => p._id === id) || null

  // Fields (fall back to the legacy props when the full product isn't available).
  const p = product || {}
  const colours = (p.colours || []).filter((c) => c && (c.images?.length || c.color))
  const imgs = (colours[0]?.images?.length ? colours[0].images : (Array.isArray(p.image) ? p.image : image)) || []
  const cover = imgs[0] || (Array.isArray(image) ? image[0] : image)

  const mrp = Number(p.price) || Number(price) || 0
  const selling = p.discountPrice ? Number(p.discountPrice) : mrp
  const discount = mrp > selling ? Math.round(((mrp - selling) / mrp) * 100) : 0
  // "Best price" = extra markdown only when the product is on clearance (real data).
  const bestPrice = p.onClearance && p.clearanceDiscountPct > 0 ? Math.round(selling * (1 - p.clearanceDiscountPct / 100)) : null

  const rating = Number(p.rating) || 0
  const reviewCount = Number(p.reviewCount) || 0
  const colourCount = colours.length
  const productName = name || p.name || ''

  const sizes = p.sizes?.length ? p.sizes : (colours[0]?.sizes || (p.variants || []).map((v) => v.size).filter(Boolean))
  const addCart = (e) => {
    e.preventDefault(); e.stopPropagation()
    addToCart(id || p._id, (sizes && sizes[0]) || 'Free')
    toast.success('Added to cart')
  }

  return (
    <div className='group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow'>
      {/* Image */}
      <Link to={`/product/${id || p._id}`} onClick={() => window.scrollTo(0, 0)} className='block relative aspect-[3/4] bg-gray-100 overflow-hidden'>
        <img src={cover} alt={productName} className='w-full h-full object-cover' />

        {p.bestseller && (
          <span className='absolute top-3 left-3 bg-white text-green-700 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-md shadow-sm'>BEST SELLER</span>
        )}

        {rating > 0 && (
          <span className='absolute bottom-3 left-3 inline-flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full'>
            <svg className='w-3.5 h-3.5 text-amber-400 fill-current' viewBox='0 0 20 20'><path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' /></svg>
            {rating.toFixed(1)}{reviewCount > 0 && <span className='text-white/80 font-normal ml-0.5'>{reviewCount}</span>}
          </span>
        )}

        {colourCount > 1 && (
          <span className='absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full'>
            <span className='flex -space-x-1'>
              {colours.slice(0, 2).map((c, i) => <span key={i} className='w-3 h-3 rounded-full border border-white' style={{ background: /^#/.test(c.colorCode || '') ? c.colorCode : '#ddd' }} />)}
            </span>
            {colourCount}
          </span>
        )}
      </Link>

      {/* Details */}
      <div className='p-3'>
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='text-lg font-bold text-black'>{currency}{selling}</span>
          {discount > 0 && <span className='text-sm text-gray-400 line-through'>{currency}{mrp.toLocaleString('en-IN')}</span>}
          {discount > 0 && <span className='text-sm font-bold text-green-600'>{discount}% OFF</span>}
        </div>

        {bestPrice && (
          <div className='mt-2 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-semibold px-2.5 py-1 rounded-md'>
            <span className='grid place-items-center w-4 h-4 rounded-full bg-green-600 text-white text-[9px]'>%</span>
            Best price {currency}{bestPrice}
          </div>
        )}

        <Link to={`/product/${id || p._id}`} onClick={() => window.scrollTo(0, 0)} className='block mt-2 text-sm text-gray-500 line-clamp-1 hover:text-black transition-colors'>{productName}</Link>
      </div>

      {/* Add to cart */}
      <button onClick={addCart} className='w-full border-t border-gray-100 py-3.5 text-sm font-bold tracking-wide text-black hover:bg-black hover:text-white transition-colors'>
        ADD TO CART
      </button>
    </div>
  )
}

export default ProductItem
