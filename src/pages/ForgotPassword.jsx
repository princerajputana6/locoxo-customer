import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'

const ForgotPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext)

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!isValidEmail(email)) return toast.error('Please enter a valid email address')

    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/forgot-password', { email })
      if (data.success) {
        setSent(true)
        // In dev (no SMTP configured) the backend returns the reset link so the flow is testable.
        if (data.devLink) {
          console.log('Password reset link (dev):', data.devLink)
          toast.info('Dev mode — reset link logged to console')
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 border-2 border-gray-300 focus:border-locoxo-blue outline-none transition-colors'

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-heading font-extrabold tracking-tight mb-2 text-locoxo-header'>RESET PASSWORD</h1>
          <p className='text-gray-600'>Enter your email and we'll send you a reset link</p>
        </div>

        {sent ? (
          <div className='text-center space-y-6'>
            <div className='flex justify-center'>
              <CheckCircle2 size={56} className='text-green-500' />
            </div>
            <div className='p-4 bg-green-50 border border-green-200 text-sm text-gray-700'>
              If an account exists for <span className='font-semibold'>{email}</span>, a password reset link is on its way.
              The link expires in 1 hour.
            </div>
            <p className='text-sm text-gray-500'>Didn't get it? Check your spam folder or{' '}
              <button onClick={() => setSent(false)} className='text-locoxo-blue font-semibold hover:underline'>try again</button>.
            </p>
            <button onClick={() => navigate('/login')}
              className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors'>
              BACK TO SIGN IN
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold mb-2'>EMAIL ADDRESS</label>
              <div className='relative'>
                <Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email'
                  className={inputCls + ' pl-11'} placeholder='you@example.com' required autoFocus />
              </div>
            </div>

            <button type='submit' disabled={loading}
              className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors disabled:opacity-60'>
              {loading ? 'SENDING…' : 'SEND RESET LINK'}
            </button>

            <button type='button' onClick={() => navigate('/login')}
              className='w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-locoxo-blue transition-colors'>
              <ArrowLeft size={16} /> Back to sign in
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
