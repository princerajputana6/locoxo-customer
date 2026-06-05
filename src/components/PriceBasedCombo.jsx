import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Title from './Title'

const combos = [
  {
    id: 1,
    title: '2 T-Shirts',
    price: 399,
    originalPrice: 798,
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80',
    description: 'Mix & match any two t-shirts',
    badge: 'Bestseller',
  },
  {
    id: 2,
    title: '3 T-Shirts',
    price: 599,
    originalPrice: 1197,
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&q=80',
    description: 'Pick any three t-shirts',
    badge: 'Popular',
  },
  {
    id: 3,
    title: 'Buy 2 Get 1',
    price: 799,
    originalPrice: 1197,
    discount: 'BUY 2 GET 1',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&q=80',
    description: 'Premium collection combo',
    badge: 'Limited',
  },
  {
    id: 4,
    title: '5 T-Shirts Pack',
    price: 999,
    originalPrice: 1995,
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=700&q=80',
    description: 'Best value pack',
    badge: 'Value',
  },
  {
    id: 5,
    title: 'Couple Combo',
    price: 699,
    originalPrice: 1398,
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=700&q=80',
    description: '1 Men + 1 Women t-shirt',
    badge: 'Trending',
  },
  {
    id: 6,
    title: 'Family Pack',
    price: 1299,
    originalPrice: 2598,
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80',
    description: '4 t-shirts for the family',
    badge: 'Value',
  },
]

const PriceBasedCombo = () => {
  const { currency } = useContext(ShopContext)
  const navigate = useNavigate()
  const cur = currency || '₹'

  return (
    <section className='my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'SHOP BY'} text2={'BUDGET'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Curated combos at honest prices. The more you pair, the more you save.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {combos.map((combo) => (
          <button
            key={combo.id}
            onClick={() => navigate('/collection')}
            className='group text-left bg-white border border-gray-200 hover:border-black transition-colors overflow-hidden'
          >
            <div className='relative aspect-[4/3] overflow-hidden bg-gray-100'>
              <img
                src={combo.image}
                alt={combo.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <span className='absolute top-3 left-3 bg-white/95 backdrop-blur text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1'>
                {combo.badge}
              </span>
              <span className='absolute top-3 right-3 bg-black text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1'>
                {combo.discount}
              </span>
            </div>

            <div className='p-5 sm:p-6'>
              <h3 className='text-lg sm:text-xl font-semibold mb-1'>{combo.title}</h3>
              <p className='text-xs sm:text-sm text-gray-600 mb-4'>{combo.description}</p>

              <div className='flex items-baseline gap-2 mb-5'>
                <span className='text-2xl font-bold'>{cur}{combo.price}</span>
                <span className='text-sm text-gray-400 line-through'>{cur}{combo.originalPrice}</span>
              </div>

              <span className='inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide border-b border-black pb-0.5 group-hover:gap-3 transition-all'>
                Shop this combo
                <ArrowRight className='w-3.5 h-3.5' />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className='mt-12 border border-gray-200 px-6 py-10 sm:px-10 sm:py-12 text-center'>
        <h3 className='text-xl sm:text-2xl font-bold mb-2'>Build your own combo</h3>
        <p className='text-sm text-gray-600 mb-6 max-w-md mx-auto'>
          Pair any styles from our collection — discounts apply automatically at checkout.
        </p>
        <button
          onClick={() => navigate('/collection')}
          className='inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors'
        >
          Browse all products
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>
    </section>
  )
}

export default PriceBasedCombo
