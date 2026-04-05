import React from 'react'
import Title from './Title'

const ReviewSystem = () => {
    
    const reviews = [
        {
            name: "Sarah M.",
            rating: 5,
            comment: "Absolutely love the quality of the clothes! The shipping was fast and the fit is perfect. Will definitely be shopping here again.",
            date: "2 days ago",
            purchase: "Floral Summer Dress"
        },
        {
            name: "James T.",
            rating: 5,
            comment: "The Super Hero collection is fire! The print quality is amazing and it hasn't faded after multiple washes.",
            date: "1 week ago",
            purchase: "Marvel Logo Tee"
        },
        {
            name: "Emily R.",
            rating: 4,
            comment: "Great customer service. Had to exchange a size and the process was super smooth. The new size fits great.",
            date: "2 weeks ago",
            purchase: "Denim Jacket"
        }
    ]

    return (
        <div className='my-16 sm:my-24 bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 rounded-2xl sm:rounded-3xl'>
            <div className='text-center pb-8 sm:pb-12 text-2xl sm:text-3xl'>
                <Title text1={'CUSTOMER'} text2={'REVIEWS'} />
                <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-3 px-4'>
                    Don't just take our word for it. Here's what our customers have to say.
                </p>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-2 mt-4'>
                    <div className='flex text-yellow-400'>
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span className='font-medium text-base sm:text-lg'>4.9/5</span>
                        <span className='text-gray-500 text-xs sm:text-sm'>(1,284 reviews)</span>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                {reviews.map((review, index) => (
                    <div key={index} className='bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                        <div className='flex items-start justify-between mb-4 gap-2'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 flex-shrink-0'>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className='font-bold text-sm'>{review.name}</p>
                                    <div className='flex text-yellow-400'>
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className='text-xs text-gray-400 flex-shrink-0'>{review.date}</span>
                        </div>
                        <p className='text-gray-600 text-sm leading-relaxed mb-4'>"{review.comment}"</p>
                        <div className='text-xs font-medium text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-full'>
                            Purchased: {review.purchase}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className='text-center mt-8 sm:mt-10'>
                <button className='border border-black px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm hover:bg-black hover:text-white transition-colors font-medium rounded'>
                    WRITE A REVIEW
                </button>
            </div>
        </div>
    )
}

export default ReviewSystem
