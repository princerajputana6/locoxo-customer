import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerDisplay = ({ banner }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (banner.link) {
      navigate(banner.link);
    }
  };

  return (
    <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10'>
      <div 
        className={`cursor-pointer group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${banner.link ? '' : 'cursor-default'}`}
        onClick={handleClick}
      >
        <div className='relative'>
          <img 
            src={banner.image} 
            alt={banner.title}
            className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
          />
          {(banner.title || banner.subtitle) && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end'>
              <div className='p-6 text-white'>
                {banner.title && <h3 className='text-2xl font-bold mb-2'>{banner.title}</h3>}
                {banner.subtitle && <p className='text-sm'>{banner.subtitle}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerDisplay;
