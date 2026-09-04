import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Phone, Mail } from 'lucide-react';
import { signInWithGoogle } from '../config/firebase';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login'); // Login | Sign Up
  const [authMode, setAuthMode] = useState('password');      // password | otp
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [dob,setDob] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  // OTP state
  const [otpSent,setOtpSent] = useState(false)
  const [otpCode,setOtpCode] = useState('')
  const [sending,setSending] = useState(false)

  // Referral
  const [referral,setReferral] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      setReferral(ref)
      localStorage.setItem('signupReferralCode', ref)
    } else {
      const saved = localStorage.getItem('signupReferralCode')
      if (saved) setReferral(saved)
    }
  }, [])

  const finishLogin = (tk) => {
    setToken(tk)
    localStorage.setItem('token', tk)
    localStorage.removeItem('signupReferralCode')
  }

  // Validation helpers
  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)
  const isValidPhone = (p) => {
    const digits = String(p).replace(/[\s\-()]/g, '').replace(/^\+?91/, '')
    return /^[6-9]\d{9}$/.test(digits) // Indian mobile: 10 digits starting 6-9
  }

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          // Client-side validation
          if (!name.trim()) return toast.error('Please enter your name')
          if (!isValidEmail(email)) return toast.error('Please enter a valid email address')
          if (!isValidPhone(phone)) return toast.error('Enter a valid 10-digit mobile number')
          if (password.length < 8) return toast.error('Password must be at least 8 characters')

          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password,phone,dob,referralCode: referral || undefined})
          if (response.data.success) finishLogin(response.data.token)
          else toast.error(response.data.message)
        } else {
          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) finishLogin(response.data.token)
          else toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  const handleSendOtp = async () => {
    if (!phone) return toast.error('Enter your phone number')
    setSending(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/otp/send', { phone })
      if (data.success) {
        setOtpSent(true)
        toast.success(data.dev ? 'Dev mode — use OTP 123456' : 'OTP sent to your phone')
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally { setSending(false) }
  }

  const handleVerifyOtp = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/user/otp/verify', {
        phone, code: otpCode, name: name || undefined, referralCode: referral || undefined
      })
      if (data.success) finishLogin(data.token)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      const response = await axios.post(backendUrl + '/api/user/google-auth', {
        email: user.email, name: user.displayName, googleId: user.uid, photoURL: user.photoURL
      });
      if (response.data.success) { finishLogin(response.data.token); toast.success('Signed in with Google!') }
      else toast.error(response.data.message);
    } catch (error) {
      console.error('Google sign-in error:', error);
      const code = error?.code || '';
      // A cancelled popup is not an error worth alarming the user about.
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
      const messages = {
        'auth/unauthorized-domain': 'This site is not authorised for Google sign-in yet. Please try again shortly.',
        'auth/popup-blocked': 'Your browser blocked the sign-in popup. Please allow popups and try again.',
        'auth/network-request-failed': 'Network error — check your connection and try again.',
        'auth/operation-not-allowed': 'Google sign-in is temporarily unavailable.',
      };
      toast.error(messages[code] || error?.message || 'Failed to sign in with Google');
    }
  }

  useEffect(()=>{ if (token) navigate('/') },[token])

  const inputCls = 'w-full px-4 py-3 border-2 border-gray-300 focus:border-locoxo-blue outline-none transition-colors'

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-heading font-extrabold tracking-tight mb-2 text-locoxo-header'>{currentState === 'Login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h1>
          <p className='text-gray-600'>{currentState === 'Login' ? 'Sign in to your account' : 'Join LOCOXO today'}</p>
        </div>

        {referral && (
          <div className='mb-5 p-3 bg-locoxo-orange/10 border border-locoxo-orange/40 text-sm text-locoxo-text text-center'>
            🎁 Referral code <span className='font-bold'>{referral}</span> applied
          </div>
        )}

        {/* Auth method tabs */}
        <div className='flex mb-6 border-2 border-gray-200 rounded-md overflow-hidden'>
          <button type='button' onClick={()=>setAuthMode('password')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${authMode==='password' ? 'bg-locoxo-blue text-white' : 'bg-white text-gray-600'}`}>
            <Mail size={16}/> Email
          </button>
          <button type='button' onClick={()=>setAuthMode('otp')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${authMode==='otp' ? 'bg-locoxo-blue text-white' : 'bg-white text-gray-600'}`}>
            <Phone size={16}/> OTP
          </button>
        </div>

        {authMode === 'otp' ? (
          <form onSubmit={handleVerifyOtp} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold mb-2'>PHONE NUMBER</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='tel' disabled={otpSent}
                className={inputCls + (otpSent ? ' bg-gray-100' : '')} placeholder='+91 9876543210' required />
            </div>

            {!otpSent ? (
              <button type='button' onClick={handleSendOtp} disabled={sending}
                className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors disabled:opacity-60'>
                {sending ? 'SENDING…' : 'SEND OTP'}
              </button>
            ) : (
              <>
                <div>
                  <label className='block text-sm font-semibold mb-2'>ENTER OTP</label>
                  <input value={otpCode} onChange={(e)=>setOtpCode(e.target.value)} type='text' inputMode='numeric'
                    className={inputCls + ' tracking-[0.5em] text-center text-lg'} placeholder='______' maxLength={6} required />
                </div>
                <button type='submit'
                  className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors'>
                  VERIFY & CONTINUE
                </button>
                <button type='button' onClick={()=>{ setOtpSent(false); setOtpCode('') }}
                  className='w-full text-sm text-gray-500 hover:text-locoxo-blue'>Change number / resend</button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={onSubmitHandler} className='space-y-5'>
            {currentState === 'Sign Up' && (
              <>
                <div>
                  <label className='block text-sm font-semibold mb-2'>FULL NAME</label>
                  <input onChange={(e)=>setName(e.target.value)} value={name} type='text' className={inputCls} placeholder='John Doe' required />
                </div>
                <div>
                  <label className='block text-sm font-semibold mb-2'>PHONE NUMBER</label>
                  <input onChange={(e)=>setPhone(e.target.value)} value={phone} type='tel' className={inputCls} placeholder='+91 9876543210' required />
                </div>
                <div>
                  <label className='block text-sm font-semibold mb-2'>DATE OF BIRTH</label>
                  <input onChange={(e)=>setDob(e.target.value)} value={dob} type='date' className={inputCls} required />
                </div>
              </>
            )}

            <div>
              <label className='block text-sm font-semibold mb-2'>EMAIL ADDRESS</label>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' className={inputCls} placeholder='you@example.com' required />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>PASSWORD</label>
              <div className='relative'>
                <input onChange={(e)=>setPasword(e.target.value)} value={password} type={showPassword ? 'text' : 'password'}
                  className={inputCls + ' pr-12'} placeholder='••••••••' required />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-locoxo-blue transition-colors'>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {currentState === 'Login' && (
              <div className='text-right -mt-2'>
                <button type='button' onClick={() => navigate('/forgot-password')}
                  className='text-sm text-locoxo-blue font-semibold hover:underline'>
                  Forgot password?
                </button>
              </div>
            )}

            <button type='submit'
              className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-4 font-semibold tracking-wide transition-colors'>
              {currentState === 'Login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>
        )}

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-gray-300'></div></div>
            <div className='relative flex justify-center text-sm'><span className='px-4 bg-white text-gray-500'>OR</span></div>
          </div>

          <button onClick={handleGoogleSignIn} type='button'
            className='mt-6 w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 py-3 px-4 font-semibold hover:bg-gray-50 transition-colors'>
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
              <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
              <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
              <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={()=>setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} className='text-locoxo-blue font-semibold hover:underline'>
              {currentState === 'Login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
