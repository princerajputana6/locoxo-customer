import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import ProductItem from './ProductItem'

const YourFavorites = () => {
  const { products, categories } = useContext(ShopContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('anime');
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const tabs = [
    { id: 'anime', label: 'Anime', icon: '🎌' },
    { id: 'superhero', label: 'Super Heroes', icon: '🦸' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' }
  ];

  useEffect(() => {
    if (products && products.length > 0) {
      // Filter products based on active tab
      let filtered = [];
      
      switch(activeTab) {
        case 'anime':
          filtered = products.filter(p => 
            p.category?.toLowerCase().includes('anime') || 
            p.subCategory?.toLowerCase().includes('anime') ||
            p.name?.toLowerCase().includes('anime')
          );
          break;
        case 'superhero':
          filtered = products.filter(p => 
            p.category?.toLowerCase().includes('super') || 
            p.category?.toLowerCase().includes('hero') ||
            p.subCategory?.toLowerCase().includes('super') ||
            p.subCategory?.toLowerCase().includes('hero') ||
            p.name?.toLowerCase().includes('marvel') ||
            p.name?.toLowerCase().includes('dc')
          );
          break;
        case 'movies':
          filtered = products.filter(p => 
            p.subCategory?.toLowerCase().includes('movie') ||
            p.name?.toLowerCase().includes('movie')
          );
          break;
        case 'gaming':
          filtered = products.filter(p => 
            p.subCategory?.toLowerCase().includes('gaming') ||
            p.subCategory?.toLowerCase().includes('game') ||
            p.name?.toLowerCase().includes('game')
          );
          break;
        default:
          filtered = products;
      }

      // If no specific products found, show random products
      if (filtered.length === 0) {
        filtered = products.slice(0, 8);
      } else {
        filtered = filtered.slice(0, 8);
      }

      setFavoriteProducts(filtered);
    }
  }, [products, activeTab]);

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-white'>
      <div className='max-w-[1920px] mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3'>Your Favorites</h2>
          <p className='text-gray-600 text-sm sm:text-base'>Shop by your favorite themes & characters</p>
        </div>

        {/* Tabs */}
        <div className='flex justify-center mb-10 overflow-x-auto scrollbar-hide'>
          <div className='inline-flex bg-gray-100 rounded-full p-1 gap-1'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-locoxo-orange text-white shadow-lg'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <span className='mr-2'>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className='min-h-[400px]'>
          {favoriteProducts.length > 0 ? (
            <>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                {favoriteProducts.map((item, index) => (
                  <div
                    key={index}
                    className='transform transition-all duration-300 hover:scale-105'
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className='text-center mt-10'>
                <button
                  onClick={() => navigate(`/collection?theme=${activeTab}`)}
                  className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105'
                >
                  Explore All {tabs.find(t => t.id === activeTab)?.label}
                </button>
              </div>
            </>
          ) : (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>😔</div>
              <p className='text-gray-500 text-lg'>No products found in this category</p>
              <button
                onClick={() => navigate('/collection')}
                className='mt-6 bg-locoxo-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-locoxo-orange-dark transition-colors'
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>

        {/* Featured Categories Banner */}
        <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {tabs.map((tab, index) => {
            // Get category image from categories context
            const category = categories.find(cat => 
              cat.name.toLowerCase().includes(tab.id) || 
              tab.id.includes(cat.name.toLowerCase())
            );
            
            // Default images for each tab if no category image found
            const defaultImages = {
              anime: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
              superhero: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&q=80',
              movies: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
              gaming: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
            };
            
            const imageUrl = category?.image || defaultImages[tab.id];
            
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  navigate(`/collection?theme=${tab.id}`);
                }}
                className='relative group cursor-pointer overflow-hidden rounded-xl h-64 sm:h-72'
              >
                {/* Background Image */}
                <img 
                  src={imageUrl} 
                  alt={tab.label}
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-colors duration-300'></div>
                
                {/* Content */}
                <div className='relative h-full flex flex-col items-center justify-end text-white p-6'>
                  <h3 className='text-2xl font-bold mb-2 transform group-hover:scale-105 transition-transform duration-300'>
                    {tab.label}
                  </h3>
                  <p className='text-sm text-white/90 mb-3'>Explore Collection</p>
                  <div className='w-12 h-1 bg-white/50 group-hover:w-20 group-hover:bg-white transition-all duration-300'></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default YourFavorites
