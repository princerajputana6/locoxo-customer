import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  let coupon = null;
  try { coupon = JSON.parse(localStorage.getItem('appliedCoupon') || 'null') } catch { coupon = null }
  const discount = coupon?.discount || 0;
  const shipping = subtotal >= 999 ? 0 : (subtotal > 0 ? delivery_fee : 0);
  const total = Math.max(0, subtotal - discount) + shipping;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {subtotal.toLocaleString('en-IN')}</p>
        </div>
        {discount > 0 && (
          <div className='flex justify-between text-green-700'>
            <p>Coupon ({coupon.code})</p>
            <p>- {currency} {discount.toLocaleString('en-IN')}</p>
          </div>
        )}
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{shipping === 0 ? <span className='text-green-700 font-medium'>FREE</span> : `${currency} ${shipping}`}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {total.toLocaleString('en-IN')}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
