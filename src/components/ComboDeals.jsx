import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { Wallet, Truck, RotateCcw, Award } from 'lucide-react'
import Title from './Title'
import ProductItem from './ProductItem'

const COMBOS = [
  { id: '2-piece', label: '2 Piece',  count: 2, discount: 0.10 },
  { id: '3-piece', label: '3 Piece',  count: 3, discount: 0.15 },
  { id: '4-piece', label: '4 Piece',  count: 4, discount: 0.20 },
  { id: 'mega',    label: 'Mega Pack', count: 6, discount: 0.25 },
]

const ComboDeals = () => {
  const { products, currency } = useContext(ShopContext)
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState('2-piece')
  const [comboProducts, setComboProducts] = useState([])

  const active = COMBOS.find(c => c.id === activeId)

  useEffect(() => {
    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random())
      setComboProducts(shuffled.slice(0, active.count))
    }
  }, [products, activeId])

  const total = comboProducts.reduce((sum, p) => sum + p.price, 0)
  const savings = Math.round(total * active.discount)
  const final = Math.round(total - savings)
  const cur = currency || '₹'

  return (
    <section className='my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'COMBO'} text2={'DEALS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Curated multi-piece sets at lower per-item pricing. Pick a pack and save more as you add.
        </p>
      </div>

      {/* Tabs */}
      <div className='flex justify-center mb-10'>
        <div className='inline-flex border border-gray-200 divide-x divide-gray-200'>
          {COMBOS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`px-5 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors ${
                activeId === c.id
                  ? 'bg-locoxo-orange text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{c.label}</span>
              <span className={`ml-2 ${activeId === c.id ? 'text-white/70' : 'text-gray-400'}`}>
                {Math.round(c.discount * 100)}% off
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6 mb-10'>
        {comboProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Summary */}
      {comboProducts.length > 0 && (
        <div className='border-t border-b border-gray-200 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center'>
            <div className='grid grid-cols-3 gap-6 text-center md:text-left'>
              <div>
                <p className='text-[11px] uppercase tracking-widest text-gray-500 mb-1'>Subtotal</p>
                <p className='text-xl font-semibold text-gray-400 line-through'>{cur}{total}</p>
              </div>
              <div>
                <p className='text-[11px] uppercase tracking-widest text-gray-500 mb-1'>You Save</p>
                <p className='text-xl font-semibold'>{cur}{savings}</p>
              </div>
              <div>
                <p className='text-[11px] uppercase tracking-widest text-gray-500 mb-1'>Combo Price</p>
                <p className='text-2xl font-bold'>{cur}{final}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/collection')}
              className='w-full md:w-auto bg-locoxo-orange text-white px-10 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-locoxo-orange-dark transition-colors'
            >
              Build This Combo
            </button>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-12'>
        {[
          { Icon: Wallet,    title: 'Best Value',      desc: 'Save up to 25% on multi-piece sets' },
          { Icon: Truck,     title: 'Free Shipping',   desc: 'On every combo order across India' },
          { Icon: RotateCcw, title: 'Easy Returns',    desc: '7-day no-questions return policy' },
          { Icon: Award,     title: 'Premium Quality', desc: 'Handpicked fabrics, fits and prints' },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className='text-center sm:text-left'>
            <Icon className='w-6 h-6 mx-auto sm:mx-0 mb-3 text-black' strokeWidth={1.5} />
            <h3 className='text-sm font-semibold uppercase tracking-wide mb-1'>{title}</h3>
            <p className='text-xs sm:text-sm text-gray-600 leading-relaxed'>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ComboDeals
