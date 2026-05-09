import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ProductItem from '../components/ProductItem';
import { toast } from 'react-toastify';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [pincode, setPincode] = useState('')
  const [deliveryInfo, setDeliveryInfo] = useState(null)
  const [activeTab, setActiveTab] = useState('product')
  const [reviewFilter, setReviewFilter] = useState('Most Helpful')
  const [frequentlyBought, setFrequentlyBought] = useState([])

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, products])

  useEffect(() => {
    if (products && products.length > 0 && productData) {
      const related = products
        .filter(p => p._id !== productData._id)
        .slice(0, 4);
      setFrequentlyBought(related);
    }
  }, [products, productData]);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryInfo({
        available: true,
        date: '5-7 business days',
        freeShipping: true
      });
    } else {
      toast.error('Please enter a valid 6-digit pincode');
    }
  };

  const originalPrice = productData ? Math.round(productData.price * 2) : 0;
  const discount = 50;

  const keyHighlights = [
    { label: 'Design', value: 'Graphic Print' },
    { label: 'Fit', value: 'Oversized Fit' },
    { label: 'Neck', value: 'Round Neck' },
    { label: 'Occasion', value: 'Casual Wear' },
    { label: 'Sleeve Style', value: 'Half Sleeve' },
    { label: 'Hemline', value: 'Straight' }
  ];

  const reviewStats = {
    average: 4.5,
    total: 552,
    distribution: [
      { stars: 5, count: 319, percentage: 58 },
      { stars: 4, count: 171, percentage: 31 },
      { stars: 3, count: 62, percentage: 11 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ]
  };

  return productData ? (
    <div className='bg-white'>
      {/* Breadcrumb */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4 text-sm text-gray-500'>
        <span className='hover:text-black cursor-pointer' onClick={() => navigate('/')}>Home</span>
        <span className='mx-2'>{'>'}</span>
        <span className='hover:text-black cursor-pointer' onClick={() => navigate('/collection')}>
          {typeof productData.category === 'object' ? productData.category?.name : productData.category}
        </span>
        <span className='mx-2'>{'>'}</span>
        <span className='text-gray-800'>{productData.name}</span>
      </div>

      {/* Main Product Section */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='flex gap-8 lg:gap-12 flex-col lg:flex-row'>

          {/* Left Side - Sticky Images */}
          <div className='lg:w-[55%]'>
            <div className='lg:sticky lg:top-24'>
              <div className='flex flex-col-reverse lg:flex-row gap-4'>
                {/* Thumbnails */}
                <div className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-3 lg:w-20'>
                  {productData.image.map((item, index) => (
                    <img 
                      onClick={() => setImage(item)} 
                      src={item} 
                      key={index} 
                      className={`w-16 h-20 lg:w-full lg:h-24 object-cover cursor-pointer rounded-lg border-2 transition-all ${
                        image === item ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                      }`} 
                      alt="" 
                    />
                  ))}
                  {/* Scroll indicator */}
                  {productData.image.length > 4 && (
                    <div className='hidden lg:flex items-center justify-center w-full h-8 bg-gray-100 rounded-lg'>
                      <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Main Image */}
                <div className='flex-1 relative'>
                  {/* Oversized Fit Badge */}
                  <div className='absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold'>
                    OVERSIZED FIT
                  </div>
                  <img className='w-full h-auto rounded-lg object-cover' src={image} alt={productData.name} />
                  {/* Navigation Arrow */}
                  <button className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className='lg:w-[45%] pb-10'>
            {/* Brand */}
            <p className='text-lg font-semibold text-gray-800 mb-1'>LOCOXO®</p>
            
            {/* Product Name */}
            <h1 className='text-xl text-gray-600 mb-4'>{productData.name}</h1>
            
            {/* Price Section */}
            <div className='flex items-center gap-3 mb-2'>
              <span className='text-2xl font-bold'>₹{productData.price}</span>
              <span className='text-lg text-gray-400 line-through'>₹{originalPrice}</span>
              <span className='text-green-600 font-semibold'>{discount}% OFF</span>
              <span className='text-xs text-gray-500'>Inclusive of all taxes</span>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-2 mb-4'>
              <div className='flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-sm'>
                <span className='font-semibold'>{reviewStats.average}</span>
                <svg className='w-3 h-3 fill-current' viewBox='0 0 20 20'>
                  <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                </svg>
              </div>
              <span className='text-gray-500 text-sm'>|</span>
              <span className='text-gray-600 text-sm'>{reviewStats.total} Ratings</span>
            </div>

            {/* TriBe Price */}
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 mb-4 inline-flex items-center gap-2'>
              <span className='text-sm'>Get it for as low as</span>
              <span className='font-bold'>₹{Math.round(productData.price * 0.9)}</span>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>

            {/* People Bought Badge */}
            <div className='bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg mb-4 inline-block'>
              <span className='font-semibold'>165 people</span> bought this in the last 7 days
            </div>

            {/* Fabric Tag */}
            <div className='mb-6'>
              <span className='text-gray-500 text-sm border border-gray-300 px-3 py-1 rounded-full'>Premium Dense Fabric</span>
            </div>

            {/* Color Selection */}
            <div className='mb-6'>
              <p className='font-semibold mb-3'>Colour: <span className='font-normal text-gray-600'>{productData.color || 'Classic'}</span></p>
              <div className='flex gap-3'>
                {productData.image.slice(0, 2).map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setImage(img)}
                    className={`w-16 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${image === img ? 'border-black' : 'border-gray-200'}`}
                  >
                    <img src={img} alt='' className='w-full h-full object-cover' />
                    {image === img && (
                      <div className='absolute top-1 right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center'>
                        <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-3'>
                  <p className='font-semibold'>Select Size</p>
                  <button className='text-teal-600 text-sm font-semibold flex items-center gap-1'>
                    Size guide
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>
                <div className='flex flex-wrap gap-3'>
                  {productData.sizes.map((item, index) => (
                    <button 
                      onClick={() => setSize(item)} 
                      className={`min-w-[50px] px-4 py-2 border rounded-md font-medium text-sm transition-all ${
                        item === size 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 hover:border-black'
                      }`} 
                      key={index}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag & Wishlist */}
            <div className='flex gap-3 mb-6'>
              <button 
                onClick={() => {
                  if (!size && productData.sizes && productData.sizes.length > 0) {
                    toast.error('Please select a size');
                    return;
                  }
                  addToCart(productData._id, size);
                }} 
                className='flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                ADD TO BAG
              </button>
              <button className='w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-black transition-colors'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </button>
            </div>

            {/* Offers Section */}
            <div className='mb-6'>
              <p className='font-semibold mb-3'>Save extra with these offers</p>
              <div className='border border-gray-200 rounded-lg p-4'>
                <div className='flex items-center gap-3'>
                  <span className='text-2xl'>🏷️</span>
                  <div>
                    <p className='font-semibold'>Buy 2 for 1199</p>
                    <p className='text-sm text-gray-500'>Auto applied offer <span className='text-teal-600 font-semibold cursor-pointer'>View all items {'>'}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Check */}
            <div className='mb-6'>
              <p className='font-semibold mb-3'>Check for Delivery Details</p>
              <div className='flex gap-2'>
                <input 
                  type='text' 
                  placeholder='Enter Pincode'
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className='flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                />
                <button 
                  onClick={checkDelivery}
                  className='px-6 py-3 text-teal-600 font-semibold hover:bg-teal-50 rounded-lg transition-colors'
                >
                  Check
                </button>
              </div>
              {deliveryInfo && (
                <div className='mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2'>
                  <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <span className='text-green-700'>This product is eligible for <strong>FREE SHIPPING</strong></span>
                </div>
              )}
            </div>

            {/* Key Highlights */}
            <div className='mb-6'>
              <p className='font-semibold mb-4'>Key Highlights</p>
              <div className='grid grid-cols-2 gap-4'>
                {keyHighlights.map((item, idx) => (
                  <div key={idx} className='border-b border-gray-100 pb-3'>
                    <p className='text-xs text-gray-500 mb-1'>{item.label}</p>
                    <p className='font-medium'>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion Sections */}
            <div className='border-t border-gray-200'>
              <div className='py-4 border-b border-gray-200'>
                <button className='w-full flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                    </svg>
                    <div className='text-left'>
                      <p className='font-semibold'>Product Description</p>
                      <p className='text-xs text-gray-500'>Manufacture, Care and Fit</p>
                    </div>
                  </div>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
              </div>
              <div className='py-4 border-b border-gray-200'>
                <button className='w-full flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                    </svg>
                    <div className='text-left'>
                      <p className='font-semibold'>15 Days Returns & Exchange</p>
                      <p className='text-xs text-gray-500'>Know about return & exchange policy</p>
                    </div>
                  </div>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className='flex justify-around py-6 border-b border-gray-200'>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                  </svg>
                </div>
                <p className='text-xs text-gray-600'>100% GENUINE<br/>PRODUCT</p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                  </svg>
                </div>
                <p className='text-xs text-gray-600'>100% SECURE<br/>PAYMENT</p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                  </svg>
                </div>
                <p className='text-xs text-gray-600'>EASY RETURNS &<br/>INSTANT REFUNDS</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className='py-6'>
              {/* Tabs */}
              <div className='flex border-b border-gray-200 mb-6'>
                <button 
                  onClick={() => setActiveTab('product')}
                  className={`px-6 py-3 font-semibold text-sm ${activeTab === 'product' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                >
                  Product Reviews
                </button>
                <button 
                  onClick={() => setActiveTab('brand')}
                  className={`px-6 py-3 font-semibold text-sm ${activeTab === 'brand' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                >
                  Brand Reviews
                </button>
              </div>

              {/* Recommendation */}
              <div className='flex items-center gap-2 mb-6'>
                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' />
                </svg>
                <span className='text-green-600 font-semibold'>89%</span>
                <span className='text-gray-600'>of verified buyers recommend this product</span>
              </div>

              {/* Rating Summary */}
              <div className='flex gap-8 mb-6'>
                <div className='text-center'>
                  <p className='text-5xl font-bold'>{reviewStats.average}</p>
                  <p className='text-sm text-gray-500'>{reviewStats.total} ratings</p>
                  <div className='flex justify-center gap-0.5 mt-1'>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className={`w-4 h-4 ${i <= Math.floor(reviewStats.average) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} viewBox='0 0 20 20'>
                        <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                      </svg>
                    ))}
                  </div>
                  <button className='mt-3 px-6 py-2 border border-teal-600 text-teal-600 rounded-lg font-semibold text-sm hover:bg-teal-50 transition-colors'>
                    RATE
                  </button>
                </div>
                <div className='flex-1'>
                  {reviewStats.distribution.map((item, idx) => (
                    <div key={idx} className='flex items-center gap-2 mb-1'>
                      <span className='w-3 text-sm'>{item.stars}</span>
                      <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                        <div 
                          className={`h-full rounded-full ${item.stars >= 4 ? 'bg-green-500' : item.stars === 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className='text-xs text-gray-500 w-10'>({item.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Filters */}
              <div className='mb-6'>
                <p className='font-semibold mb-3'>Hear what our customers say ({reviewStats.total})</p>
                <div className='flex flex-wrap gap-2'>
                  {['Most Helpful', 'Most Recent', 'Product Quality', 'Material', 'Fit', 'Value For Money'].map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => setReviewFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        reviewFilter === filter 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Review */}
              <div className='border-t border-gray-200 pt-4'>
                <div className='flex items-center gap-1 mb-2'>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className='w-4 h-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                    </svg>
                  ))}
                  <span className='ml-2 text-green-600 text-sm font-semibold flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                    </svg>
                    Verified Buyer
                  </span>
                </div>
                <p className='text-gray-700 mb-2'>Great quality product! The fabric is soft and comfortable. Perfect fit as expected. Highly recommended!</p>
                <p className='text-xs text-gray-500'>Rahul S. • 2 days ago</p>
              </div>

              {/* View All Reviews Button */}
              <button className='w-full mt-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors'>
                View all Reviews
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10 border-t border-gray-200'>
        <div className='flex items-center gap-3 mb-6'>
          <h2 className='text-xl font-bold'>Frequently Bought Together</h2>
          <span className='bg-green-500 text-white text-xs font-bold px-2 py-1 rounded'>NEW</span>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {frequentlyBought.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </div>

      {/* More Collections */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-6'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <button className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
            <span className='font-medium'>More {typeof productData.category === 'object' ? productData.category?.name : productData.category} Oversized Fit T-shirt</span>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
          <button className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
            <span className='font-medium'>More {productData.color || 'Similar'} T-shirt</span>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
          <button className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
            <span className='font-medium'>More {typeof productData.category === 'object' ? productData.category?.name : productData.category} Collection</span>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>

      {/* You May Also Like */}
      <RelatedProducts category={typeof productData.category === 'object' ? productData.category?.name : productData.category} subCategory={productData.subCategory} />

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='fixed bottom-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-colors z-40'
      >
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
        </svg>
      </button>

    </div>
  ) : <div className='min-h-screen flex items-center justify-center'><div className='animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full'></div></div>
}

export default Product
