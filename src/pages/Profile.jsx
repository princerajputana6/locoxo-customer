import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchUserData()
  }, [token])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/profile', {
        headers: { token }
      })
      if (response.data.success) {
        setUserData(response.data.user)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load profile')
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        backendUrl + '/api/user/profile',
        userData,
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Profile updated successfully')
        setIsEditing(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update profile')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setUserData(prev => ({ ...prev, [name]: value }))
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-6 sm:p-8'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl sm:text-3xl font-bold'>My Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate}>
            <div className='space-y-6'>
              {/* Personal Information */}
              <div>
                <h2 className='text-lg font-semibold mb-4'>Personal Information</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={userData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={userData.email}
                      disabled
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={userData.phone || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h2 className='text-lg font-semibold mb-4'>Address</h2>
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Street Address
                    </label>
                    <input
                      type='text'
                      name='address.street'
                      value={userData.address?.street || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                    />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        City
                      </label>
                      <input
                        type='text'
                        name='address.city'
                        value={userData.address?.city || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        State
                      </label>
                      <input
                        type='text'
                        name='address.state'
                        value={userData.address?.state || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        ZIP Code
                      </label>
                      <input
                        type='text'
                        name='address.zipCode'
                        value={userData.address?.zipCode || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Country
                      </label>
                      <input
                        type='text'
                        name='address.country'
                        value={userData.address?.country || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className='flex gap-4 pt-4'>
                  <button
                    type='submit'
                    className='flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold'
                  >
                    Save Changes
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setIsEditing(false)
                      fetchUserData()
                    }}
                    className='flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
