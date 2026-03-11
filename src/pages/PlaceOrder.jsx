import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold tracking-tight mb-2'>CHECKOUT</h1>
                <p className='text-sm text-gray-600'>Complete your order</p>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-8'>
                {/* ------------- Left Side - Delivery Info ---------------- */}
                <div className='flex-1'>
                    <h2 className='text-xl font-bold mb-6'>DELIVERY INFORMATION</h2>
                    
                    <div className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-semibold mb-2'>FIRST NAME</label>
                                <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="text" placeholder='John' />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold mb-2'>LAST NAME</label>
                                <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="text" placeholder='Doe' />
                            </div>
                        </div>
                        
                        <div>
                            <label className='block text-sm font-semibold mb-2'>EMAIL ADDRESS</label>
                            <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="email" placeholder='you@example.com' />
                        </div>
                        
                        <div>
                            <label className='block text-sm font-semibold mb-2'>STREET ADDRESS</label>
                            <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="text" placeholder='123 Main Street' />
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-semibold mb-2'>CITY</label>
                                <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="text" placeholder='Mumbai' />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold mb-2'>STATE</label>
                                <input onChange={onChangeHandler} name='state' value={formData.state} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="text" placeholder='Maharashtra' />
                            </div>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-semibold mb-2'>ZIP CODE</label>
                                <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="number" placeholder='400001' />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold mb-2'>COUNTRY</label>
                                <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="text" placeholder='India' />
                            </div>
                        </div>
                        
                        <div>
                            <label className='block text-sm font-semibold mb-2'>PHONE NUMBER</label>
                            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' type="number" placeholder='+91 9876543210' />
                        </div>
                    </div>
                </div>

                {/* ------------- Right Side - Order Summary ------------------ */}
                <div className='lg:w-96'>
                    <div className='border border-gray-200 p-6 sticky top-24'>
                        <h2 className='text-xl font-bold mb-6'>ORDER SUMMARY</h2>
                        <CartTotal />
                        
                        <div className='mt-8'>
                            <h3 className='text-sm font-bold mb-4'>PAYMENT METHOD</h3>
                            <div className='space-y-3'>
                                <label onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border-2 p-4 cursor-pointer transition-colors ${
                                    method === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                                }`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        method === 'stripe' ? 'border-black' : 'border-gray-300'
                                    }`}>
                                        {method === 'stripe' && <div className='w-3 h-3 rounded-full bg-black'></div>}
                                    </div>
                                    <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
                                </label>
                                
                                <label onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border-2 p-4 cursor-pointer transition-colors ${
                                    method === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                                }`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        method === 'razorpay' ? 'border-black' : 'border-gray-300'
                                    }`}>
                                        {method === 'razorpay' && <div className='w-3 h-3 rounded-full bg-black'></div>}
                                    </div>
                                    <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                                </label>
                                
                                <label onClick={() => setMethod('cod')} className={`flex items-center gap-3 border-2 p-4 cursor-pointer transition-colors ${
                                    method === 'cod' ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                                }`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        method === 'cod' ? 'border-black' : 'border-gray-300'
                                    }`}>
                                        {method === 'cod' && <div className='w-3 h-3 rounded-full bg-black'></div>}
                                    </div>
                                    <span className='text-sm font-medium'>CASH ON DELIVERY</span>
                                </label>
                            </div>
                        </div>

                        <button type='submit' className='w-full bg-black text-white py-4 font-semibold tracking-wide hover:bg-gray-800 transition-colors mt-6'>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder
