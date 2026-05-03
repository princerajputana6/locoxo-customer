import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const MatchTheMood = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const [seasonalCategories, setSeasonalCategories] = useState([]);

  useEffect(() => {
    // Determine current season/festival
    const month = new Date().getMonth();
    let currentMood = '';
    
    if (month >= 2 && month <= 4) {
      currentMood = 'Spring Collection';
    } else if (month >= 5 && month <= 7) {
      currentMood = 'Summer Vibes';
    } else if (month >= 8 && month <= 10) {
      currentMood = 'Festive Season';
    } else {
      currentMood = 'Winter Warmth';
    }

    // Create mood-based categories
    const moods = [
      {
        id: 1,
        title: currentMood,
        description: 'Perfect for the season',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
        filter: 'seasonal'
      },
      {
        id: 2,
        title: 'Diwali Special',
        description: 'Festive collection',
        image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&q=80',
        filter: 'festival'
      },
      {
        id: 3,
        title: 'Weekend Casual',
        description: 'Relaxed & comfortable',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
        filter: 'casual'
      },
      {
        id: 4,
        title: 'Party Ready',
        description: 'Stand out in style',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
        filter: 'party'
      }
    ];

    setSeasonalCategories(moods);
  }, []);

  const handleMoodClick = (filter) => {
    navigate(`/collection?mood=${filter}`);
  };

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-[1920px] mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3'>Match The Mood</h2>
          <p className='text-gray-600 text-sm sm:text-base'>Shop by season, festival & occasion</p>
        </div>

        {/* Mood Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          {seasonalCategories.map((mood) => (
            <div
              key={mood.id}
              onClick={() => handleMoodClick(mood.filter)}
              className='group relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300'
            >
              {/* Image */}
              <div className='aspect-[3/4] overflow-hidden'>
                <img
                  src={mood.image}
                  alt={mood.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>
              </div>

              {/* Content */}
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                <h3 className='text-xl sm:text-2xl font-bold mb-1'>{mood.title}</h3>
                <p className='text-sm text-white/90'>{mood.description}</p>
                <div className='mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <span className='text-sm font-medium'>Explore</span>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MatchTheMood
