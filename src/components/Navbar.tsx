import React, { useContext } from 'react'
import LoginButton from './LoginButton'
import { AuthContext } from '@/provider/context';


const Navbar = () => {
  const { currentUser, signOut } = useContext(AuthContext);
  return (
    <nav className="bg-gray-300">
      <div className="flex flex-row justify-between">
        <div className="p-4 text-xl">
          Logo
        </div>
        <div className="mt-2 mb-2 flex flex-row">
          <div>{!currentUser ? <LoginButton/> : <p>Welcome {currentUser.email}</p>}</div>
        </div>
 
      </div>
    </nav>
  )
}

export default Navbar