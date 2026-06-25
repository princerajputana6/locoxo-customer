import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import axios from 'axios'
import { Sparkles } from 'lucide-react'

// AI-powered "You may also like" cross-sell for the product page (Claude).
const AISuggestions = ({ productId }) => {
    const { backendUrl } = useContext(ShopContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!productId) return
        let cancelled = false
        const load = async () => {
            setLoading(true)
            try {
                const { data } = await axios.post(backendUrl + '/api/ai/suggestions', { productId })
                if (!cancelled && data.success) setProducts(data.products || [])
            } catch (err) { console.error('AI suggestions error:', err) }
            finally { if (!cancelled) setLoading(false) }
        }
        load()
        return () => { cancelled = true }
    }, [productId])

    if (!loading && products.length === 0) return null

    return (
        <div className='my-16'>
            <div className='flex items-center gap-2 mb-8'>
                <Sparkles className='w-6 h-6 text-locoxo-orange' />
                <h2 className='text-2xl sm:text-3xl font-heading font-extrabold text-locoxo-header'>YOU MAY ALSO LIKE</h2>
            </div>
            {loading ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
                    {[...Array(4)].map((_, i) => <div key={i} className='aspect-[3/4] bg-gray-100 animate-pulse' />)}
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
                    {products.map((item) => (
                        <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AISuggestions
