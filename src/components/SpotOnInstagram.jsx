import React from 'react'

const SpotOnInstagram = () => {
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
      likes: '2.5K',
      username: '@locoxo_official'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80',
      likes: '3.2K',
      username: '@locoxo_official'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
      likes: '4.1K',
      username: '@locoxo_official'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80',
      likes: '2.8K',
      username: '@locoxo_official'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500&q=80',
      likes: '3.5K',
      username: '@locoxo_official'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
      likes: '2.9K',
      username: '@locoxo_official'
    }
  ];

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-white'>
      <div className='max-w-[1920px] mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3'>Spot On Instagram</h2>
          <p className='text-gray-600 text-sm sm:text-base mb-4'>
            Tag us <a href='https://instagram.com/locoxo_official' target='_blank' rel='noopener noreferrer' className='text-black font-semibold hover:underline'>@locoxo_official</a> for a chance to be featured
          </p>
          <a 
            href='https://instagram.com/locoxo_official' 
            target='_blank' 
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
            </svg>
            Follow Us
          </a>
        </div>

        {/* Instagram Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4'>
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href='https://instagram.com/locoxo_official'
              target='_blank'
              rel='noopener noreferrer'
              className='group relative aspect-square overflow-hidden rounded-lg cursor-pointer'
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              {/* Overlay on hover */}
              <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <div className='text-white text-center'>
                  <svg className='w-8 h-8 mx-auto mb-2' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/>
                  </svg>
                  <p className='font-semibold'>{post.likes}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpotOnInstagram
