import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const VerifyCashfree = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState('verifying')

    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) return
            const { data } = await axios.post(backendUrl + '/api/order/verifyCashfree', { orderId }, { headers: { token } })
            if (data.success) {
                setCartItems({})
                localStorage.removeItem('referralCode')
                setStatus('success')
                toast.success('Payment successful')
                setTimeout(() => navigate('/orders'), 1200)
            } else {
                setStatus('failed')
                toast.error(data.message || 'Payment not completed')
                setTimeout(() => navigate('/cart'), 2000)
            }
        } catch (error) {
            console.log(error)
            setStatus('failed')
            toast.error(error.message)
        }
    }

    useEffect(() => { verifyPayment() }, [token])

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
            {status === 'verifying' && (
                <>
                    <Loader2 className='w-10 h-10 animate-spin text-locoxo-blue mb-4' />
                    <h1 className='text-xl font-heading font-bold text-locoxo-header'>Verifying your payment…</h1>
                </>
            )}
            {status === 'success' && <h1 className='text-2xl font-heading font-extrabold text-green-600'>Payment Successful 🎉</h1>}
            {status === 'failed' && <h1 className='text-2xl font-heading font-extrabold text-red-600'>Payment Failed</h1>}
        </div>
    )
}

export default VerifyCashfree
