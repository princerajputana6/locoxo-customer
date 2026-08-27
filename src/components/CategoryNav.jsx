import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// Chevrons
const Down = () => <svg className='w-3 h-3 opacity-70' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
const Right = () => <svg className='w-3 h-3 opacity-60' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>

// Desktop top category bar with NESTED hover dropdowns:
//   hover a category → its sub-categories drop down; hover a sub → its
//   child-categories fly out to the side. Built from the flat category list.
const CategoryNav = ({ categories = [] }) => {
  const [openRoot, setOpenRoot] = useState(null)
  const roots = categories.filter((c) => !c.parentCategory)
  const kidsOf = (id) => categories.filter((c) => String(c.parentCategory) === String(id))

  return (
    <div className='flex items-center justify-center gap-8 py-3 overflow-visible'>
      <NavLink to='/collection' className='text-sm font-semibold text-white hover:text-locoxo-orange transition-colors whitespace-nowrap'>Discover</NavLink>
      {roots.slice(0, 8).map((root) => {
        const subs = kidsOf(root._id)
        const open = openRoot === root._id
        return (
          <div key={root._id} className='relative' onMouseEnter={() => setOpenRoot(root._id)} onMouseLeave={() => setOpenRoot(null)}>
            <NavLink to={`/collection?category=${encodeURIComponent(root.name)}`} className='flex items-center gap-1 text-sm font-semibold text-white hover:text-locoxo-orange transition-colors whitespace-nowrap'>
              {root.name}{subs.length > 0 && <Down />}
            </NavLink>
            {subs.length > 0 && open && (
              <div className='absolute left-0 top-full pt-3 z-50'>
                <div className='min-w-[220px] bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2'>
                  {subs.map((sub) => <SubItem key={sub._id} sub={sub} kidsOf={kidsOf} />)}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const SubItem = ({ sub, kidsOf }) => {
  const [open, setOpen] = useState(false)
  const children = kidsOf(sub._id)
  return (
    <div className='relative' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink to={`/collection?category=${encodeURIComponent(sub.name)}`} className='flex items-center justify-between gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition-colors'>
        {sub.name}{children.length > 0 && <Right />}
      </NavLink>
      {children.length > 0 && open && (
        <div className='absolute left-full top-0 pl-1 z-50'>
          <div className='min-w-[200px] bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2'>
            {children.map((ch) => (
              <NavLink key={ch._id} to={`/collection?category=${encodeURIComponent(ch.name)}`} className='block px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition-colors'>{ch.name}</NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryNav
