import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && !category.includes(categoryParam)) {
      setCategory([categoryParam]);
    }
  }, [searchParams])

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => {
        const itemCategory = typeof item.category === 'object' ? item.category?.name : item.category;
        return category.includes(itemCategory);
      });
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='flex flex-col lg:flex-row gap-8'>

        {/* Filter Sidebar */}
        <div className='lg:w-64 flex-shrink-0'>
          <div className='flex items-center justify-between mb-6 lg:mb-8'>
            <h3 className='text-xl font-bold tracking-tight'>FILTERS</h3>
            <button onClick={()=>setShowFilter(!showFilter)} className='lg:hidden p-2 hover:bg-gray-100 rounded'>
              <svg className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
          </div>

          <div className={`space-y-6 ${showFilter ? 'block' : 'hidden'} lg:block`}>
            {/* Category Filter */}
            <div className='border-b border-gray-200 pb-6'>
              <h4 className='text-sm font-bold tracking-wide mb-4'>CATEGORIES</h4>
              <div className='space-y-3'>
                <label className='flex items-center gap-3 cursor-pointer group'>
                  <input type="checkbox" value={'Men'} onChange={toggleCategory} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0'/>
                  <span className='text-sm group-hover:text-black transition-colors'>Men</span>
                </label>
                <label className='flex items-center gap-3 cursor-pointer group'>
                  <input type="checkbox" value={'Women'} onChange={toggleCategory} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0'/>
                  <span className='text-sm group-hover:text-black transition-colors'>Women</span>
                </label>
                <label className='flex items-center gap-3 cursor-pointer group'>
                  <input type="checkbox" value={'Kids'} onChange={toggleCategory} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0'/>
                  <span className='text-sm group-hover:text-black transition-colors'>Kids</span>
                </label>
              </div>
            </div>

            {/* Type Filter */}
            <div className='border-b border-gray-200 pb-6'>
              <h4 className='text-sm font-bold tracking-wide mb-4'>TYPE</h4>
              <div className='space-y-3'>
                <label className='flex items-center gap-3 cursor-pointer group'>
                  <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0'/>
                  <span className='text-sm group-hover:text-black transition-colors'>Topwear</span>
                </label>
                <label className='flex items-center gap-3 cursor-pointer group'>
                  <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0'/>
                  <span className='text-sm group-hover:text-black transition-colors'>Bottomwear</span>
                </label>
                <label className='flex items-center gap-3 cursor-pointer group'>
                  <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} className='w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0'/>
                  <span className='text-sm group-hover:text-black transition-colors'>Winterwear</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex-1'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>ALL <span className='font-light italic'>COLLECTIONS</span></h1>
              <p className='text-sm text-gray-600 mt-2'>{filterProducts.length} Products</p>
            </div>

            {/* Sort Dropdown */}
            <div className='relative'>
              <select
                onChange={(e)=>setSortType(e.target.value)}
                className='appearance-none bg-white border border-gray-300 px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:border-black cursor-pointer'
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <svg className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
          </div>

          {/* Products Grid */}
          {filterProducts.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {
                filterProducts.map((item,index)=>(
                  <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                ))
              }
            </div>
          ) : (
            <div className='text-center py-20'>
              <svg className='w-16 h-16 mx-auto mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
              </svg>
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
