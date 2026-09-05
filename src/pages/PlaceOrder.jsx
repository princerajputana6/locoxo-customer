import React, { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import AddressForm from '../components/AddressForm'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Home, Briefcase, MapPin, Plus, Check } from 'lucide-react'

const typeIcon = (t) => (t === 'work' ? Briefcase : t === 'other' ? MapPin : Home)

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const [showLoginMessage, setShowLoginMessage] = useState(false)
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

    const [user, setUser] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [showAddressModal, setShowAddressModal] = useState(false)

    // Email is always editable (user may want to send to a different one), prefilled from profile
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (!token) return
        const load = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
                if (data.success) {
                    setUser(data.user)
                    setEmail(data.user.email || '')
                    setAddresses(data.user.addresses || [])
                    const def = data.user.addresses?.find(a => a.isDefault) || data.user.addresses?.[0]
                    if (def) setSelectedAddressId(def._id)
                }
            } catch (err) { console.error(err) }
        }
        load()
    }, [token])

    // Keep an address selected at all times: single address → that one; several → the default, else the first.
    useEffect(() => {
        if (!addresses.length) return
        if (!addresses.find(a => a._id === selectedAddressId)) {
            const def = addresses.find(a => a.isDefault) || addresses[0]
            if (def) setSelectedAddressId(def._id)
        }
    }, [addresses])

    const selectedAddress = addresses.find(a => a._id === selectedAddressId)

    const saveNewAddress = async (addr) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/address', addr, { headers: { token } })
            if (data.success) {
                toast.success('Address saved')
                setAddresses(data.addresses)
                const newest = data.addresses[data.addresses.length - 1]
                if (newest) setSelectedAddressId(newest._id)
                setShowAddressModal(false)
            } else toast.error(data.message)
        } catch { toast.error('Failed to save address') }
    }

    const onSubmitHandler = async (event) => {
        if (event) event.preventDefault()
        if (!token) {
            setShowLoginMessage(true)
            setTimeout(() => setShowLoginMessage(false), 5000)
            return
        }
        if (!selectedAddress) {
            toast.error('Please add or select a delivery address')
            return
        }

        try {
            const orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(p => p._id === items))
                        if (itemInfo) {
                            orderItems.push({
                                productId: itemInfo._id,
                                name: itemInfo.name,
                                image: Array.isArray(itemInfo.image) ? itemInfo.image[0] : itemInfo.image,
                                price: itemInfo.price,
                                quantity: cartItems[items][item],
                                size: item
                            })
                        }
                    }
                }
            }

            const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000)
            const subtotal = getCartAmount()
            const referralCode = localStorage.getItem('referralCode')
            let appliedCoupon = null
            try { appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon') || 'null') } catch { appliedCoupon = null }
            const shipping = subtotal >= 999 ? 0 : delivery_fee               // free delivery over ₹999
            const discount = appliedCoupon?.discount || 0                     // backend re-validates authoritatively

            const orderData = {
                orderNumber,
                items: orderItems,
                subtotal,
                shippingCharge: shipping,
                couponCode: appliedCoupon?.code,
                amount: Math.max(0, subtotal - discount) + shipping,
                email,
                address: {
                    name: selectedAddress.name || user?.name,
                    phone: selectedAddress.phone || user?.phone,
                    addressLine1: selectedAddress.street,
                    addressLine2: [selectedAddress.addressLine2, selectedAddress.landmark].filter(Boolean).join(' · '),
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    pincode: selectedAddress.zipCode,
                    country: selectedAddress.country
                }
            }
            if (referralCode) orderData.referralCode = referralCode

            if (method === 'cod') {
                const { data } = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                if (data.success) {
                    setCartItems({})
                    localStorage.removeItem('referralCode')
                    localStorage.removeItem('appliedCoupon')
                    navigate('/orders')
                } else toast.error(data.message)
            } else {
                const { data } = await axios.post(backendUrl + '/api/order/cashfree', orderData, { headers: { token } })
                if (data.success) {
                    if (!window.Cashfree) { toast.error('Cashfree SDK failed to load'); return }
                    const cashfree = window.Cashfree({ mode: data.mode })
                    cashfree.checkout({ paymentSessionId: data.paymentSessionId, redirectTarget: '_self' })
                } else toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    if (!token) {
        return (
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-20 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Sign in to continue</h1>
                <p className='text-gray-600 mb-6'>You need an account to place an order.</p>
                <button onClick={() => navigate('/login')} className='bg-locoxo-orange text-white px-8 py-3 font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'>
                    Go to Login
                </button>
            </div>
        )
    }

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold tracking-tight mb-2'>CHECKOUT</h1>
                <p className='text-sm text-gray-600'>Complete your order</p>
            </div>

            {/* Not a <form>: the delivery-address block contains its own AddressForm,
                and nested <form> elements are invalid (the browser drops the inner one,
                so "Use This Address" would submit this checkout form instead of saving). */}
            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Left */}
                <div className='flex-1 space-y-8'>
                    {/* Account summary */}
                    {user && (
                        <section className='border border-gray-200 p-5 sm:p-6'>
                            <div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
                                <h2 className='text-sm font-bold uppercase tracking-wide'>Your Details</h2>
                                <button type='button' onClick={() => navigate('/profile')} className='text-xs font-semibold uppercase tracking-wide hover:underline'>
                                    Edit in profile
                                </button>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                                <div>
                                    <p className='text-[10px] uppercase tracking-widest text-gray-500 mb-1'>Name</p>
                                    <p className='font-medium'>{user.name}</p>
                                </div>
                                <div>
                                    <p className='text-[10px] uppercase tracking-widest text-gray-500 mb-1'>Phone</p>
                                    <p className='font-medium'>{user.phone || '—'}</p>
                                </div>
                                <div>
                                    <p className='text-[10px] uppercase tracking-widest text-gray-500 mb-1'>Email</p>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='email'
                                        required
                                        className='w-full font-medium bg-transparent border-b border-gray-300 focus:border-black outline-none pb-0.5'
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Delivery address */}
                    <section>
                        <div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
                            <h2 className='text-xl font-bold uppercase tracking-tight'>Delivery Address</h2>
                            {addresses.length > 0 && (
                                <button
                                    type='button'
                                    onClick={() => setShowAddressModal(true)}
                                    className='inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide hover:underline'
                                >
                                    <Plus className='w-4 h-4' /> Add new address
                                </button>
                            )}
                        </div>

                        {addresses.length === 0 ? (
                            <div className='text-center py-10 border border-dashed border-gray-200'>
                                <MapPin className='w-10 h-10 mx-auto mb-3 text-gray-300' strokeWidth={1.5} />
                                <p className='font-semibold text-sm'>No saved addresses</p>
                                <p className='text-xs text-gray-500 mt-1'>Add a delivery address to continue</p>
                                <button
                                    type='button'
                                    onClick={() => setShowAddressModal(true)}
                                    className='mt-4 inline-flex items-center gap-2 bg-locoxo-orange text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark transition-colors'
                                >
                                    <Plus className='w-4 h-4' /> Add Address
                                </button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {addresses.map((a) => {
                                    const Icon = typeIcon(a.type)
                                    const active = a._id === selectedAddressId
                                    return (
                                        <button
                                            type='button'
                                            key={a._id}
                                            onClick={() => setSelectedAddressId(a._id)}
                                            className={`text-left border p-5 transition-colors relative ${active ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                                        >
                                            {active && (
                                                <div className='absolute top-3 right-3 w-5 h-5 rounded-full bg-locoxo-orange text-white flex items-center justify-center'>
                                                    <Check className='w-3 h-3' strokeWidth={3} />
                                                </div>
                                            )}
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Icon className='w-4 h-4' strokeWidth={1.5} />
                                                <span className='text-[10px] uppercase tracking-widest font-semibold'>{a.type || 'home'}</span>
                                                {a.isDefault && <span className='text-[10px] uppercase tracking-widest font-semibold text-gray-500'>· Default</span>}
                                            </div>
                                            <p className='text-sm font-semibold'>{a.name}</p>
                                            <p className='text-xs text-gray-500 mb-2'>{a.phone}</p>
                                            <p className='text-sm text-gray-700'>{a.street}</p>
                                            {a.addressLine2 && <p className='text-sm text-gray-700'>{a.addressLine2}</p>}
                                            <p className='text-sm text-gray-700'>{a.city}, {a.state} {a.zipCode}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </section>
                </div>

                {/* Right */}
                <div className='lg:w-96'>
                    <div className='border border-gray-200 p-6 sticky top-24'>
                        <h2 className='text-xl font-bold mb-6 uppercase tracking-tight'>Order Summary</h2>
                        <CartTotal />

                        <div className='mt-8'>
                            <h3 className='text-sm font-bold mb-4 uppercase tracking-wide'>Payment Method</h3>

                            {showLoginMessage && (
                                <div className='mb-4 p-4 bg-red-50 border border-red-200'>
                                    <p className='text-sm text-red-800 font-medium'>Please log in to place an order</p>
                                    <button onClick={() => navigate('/login')} className='mt-2 text-sm text-red-600 underline hover:text-red-800'>
                                        Go to Login
                                    </button>
                                </div>
                            )}

                            <div className='space-y-3'>
                                {[
                                    { id: 'cod', label: 'CASH ON DELIVERY' },
                                    { id: 'cashfree', label: 'PAY ONLINE — CASHFREE' },
                                ].map(({ id: m, label }) => (
                                    <label
                                        key={m}
                                        onClick={() => setMethod(m)}
                                        className={`flex items-center gap-3 border-2 p-4 cursor-pointer transition-colors ${method === m ? 'border-locoxo-blue bg-locoxo-bg' : 'border-gray-300 hover:border-gray-400'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m ? 'border-locoxo-blue' : 'border-gray-300'}`}>
                                            {method === m && <div className='w-3 h-3 rounded-full bg-locoxo-blue'></div>}
                                        </div>
                                        <span className='text-sm font-medium'>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type='button' onClick={onSubmitHandler} disabled={!selectedAddress} className='w-full bg-locoxo-orange text-white py-4 font-semibold tracking-wide hover:bg-locoxo-orange-dark transition-colors mt-6 disabled:bg-gray-300 disabled:cursor-not-allowed'>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>

            {/* Add-address modal — opens over the checkout; saving closes it and the new
                card appears (selected) in the list above. */}
            {showAddressModal && (
                <div className='fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto' onClick={() => setShowAddressModal(false)}>
                    <div className='fixed inset-0 bg-black/60' />
                    <div className='relative bg-white w-full max-w-2xl my-8 rounded-lg shadow-xl' onClick={(e) => e.stopPropagation()}>
                        <div className='flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-200'>
                            <h3 className='text-lg font-bold uppercase tracking-tight'>Add Delivery Address</h3>
                            <button type='button' onClick={() => setShowAddressModal(false)} aria-label='Close' className='text-2xl leading-none text-gray-400 hover:text-black'>&times;</button>
                        </div>
                        <div className='px-5 sm:px-6 py-5 max-h-[75vh] overflow-y-auto'>
                            <AddressForm
                                initial={{ name: user?.name, phone: user?.phone }}
                                onSubmit={saveNewAddress}
                                onCancel={() => setShowAddressModal(false)}
                                submitLabel='Save Address'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlaceOrder
