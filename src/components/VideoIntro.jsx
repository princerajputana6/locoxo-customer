import React, { useState } from 'react'

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      ),
      text: 'Premium Quality Fabric'
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      ),
      text: '100% Authentic Products'
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      ),
      text: 'Fast & Free Shipping'
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      ),
      text: 'Easy Returns & Exchange'
    }
  ];

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='max-w-[1920px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          
          {/* Left Side - Text Content with Animation */}
          <div className='order-2 lg:order-1 space-y-6'>
            <div className='inline-block'>
              <span className='bg-locoxo-orange text-white text-xs font-bold px-3 py-1 rounded-full'>
                ABOUT LOCOXO
              </span>
            </div>
            
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
              Your Style,
              <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                Our Passion
              </span>
            </h2>
            
            <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
              At LOCOXO, we believe fashion is more than just clothing—it's a form of self-expression. 
              We curate the finest collection of trendy apparel, from anime-inspired designs to classic 
              superhero themes, ensuring you always stand out.
            </p>

            {/* Animated Features */}
            <div className='space-y-4 pt-4'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center gap-3 group animate-slide-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className='flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300'>
                    {feature.icon}
                  </div>
                  <span className='text-gray-700 font-medium text-sm sm:text-base'>
                    {feature.text}
                  </span>
                  <div className='flex-grow h-px bg-gradient-to-r from-gray-300 to-transparent'></div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-wrap gap-4 pt-6'>
              <button
                onClick={() => window.location.href = '/collection'}
                className='bg-locoxo-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-locoxo-orange-dark transition-all duration-300 hover:shadow-lg'
              >
                Shop Now
              </button>
              <button
                onClick={() => window.location.href = '/about'}
                className='border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300'
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className='order-1 lg:order-2 relative group'>
            <div className='relative aspect-[9/16] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl'>
              {/* Placeholder Video/Image */}
              <div className='absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600'>
                <img
                  src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
                  alt='LOCOXO Brand Video'
                  className='w-full h-full object-cover opacity-70'
                />
              </div>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer hover:bg-black/40 transition-colors'>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300'
                  >
                    <svg className='w-8 h-8 text-black ml-1' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z'/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Video Player (when playing) */}
              {isPlaying && (
                <iframe
                  className='absolute inset-0 w-full h-full'
                  src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                  title='LOCOXO Brand Video'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Decorative Elements */}
            <div className='absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity'></div>
            <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity'></div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default VideoIntro
