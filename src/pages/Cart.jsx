import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

// Available sizes for a product (top-level, colour-wise or variant-derived).
const sizesOf = (p) => {
  if (p?.sizes?.length) return p.sizes
  const fromColours = (p?.colours || []).flatMap((c) => c.sizes || [])
  if (fromColours.length) return [...new Set(fromColours)]
  return [...new Set((p?.variants || []).map((v) => v.size).filter(Boolean))]
}

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, getCartAmount, getCartSavings, sellingPriceOf, delivery_fee, navigate, token, backendUrl } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])
  const [pincode, setPincode] = useState('')
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState(null) // { code, discount }
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    if (products.length > 0) {
      const temp = []
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) temp.push({ _id: id, size, quantity: cartItems[id][size] })
        }
      }
      setCartData(temp)
    }
  }, [cartItems, products])

  // Restore a previously applied coupon.
  useEffect(() => {
    try { const c = JSON.parse(localStorage.getItem('appliedCoupon') || 'null'); if (c) { setCoupon(c); setCouponInput(c.code) } } catch { /* ignore */ }
  }, [])

  // Change a line's size: move its quantity from the old size key to the new one.
  // Sequential (await) so the two cart writes don't race on the backend.
  const changeSize = async (id, oldSize, newSize, qty) => {
    if (!newSize || newSize === oldSize) return
    const existing = cartItems[id]?.[newSize] || 0   // merge if the new size is already in the bag
    await updateQuantity(id, oldSize, 0)
    await updateQuantity(id, newSize, existing + qty)
  }

  const subtotal = getCartAmount()
  const savings = getCartSavings()
  const discount = coupon?.discount || 0
  const shipping = subtotal >= 999 ? 0 : (subtotal > 0 ? delivery_fee : 0)
  const total = Math.max(0, subtotal - discount) + shipping

  const applyCoupon = async () => {
    const code = couponInput.trim().toUpperCase()
    if (!code) return
    setApplying(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/coupon/validate', { code, cartAmount: subtotal, userId: undefined }, { headers: token ? { token } : {} })
      if (data.success) {
        const applied = { code, discount: Math.round(data.discount) }
        setCoupon(applied)
        localStorage.setItem('appliedCoupon', JSON.stringify(applied))
        toast.success(`Coupon ${code} applied — you save ${currency}${applied.discount}`)
      } else {
        toast.error(data.message || 'Invalid coupon')
      }
    } catch (err) { toast.error(err.response?.data?.message || 'Could not apply coupon') }
    finally { setApplying(false) }
  }

  const removeCoupon = () => { setCoupon(null); setCouponInput(''); localStorage.removeItem('appliedCoupon') }

  if (cartData.length === 0) {
    return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
        <h1 className='text-2xl font-bold mb-8'>My Bag <span className='text-gray-500 font-normal'>(0 Items)</span></h1>
        <div className='text-center py-20 border border-gray-100 rounded-xl'>
          <svg className='w-20 h-20 mx-auto mb-6 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
          </svg>
          <h3 className='text-xl font-semibold mb-2'>Your bag is empty</h3>
          <p className='text-gray-500 mb-6'>Add some products to get started</p>
          <button onClick={() => navigate('/collection')} className='bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors rounded'>CONTINUE SHOPPING</button>
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-8 bg-white'>
      <h1 className='text-2xl font-bold mb-6'>My Bag <span className='text-gray-500 font-normal'>({cartData.length} {cartData.length === 1 ? 'Item' : 'Items'})</span></h1>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left — items */}
        <div className='flex-1'>
          {savings > 0 && (
            <div className='flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-4'>
              <svg className='w-5 h-5 text-green-600' fill='currentColor' viewBox='0 0 20 20'><path d='M10 2a8 8 0 100 16 8 8 0 000-16zm3.7 6.3l-4.5 4.5a1 1 0 01-1.4 0L5.3 10.6a1 1 0 011.4-1.4l1.8 1.8 3.8-3.8a1 1 0 011.4 1.4z' /></svg>
              <span className='text-sm font-semibold text-green-800'>You are saving {currency}{savings.toLocaleString('en-IN')} on this order</span>
            </div>
          )}

          <div className='border border-gray-200 rounded-lg overflow-hidden'>
            {cartData.map((item, index) => {
              const p = products.find((x) => x._id === item._id)
              if (!p) return null
              const img = Array.isArray(p.image) ? p.image[0] : p.image
              const mrp = Number(p.price) || 0
              const selling = sellingPriceOf(p)
              const lineSaved = mrp > selling ? (mrp - selling) * item.quantity : 0
              const sizes = sizesOf(p)
              return (
                <div key={index} className='flex gap-4 p-4 border-b border-gray-100 last:border-0'>
                  <img className='w-24 h-32 object-cover bg-gray-100 rounded' src={img} alt={p.name} />
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2'>
                      <h3 className='font-semibold text-gray-900 pr-2'>{p.name}</h3>
                      <button onClick={() => updateQuantity(item._id, item.size, 0)} aria-label='Remove' className='text-gray-400 hover:text-black shrink-0'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                      </button>
                    </div>
                    <p className='text-xs text-green-700 font-medium mt-1'>Ships in 1-2 days</p>

                    <div className='flex flex-wrap items-center gap-2 mt-3'>
                      {/* Editable size */}
                      <label className='relative inline-flex items-center border border-gray-300 rounded-md text-sm'>
                        <span className='pl-3 pr-1 text-gray-500'>Size:</span>
                        <select value={item.size} onChange={(e) => changeSize(item._id, item.size, e.target.value, item.quantity)}
                          className='appearance-none bg-transparent pr-7 py-1.5 font-medium outline-none cursor-pointer'>
                          {(sizes.length ? sizes : [item.size]).map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <svg className='w-4 h-4 text-gray-500 absolute right-2 pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
                      </label>

                      {/* Editable qty */}
                      <label className='relative inline-flex items-center border border-gray-300 rounded-md text-sm'>
                        <span className='pl-3 pr-1 text-gray-500'>Qty:</span>
                        <select value={item.quantity} onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                          className='appearance-none bg-transparent pr-7 py-1.5 font-medium outline-none cursor-pointer'>
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                        <svg className='w-4 h-4 text-gray-500 absolute right-2 pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
                      </label>
                    </div>

                    <div className='flex items-baseline gap-2 mt-3'>
                      <span className='text-lg font-bold text-gray-900'>{currency}{(selling * item.quantity).toLocaleString('en-IN')}</span>
                      {mrp > selling && <span className='text-sm text-gray-400 line-through'>{currency}{(mrp * item.quantity).toLocaleString('en-IN')}</span>}
                      {lineSaved > 0 && <span className='text-sm text-green-700 font-medium'>You saved {currency}{lineSaved.toLocaleString('en-IN')}</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right — summary */}
        <div className='lg:w-96 space-y-4'>
          {/* Pincode */}
          <div className='border border-gray-200 rounded-lg p-4'>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
              <input value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder='Enter pincode for delivery estimate' className='flex-1 text-sm outline-none' />
            </div>
          </div>

          {/* Coupon */}
          <div className='border border-gray-200 rounded-lg p-4'>
            {coupon ? (
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-green-700'>{coupon.code} applied</p>
                  <p className='text-xs text-gray-500'>You save {currency}{coupon.discount}</p>
                </div>
                <button onClick={removeCoupon} className='text-sm text-red-500 font-semibold hover:underline'>Remove</button>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <input value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} placeholder='Apply coupon / gift card' className='flex-1 text-sm outline-none border border-gray-200 rounded px-3 py-2' />
                <button onClick={applyCoupon} disabled={applying} className='px-4 py-2 text-sm font-semibold rounded border border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50'>{applying ? '…' : 'Apply'}</button>
              </div>
            )}
          </div>

          {/* Price summary */}
          <div className='border border-gray-200 rounded-lg p-5'>
            <h3 className='font-bold text-lg mb-4'>Price Summary</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'><span className='text-gray-600'>Subtotal</span><span>{currency}{subtotal.toLocaleString('en-IN')}</span></div>
              {savings > 0 && <div className='flex justify-between text-green-700'><span>Product discount</span><span>-{currency}{savings.toLocaleString('en-IN')}</span></div>}
              {discount > 0 && <div className='flex justify-between text-green-700'><span>Coupon ({coupon.code})</span><span>-{currency}{discount.toLocaleString('en-IN')}</span></div>}
              <div className='flex justify-between'><span className='text-gray-600'>Shipping Fee</span><span>{shipping === 0 ? <span className='text-green-700 font-medium'>FREE</span> : `${currency}${shipping}`}</span></div>
              <div className='border-t border-gray-200 my-2' />
              <div className='flex justify-between text-base font-bold'><span>Total</span><span>{currency}{total.toLocaleString('en-IN')}</span></div>
            </div>
            {shipping === 0 && (
              <div className='mt-3 bg-green-50 text-green-800 text-sm text-center rounded py-2'>Yayy! You get <strong>FREE delivery</strong> on this order</div>
            )}
            <button onClick={() => navigate('/place-order')} className='w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3.5 font-bold tracking-wide rounded mt-4 transition-colors'>PROCEED</button>
          </div>

          {/* Trust badges */}
          <div className='flex justify-around text-center text-[11px] text-gray-500 pt-2'>
            <div><div className='w-9 h-9 mx-auto mb-1 rounded-full bg-gray-100 grid place-items-center'>✓</div>QUALITY<br/>ASSURANCE</div>
            <div><div className='w-9 h-9 mx-auto mb-1 rounded-full bg-gray-100 grid place-items-center'>🔒</div>100% SECURE<br/>PAYMENT</div>
            <div><div className='w-9 h-9 mx-auto mb-1 rounded-full bg-gray-100 grid place-items-center'>↺</div>EASY RETURNS &<br/>INSTANT REFUNDS</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
