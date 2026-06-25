import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const VerifySubscription = () => {
    const { navigate, token, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState('verifying')

    const orderId = searchParams.get('orderId')

    const verify = async () => {
        try {
            if (!token) return
            const { data } = await axios.post(backendUrl + '/api/subscription/verify', { orderId }, { headers: { token } })
            if (data.success) {
                setStatus('success')
                toast.success('Membership activated!')
                setTimeout(() => navigate('/membership'), 1500)
            } else {
                setStatus('failed')
                toast.error(data.message || 'Payment not completed')
                setTimeout(() => navigate('/membership'), 2500)
            }
        } catch (error) {
            setStatus('failed')
            toast.error(error.message)
        }
    }

    useEffect(() => { verify() }, [token])

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
            {status === 'verifying' && (
                <>
                    <Loader2 className='w-10 h-10 animate-spin text-locoxo-blue mb-4' />
                    <h1 className='text-xl font-heading font-bold text-locoxo-header'>Activating your membership…</h1>
                </>
            )}
            {status === 'success' && <h1 className='text-2xl font-heading font-extrabold text-green-600'>Welcome to LOCOXO Premium 👑</h1>}
            {status === 'failed' && <h1 className='text-2xl font-heading font-extrabold text-red-600'>Activation Failed</h1>}
        </div>
    )
}

export default VerifySubscription
