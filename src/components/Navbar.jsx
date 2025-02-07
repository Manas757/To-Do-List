import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between bg-violet-700 text-white py-2">
        <div className="logo">
            <span className=' text-xl font-bold mx-8'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold trasition-all duration-50'>home</li>
            <li className='cursor-pointer hover:font-bold trasition-all duration-50'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
