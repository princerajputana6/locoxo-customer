import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-2'>
          {text1} <span className='font-light italic'>{text2}</span>
        </h2>
        <div className='flex items-center justify-center gap-3 mt-4'>
          <div className='w-12 h-[2px] bg-black'></div>
          <div className='w-2 h-2 bg-black rotate-45'></div>
          <div className='w-12 h-[2px] bg-black'></div>
        </div>
    </div>
  )
}

export default Title
