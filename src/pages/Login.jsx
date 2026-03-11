import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold tracking-tight mb-2'>{currentState === 'Login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h1>
          <p className='text-gray-600'>{currentState === 'Login' ? 'Sign in to your account' : 'Join Locoxo today'}</p>
        </div>

        <form onSubmit={onSubmitHandler} className='space-y-5'>
          {currentState === 'Sign Up' && (
            <div>
              <label className='block text-sm font-semibold mb-2'>FULL NAME</label>
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                type="text" 
                className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' 
                placeholder='John Doe' 
                required
              />
            </div>
          )}
          
          <div>
            <label className='block text-sm font-semibold mb-2'>EMAIL ADDRESS</label>
            <input 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              type="email" 
              className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' 
              placeholder='you@example.com' 
              required
            />
          </div>
          
          <div>
            <label className='block text-sm font-semibold mb-2'>PASSWORD</label>
            <input 
              onChange={(e)=>setPasword(e.target.value)} 
              value={password} 
              type="password" 
              className='w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors' 
              placeholder='••••••••' 
              required
            />
          </div>

          {currentState === 'Login' && (
            <div className='flex justify-between items-center text-sm'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" className='w-4 h-4' />
                <span>Remember me</span>
              </label>
              <a href='#' className='text-black hover:underline font-medium'>Forgot password?</a>
            </div>
          )}

          <button 
            type='submit'
            className='w-full bg-black text-white py-4 font-semibold tracking-wide hover:bg-gray-800 transition-colors'
          >
            {currentState === 'Login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
            <button 
              onClick={()=>setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
              className='text-black font-semibold hover:underline'
            >
              {currentState === 'Login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
