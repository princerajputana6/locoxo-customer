import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'

const StockClearance = () => {
    const { products } = useContext(ShopContext)
    const [clearanceProducts, setClearanceProducts] = useState([])

    useEffect(() => {
        // Find products with highest discount or specific clearance tag
        // For now, we'll sort by discount difference or just take some random ones as placeholder
        const filtered = products.filter(item => item.discountPrice && item.price > item.discountPrice)
        
        if (filtered.length > 0) {
            // Sort by biggest discount percentage
            filtered.sort((a, b) => {
                const discountA = (a.price - a.discountPrice) / a.price
                const discountB = (b.price - b.discountPrice) / b.price
                return discountB - discountA
            })
            setClearanceProducts(filtered.slice(0, 4))
        } else {
            // Fallback to random products if no discounts set
            setClearanceProducts(products.slice(0, 4))
        }
    }, [products])

    if (clearanceProducts.length === 0) return null

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'STOCK'} text2={'CLEARANCE'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Up to 70% off on selected items. Limited stock available!
                </p>
            </div>
            
            <div className='bg-red-50 p-6 sm:p-10 rounded-2xl'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
                    {clearanceProducts.map((item, index) => (
                        <div key={index} className='relative group'>
                            <div className='absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10'>
                                SALE
                            </div>
                            <ProductItem id={item._id} image={item.image} name={item.name} price={item.discountPrice || item.price} />
                            {item.discountPrice && (
                                <p className='text-sm text-gray-500 line-through mt-1'>${item.price}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className='mt-8 text-center'>
                    <Link to='/collection?sort=price_asc' className='inline-block bg-red-600 text-white px-8 py-3 font-medium hover:bg-red-700 transition-colors rounded'>
                        VIEW ALL CLEARANCE
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default StockClearance
