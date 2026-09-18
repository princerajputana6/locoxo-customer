import React from 'react'

// Full-viewport branded loader used as the Suspense fallback for route changes
// and anywhere a page is still fetching its data.
const Loader = ({ label = 'Loading…', full = true }) => (
  <div className={`${full ? 'min-h-[60vh]' : 'py-16'} flex items-center justify-center`}>
    <div className='text-center'>
      <div className='w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4' />
      <p className='text-gray-600 text-sm'>{label}</p>
    </div>
  </div>
)

export default Loader
