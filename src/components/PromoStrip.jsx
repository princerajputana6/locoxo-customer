import React from 'react'

const PromoStrip = () => {
  const promoMessages = [
    "🎉 FLAT 50% OFF ON ALL PRODUCTS",
    "🚚 FREE SHIPPING ON ORDERS ABOVE ₹999",
    "⚡ LIMITED TIME OFFER - SHOP NOW",
    "🎁 BUY 2 GET 1 FREE ON SELECTED ITEMS",
    "💝 NEW ARRIVALS - EXCLUSIVE COLLECTION"
  ];

  return (
    <div className='bg-black text-white py-2 overflow-hidden'>
      <div className='marquee-container'>
        <div className='marquee-content'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='flex items-center gap-8 whitespace-nowrap'>
              {promoMessages.map((message, idx) => (
                <span key={idx} className='text-sm font-medium tracking-wide px-4'>
                  {message}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default PromoStrip
