import { signInUser } from '@/firebase';
import { AuthContext } from '@/provider/context';
import React, { useContext } from 'react'

const LoginButton = ({onClick}) => {
  return (
    <div>
        <button onClick={onClick} className="bg-blue-500 rounded-lg w-32 h-10 mr-2 hover:bg-blue-400 text-white">Login</button>
    </div>
  )
}

export default LoginButton