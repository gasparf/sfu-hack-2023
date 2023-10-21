import { signInUser } from '@/firebase';
import { AuthContext } from '@/provider/context';
import React, { useContext } from 'react'

const LoginButton = ({onClick}) => {
  return (
    <div>
        <button onClick={onClick} className="bg-teal-300 rounded-lg w-32 h-10">Login</button>
    </div>
  )
}

export default LoginButton