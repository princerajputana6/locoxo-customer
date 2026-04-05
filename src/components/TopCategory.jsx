import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'

const TopCategory = () => {
    
    const categories = [
        {
            name: "Men's Collection",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "/collection?category=Men"
        },
        {
            name: "Women's Collection",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "/collection?category=Women"
        },
        {
            name: "Kids' Collection",
            image: "https://images.unsplash.com/photo-1514090281093-1768c7515082?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "/collection?category=Kids"
        }
    ]

    return (
        <div className='my-16 sm:my-20 px-4 sm:px-6 lg:px-8'>
            <div className='text-center py-6 sm:py-8 text-2xl sm:text-3xl'>
                <Title text1={'SHOP BY'} text2={'CATEGORY'} />
                <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 px-4'>
                    Discover our main collections tailored for everyone.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
                {categories.map((cat, index) => (
                    <Link to={cat.link} key={index} className='relative h-[350px] sm:h-[400px] overflow-hidden group rounded-xl'>
                        <img 
                            src={cat.image} 
                            alt={cat.name} 
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8'>
                            <h3 className='text-white text-2xl font-bold mb-2'>{cat.name}</h3>
                            <span className='text-white font-medium flex items-center gap-2 group-hover:gap-4 transition-all'>
                                EXPLORE <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' /></svg>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopCategory
