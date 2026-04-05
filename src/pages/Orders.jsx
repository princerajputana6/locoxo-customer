import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token , currency, navigate} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
        <div className='mb-8'>
            <h1 className='text-3xl font-bold tracking-tight mb-2'>MY <span className='font-light italic'>ORDERS</span></h1>
            <p className='text-sm text-gray-600'>{orderData.length} {orderData.length === 1 ? 'order' : 'orders'}</p>
        </div>

        {orderData.length === 0 ? (
          <div className='text-center py-20'>
            <svg className='w-24 h-24 mx-auto mb-6 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
            </svg>
            <h3 className='text-2xl font-semibold mb-2'>No orders yet</h3>
            <p className='text-gray-600 mb-6'>Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {
              orderData.map((item,index) => (
                <div key={index} className='border border-gray-200 p-4 hover:border-gray-300 transition-colors'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <img className='w-24 h-24 object-cover bg-gray-100' src={item.image} alt="" />
                        <div className='flex-1'>
                          <h3 className='font-semibold mb-2'>{item.name}</h3>
                          <div className='flex flex-wrap gap-4 text-sm mb-3'>
                            <span className='font-bold text-lg'>{currency}{item.price}</span>
                            <span className='px-3 py-1 bg-gray-100 text-xs font-medium'>Qty: {item.quantity}</span>
                            <span className='px-3 py-1 bg-gray-100 text-xs font-medium'>Size: {item.size}</span>
                          </div>
                          <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                            <p><span className='font-semibold'>Date:</span> {new Date(item.date).toDateString()}</p>
                            <p><span className='font-semibold'>Payment:</span> {item.paymentMethod}</p>
                          </div>
                        </div>
                        <div className='flex flex-col justify-between items-start md:items-end gap-3'>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 rounded-full bg-green-500'></div>
                                <span className='text-sm font-medium'>{item.status}</span>
                            </div>
                            <button onClick={()=>navigate('/track-order/' + item.orderId)} className='bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors'>
                              TRACK ORDER
                            </button>
                        </div>
                    </div>
                </div>
              ))
            }
          </div>
        )}
    </div>
  )
}

export default Orders
