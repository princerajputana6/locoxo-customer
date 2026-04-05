import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'

const AnimeSuperHero = () => {
    
    const collections = [
        {
            title: "Anime Collection",
            subtitle: "Wear your favorite characters",
            image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Anime",
            theme: "bg-purple-900",
            text: "text-purple-100",
            hover: "hover:bg-purple-800"
        },
        {
            title: "Super Hero Edition",
            subtitle: "Unleash your inner hero",
            image: "https://images.unsplash.com/photo-1612036782180-6f0b6ce846ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Super Hero",
            theme: "bg-red-900",
            text: "text-red-100",
            hover: "hover:bg-red-800"
        }
    ]

    return (
        <div className='my-16 sm:my-20 px-4 sm:px-6 lg:px-8'>
            <div className='text-center py-6 sm:py-8 text-2xl sm:text-3xl'>
                <Title text1={'SPECIAL'} text2={'EDITIONS'} />
                <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 px-4'>
                    Exclusive merchandise featuring your favorite anime and super heroes.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
                {collections.map((col, index) => (
                    <div key={index} className={`relative flex flex-col sm:flex-row items-center justify-between rounded-2xl overflow-hidden ${col.theme} p-6 sm:p-8 md:p-12 group min-h-[300px] sm:min-h-[350px]`}>
                        <div className='w-full sm:w-1/2 z-10 text-center sm:text-left mb-6 sm:mb-0'>
                            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 leading-tight uppercase`}>
                                {col.title}
                            </h3>
                            <p className={`${col.text} mb-6 sm:mb-8 font-medium text-sm sm:text-base`}>{col.subtitle}</p>
                            <Link 
                                to={`/collection?category=${col.category}`} 
                                className={`inline-block bg-white text-black px-6 py-3 font-bold rounded shadow-lg ${col.hover} hover:text-white transition-colors uppercase tracking-wider text-xs sm:text-sm`}
                            >
                                Shop Now
                            </Link>
                        </div>
                        <div className='w-full sm:w-1/2 sm:absolute sm:right-0 sm:top-0 h-48 sm:h-full'>
                            <img 
                                src={col.image} 
                                alt={col.title} 
                                className='w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay rounded-lg sm:rounded-none'
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-transparent to-black/30 mix-blend-overlay'></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnimeSuperHero
