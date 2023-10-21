import React from 'react'
import LoginButton from './LoginButton'

const Navbar = () => {
  return (
    <nav className="bg-gray-300">
      <div className="flex flex-row justify-between">
        <div className="p-4 text-xl">
          Logo
        </div>
        <div className="mt-2 mb-2">
          <LoginButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar