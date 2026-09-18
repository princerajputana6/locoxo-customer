import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { CheckCircle, Truck, MapPin, Package, ArrowRight } from 'lucide-react'
import Loader from '../components/Loader'

// Shown right after an order is placed (COD) or paid (Cashfree). Confirms the
// order, states the 5–7 day delivery window, and offers tracking.
const OrderConfirmation = () => {
  const { orderId } = useParams()
  const { backendUrl, token, currency, navigate } = useContext(ShopContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        if (!token) { setLoading(false); return }
        const { data } = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
        if (data.success) setOrder(data.orders.find((o) => o._id === orderId) || null)
      } catch (e) { console.log(e) } finally { setLoading(false) }
    }
    load()
  }, [token, orderId])

  if (loading) return <Loader label='Loading your order…' />

  if (!order) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-2xl font-bold mb-2'>Order not found</h1>
        <p className='text-gray-600 mb-6'>We couldn’t load this order.</p>
        <button onClick={() => navigate('/orders')} className='bg-locoxo-orange text-white px-8 py-3 font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'>View My Orders</button>
      </div>
    )
  }

  const a = order.address || {}
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='max-w-3xl mx-auto'>
        {/* Success header */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4'>
            <CheckCircle className='w-9 h-9 text-green-600' />
          </div>
          <h1 className='text-3xl font-bold tracking-tight mb-1'>Your order is confirmed!</h1>
          <p className='text-gray-600'>Thank you for shopping with us. A confirmation has been recorded for your order.</p>
          <p className='text-sm font-semibold mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full'>
            <Truck className='w-4 h-4' /> We usually deliver within 5–7 business days
          </p>
        </div>

        {/* Order meta */}
        <div className='bg-gray-50 p-6 mb-6'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div>
              <p className='text-[11px] uppercase tracking-widest text-gray-500 mb-1'>Order Number</p>
              <p className='font-semibold'>{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
            </div>
            <div>
              <p className='text-[11px] uppercase tracking-widest text-gray-500 mb-1'>Order Date</p>
              <p className='font-semibold'>{new Date(order.date).toDateString()}</p>
            </div>
            <div>
              <p className='text-[11px] uppercase tracking-widest text-gray-500 mb-1'>Total Paid</p>
              <p className='font-semibold'>{currency}{order.amount}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className='bg-white border border-gray-200 p-6 mb-6'>
          <h2 className='text-lg font-bold mb-4 flex items-center gap-2'><Package className='w-5 h-5' /> Order Details</h2>
          <div className='space-y-4'>
            {order.items.map((it, i) => (
              <div key={i} className='flex gap-4 pb-4 border-b last:border-0 last:pb-0'>
                <img src={it.image} alt={it.name} className='w-16 h-16 object-cover bg-gray-100' />
                <div className='flex-1'>
                  <p className='font-semibold'>{it.name}</p>
                  <p className='text-sm text-gray-600'>{it.size ? `Size: ${it.size} · ` : ''}Qty: {it.quantity}</p>
                </div>
                <p className='font-semibold'>{currency}{it.price}</p>
              </div>
            ))}
          </div>
          <div className='mt-4 pt-4 border-t flex justify-between text-sm'>
            <span className='text-gray-600'>Payment Method</span>
            <span className='font-semibold'>{order.paymentMethod}{order.payment ? ' · Paid' : ''}</span>
          </div>
        </div>

        {/* Delivery address */}
        <div className='bg-white border border-gray-200 p-6 mb-8'>
          <h2 className='text-lg font-bold mb-3 flex items-center gap-2'><MapPin className='w-5 h-5' /> Delivery Address</h2>
          <div className='text-gray-700 text-sm'>
            <p className='font-semibold'>{a.name}</p>
            <p>{a.addressLine1}</p>
            {a.addressLine2 && <p>{a.addressLine2}</p>}
            <p>{a.city}, {a.state} - {a.pincode}</p>
            <p>{a.country}</p>
            {a.phone && <p className='mt-1'>Phone: {a.phone}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3'>
          <button onClick={() => navigate('/track-order/' + order._id)} className='flex-1 inline-flex items-center justify-center gap-2 bg-locoxo-orange text-white px-6 py-3.5 font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark transition-colors'>
            <Truck className='w-4 h-4' /> Track Order
          </button>
          <button onClick={() => navigate('/collection')} className='flex-1 inline-flex items-center justify-center gap-2 border-2 border-black text-black px-6 py-3.5 font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-colors'>
            Continue Shopping <ArrowRight className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
