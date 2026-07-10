import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react'

const ResetPassword = () => {
  const { backendUrl, navigate, setToken } = useContext(ShopContext)

  const [token, setResetToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    if (t) setResetToken(t)
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!token) return toast.error('Invalid or missing reset link')
    if (password.length < 8) return toast.error('Password must be at least 8 characters')
    if (password !== confirm) return toast.error('Passwords do not match')

    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/reset-password', { token, password })
      if (data.success) {
        toast.success('Password updated — you are now signed in')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        navigate('/')
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
          <div className='flex justify-center mb-3'>
            <span className='grid place-items-center w-14 h-14 rounded-full bg-locoxo-blue/10 text-locoxo-blue'>
              <ShieldCheck size={28} />
            </span>
          </div>
          <h1 className='text-4xl font-heading font-extrabold tracking-tight mb-2 text-locoxo-header'>NEW PASSWORD</h1>
          <p className='text-gray-600'>Choose a strong password for your account</p>
        </div>

        {!token ? (
          <div className='text-center space-y-6'>
            <div className='p-4 bg-red-50 border border-red-200 text-sm text-gray-700'>
              This reset link is invalid or has expired. Please request a new one.
            </div>
            <button onClick={() => navigate('/forgot-password')}
              className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors'>
              REQUEST NEW LINK
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold mb-2'>NEW PASSWORD</label>
              <div className='relative'>
                <Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input onChange={(e) => setPassword(e.target.value)} value={password}
                  type={showPassword ? 'text' : 'password'} className={inputCls + ' pl-11 pr-12'}
                  placeholder='At least 8 characters' required autoFocus />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-locoxo-blue transition-colors'>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>CONFIRM PASSWORD</label>
              <div className='relative'>
                <Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input onChange={(e) => setConfirm(e.target.value)} value={confirm}
                  type={showPassword ? 'text' : 'password'} className={inputCls + ' pl-11'}
                  placeholder='Re-enter your password' required />
              </div>
              {confirm && confirm !== password && (
                <p className='text-xs text-red-500 mt-1'>Passwords do not match</p>
              )}
            </div>

            <button type='submit' disabled={loading}
              className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors disabled:opacity-60'>
              {loading ? 'UPDATING…' : 'UPDATE PASSWORD'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
