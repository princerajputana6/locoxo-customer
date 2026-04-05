import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

const TrackOrder = () => {
  const { orderId } = useParams()
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        const order = response.data.orders.find(order => order._id === orderId)
        setOrderData(order)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token, orderId])

  const getStatusSteps = () => {
    const steps = [
      { name: 'Order Placed', icon: Package, status: 'Order Placed' },
      { name: 'Processing', icon: Clock, status: 'Packing' },
      { name: 'Shipped', icon: Truck, status: 'Shipped' },
      { name: 'Delivered', icon: CheckCircle, status: 'Delivered' }
    ]

    const currentStatusIndex = steps.findIndex(step => step.status === orderData?.status)
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      active: index === currentStatusIndex
    }))
  }

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center px-4'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-2'>Order Not Found</h2>
          <p className='text-gray-600'>We couldn't find this order.</p>
        </div>
      </div>
    )
  }

  const statusSteps = getStatusSteps()

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Track Your Order</h1>

        {/* Order Info */}
        <div className='bg-gray-50 p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Order Number</p>
              <p className='font-semibold'>{orderData.orderNumber || orderData._id.slice(-8).toUpperCase()}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Order Date</p>
              <p className='font-semibold'>{new Date(orderData.date).toDateString()}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Amount</p>
              <p className='font-semibold'>{currency}{orderData.amount}</p>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className='bg-white border border-gray-200 p-8 mb-8'>
          <h2 className='text-xl font-bold mb-8'>Order Status</h2>
          <div className='relative'>
            {/* Progress Line */}
            <div className='absolute top-6 left-0 right-0 h-1 bg-gray-200'>
              <div 
                className='h-full bg-green-500 transition-all duration-500'
                style={{ width: `${(statusSteps.filter(s => s.completed).length - 1) * 33.33}%` }}
              ></div>
            </div>

            {/* Steps */}
            <div className='relative grid grid-cols-4 gap-4'>
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className='flex flex-col items-center'>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <p className={`text-sm text-center font-medium ${
                      step.active ? 'text-black' : 'text-gray-600'
                    }`}>{step.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className='bg-white border border-gray-200 p-6 mb-8'>
          <h2 className='text-xl font-bold mb-6'>Order Items</h2>
          <div className='space-y-4'>
            {orderData.items.map((item, index) => (
              <div key={index} className='flex gap-4 pb-4 border-b last:border-b-0'>
                <img src={item.image} alt={item.name} className='w-20 h-20 object-cover bg-gray-100' />
                <div className='flex-1'>
                  <h3 className='font-semibold mb-1'>{item.name}</h3>
                  <div className='flex gap-4 text-sm text-gray-600'>
                    <span>Qty: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                    <span className='font-semibold text-black'>{currency}{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className='bg-white border border-gray-200 p-6'>
          <h2 className='text-xl font-bold mb-4'>Delivery Address</h2>
          <div className='text-gray-700'>
            <p className='font-semibold'>{orderData.address.name}</p>
            <p>{orderData.address.addressLine1}</p>
            {orderData.address.addressLine2 && <p>{orderData.address.addressLine2}</p>}
            <p>{orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}</p>
            <p>{orderData.address.country}</p>
            <p className='mt-2'>Phone: {orderData.address.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
