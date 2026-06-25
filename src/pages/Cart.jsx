import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight mb-2'>SHOPPING <span className='font-light italic'>CART</span></h1>
        <p className='text-sm text-gray-600'>{cartData.length} {cartData.length === 1 ? 'item' : 'items'}</p>
      </div>

      {cartData.length === 0 ? (
        <div className='text-center py-20'>
          <svg className='w-24 h-24 mx-auto mb-6 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
          </svg>
          <h3 className='text-2xl font-semibold mb-2'>Your cart is empty</h3>
          <p className='text-gray-600 mb-6'>Add some products to get started</p>
          <button onClick={() => navigate('/collection')} className='bg-locoxo-orange text-white px-8 py-3 font-semibold hover:bg-locoxo-orange-dark transition-colors'>
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Cart Items */}
          <div className='flex-1'>
            <div className='space-y-4'>
              {
                cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  return (
                    <div key={index} className='flex gap-4 p-4 border border-gray-200 hover:border-gray-300 transition-colors'>
                      <img className='w-24 h-24 object-cover bg-gray-100' src={productData.image[0]} alt="" />
                      <div className='flex-1'>
                        <h3 className='font-semibold mb-2'>{productData.name}</h3>
                        <div className='flex items-center gap-4 text-sm mb-3'>
                          <p className='font-bold text-lg'>{currency}{productData.price}</p>
                          <span className='px-3 py-1 bg-gray-100 text-xs font-medium'>Size: {item.size}</span>
                        </div>
                        <div className='flex items-center gap-4'>
                          <div className='flex items-center border border-gray-300'>
                            <button 
                              onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                              className='px-3 py-1 hover:bg-gray-100 transition-colors'
                            >
                              -
                            </button>
                            <input 
                              onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                              className='w-12 text-center border-x border-gray-300 py-1 focus:outline-none' 
                              type="number" 
                              min={1} 
                              value={item.quantity} 
                            />
                            <button 
                              onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                              className='px-3 py-1 hover:bg-gray-100 transition-colors'
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => updateQuantity(item._id, item.size, 0)} 
                            className='text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-sm'
                          >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:w-96'>
            <div className='border border-gray-200 p-6 sticky top-24'>
              <h3 className='text-xl font-bold mb-6'>ORDER SUMMARY</h3>
              <CartTotal />
              <button 
                onClick={() => navigate('/place-order')} 
                className='w-full bg-locoxo-orange text-white py-4 font-semibold tracking-wide hover:bg-locoxo-orange-dark transition-colors mt-6'
              >
                PROCEED TO CHECKOUT
              </button>
              <button 
                onClick={() => navigate('/collection')} 
                className='w-full border-2 border-black text-black py-4 font-semibold tracking-wide hover:bg-black hover:text-white transition-colors mt-3'
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
