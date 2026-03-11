import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

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
  }, [productId,products])

  return productData ? (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-8 lg:gap-12 flex-col lg:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse lg:flex-row gap-4'>
          <div className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-3 lg:w-24'>
              {
                productData.image.map((item,index)=>(
                  <img 
                    onClick={()=>setImage(item)} 
                    src={item} 
                    key={index} 
                    className={`w-20 h-20 lg:w-full lg:h-auto object-cover cursor-pointer border-2 transition-all ${
                      image === item ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                    }`} 
                    alt="" 
                  />
                ))
              }
          </div>
          <div className='flex-1 bg-gray-100'>
              <img className='w-full h-auto object-contain' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1 lg:max-w-xl'>
          <h1 className='text-3xl font-bold tracking-tight mb-3'>{productData.name}</h1>
          
          {/* Rating */}
          <div className='flex items-center gap-2 mb-4'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-black fill-current' : 'text-gray-300 fill-current'}`} viewBox='0 0 20 20'>
                    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                  </svg>
                ))}
              </div>
              <span className='text-sm text-gray-600'>(122 reviews)</span>
          </div>
          
          {/* Price */}
          <div className='mb-6'>
            <p className='text-4xl font-bold'>{currency}{productData.price}</p>
          </div>
          
          {/* Description */}
          <p className='text-gray-600 leading-relaxed mb-8'>{productData.description}</p>
          
          {/* Size Selector */}
          <div className='mb-8'>
              <p className='text-sm font-bold tracking-wide mb-4'>SELECT SIZE</p>
              <div className='flex flex-wrap gap-3'>
                {productData.sizes.map((item,index)=>(
                  <button 
                    onClick={()=>setSize(item)} 
                    className={`min-w-[60px] px-4 py-3 border-2 font-medium text-sm transition-all ${
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
          
          {/* Add to Cart Button */}
          <button 
            onClick={()=>addToCart(productData._id,size)} 
            className='w-full bg-black text-white py-4 font-semibold tracking-wide hover:bg-gray-800 transition-colors mb-6'
          >
            ADD TO CART
          </button>
          
          {/* Product Features */}
          <div className='border-t border-gray-200 pt-6 space-y-3'>
              <div className='flex items-start gap-3'>
                <svg className='w-5 h-5 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <p className='text-sm text-gray-600'>100% Original product</p>
              </div>
              <div className='flex items-start gap-3'>
                <svg className='w-5 h-5 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <p className='text-sm text-gray-600'>Cash on delivery available</p>
              </div>
              <div className='flex items-start gap-3'>
                <svg className='w-5 h-5 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <p className='text-sm text-gray-600'>Easy return & exchange within 7 days</p>
              </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-16'>
        <div className='flex border-b border-gray-200'>
          <button className='px-6 py-4 font-semibold text-sm border-b-2 border-black'>DESCRIPTION</button>
          <button className='px-6 py-4 text-sm text-gray-600 hover:text-black transition-colors'>REVIEWS (122)</button>
        </div>
        <div className='py-8 space-y-4 text-sm text-gray-600 leading-relaxed'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
