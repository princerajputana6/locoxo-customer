import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import ProductItem from '../components/ProductItem';

// Normalize a product's category to its display name (it may be a populated
// object or a plain string depending on how it was created).
const catName = (item) => (typeof item.category === 'object' ? item.category?.name : item.category) || ''

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  // Facets are derived from the live (publish-gated) product list — nothing hardcoded.
  const categoryFacets = useMemo(() => [...new Set(products.map(catName).filter(Boolean))].sort(), [products])
  const subFacets = useMemo(() => [...new Set(products.map((p) => p.subCategory).filter(Boolean))].sort(), [products])

  // Honour a ?category= link coming from the hero / sections / navbar.
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && !category.includes(categoryParam)) setCategory([categoryParam]);
  }, [searchParams])

  const toggle = (setter, val) => setter((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val])

  const applyFilter = () => {
    let copy = products.slice();
    if (showSearch && search) copy = copy.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    if (category.length) copy = copy.filter((i) => category.includes(catName(i)))
    if (subCategory.length) copy = copy.filter((i) => subCategory.includes(i.subCategory))
    if (sortType === 'low-high') copy.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
    if (sortType === 'high-low') copy.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
    setFilterProducts(copy)
  }

  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch, products, sortType])

  const Facet = ({ title, values, selected, setter }) => values.length > 0 && (
    <div className='border-b border-gray-200 pb-6'>
      <h4 className='text-sm font-bold tracking-wide mb-4'>{title}</h4>
      <div className='space-y-3'>
        {values.map((v) => (
          <label key={v} className='flex items-center gap-3 cursor-pointer group'>
            <input type='checkbox' checked={selected.includes(v)} value={v} onChange={() => toggle(setter, v)} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0' />
            <span className='text-sm group-hover:text-black transition-colors'>{v}</span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Filter Sidebar — facets built from real data */}
        <div className='lg:w-64 flex-shrink-0'>
          <div className='flex items-center justify-between mb-6 lg:mb-8'>
            <h3 className='text-xl font-bold tracking-tight'>FILTERS</h3>
            <button onClick={() => setShowFilter(!showFilter)} className='lg:hidden p-2 hover:bg-gray-100 rounded'>
              <svg className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
            </button>
          </div>
          <div className={`space-y-6 ${showFilter ? 'block' : 'hidden'} lg:block`}>
            {categoryFacets.length === 0 && subFacets.length === 0 ? (
              <p className='text-sm text-gray-400'>No filters available yet.</p>
            ) : (
              <>
                <Facet title='CATEGORIES' values={categoryFacets} selected={category} setter={setCategory} />
                <Facet title='TYPE' values={subFacets} selected={subCategory} setter={setSubCategory} />
              </>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>ALL <span className='font-light italic'>COLLECTIONS</span></h1>
              <p className='text-sm text-gray-600 mt-2'>{filterProducts.length} Products</p>
            </div>
            <div className='relative'>
              <select onChange={(e) => setSortType(e.target.value)} className='appearance-none bg-white border border-gray-300 px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:border-black cursor-pointer'>
                <option value='relavent'>Sort by: Relevant</option>
                <option value='low-high'>Price: Low to High</option>
                <option value='high-low'>Price: High to Low</option>
              </select>
              <svg className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
            </div>
          </div>

          {filterProducts.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filterProducts.map((item) => (
                <ProductItem key={item._id} name={item.name} id={item._id} price={item.discountPrice || item.price} image={item.image} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <svg className='w-16 h-16 mx-auto mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' /></svg>
              <h3 className='text-xl font-semibold mb-2'>No products found</h3>
              <p className='text-gray-600'>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
