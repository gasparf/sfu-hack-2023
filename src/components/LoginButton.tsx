import { signInUser } from '@/firebase';
import { AuthContext } from '@/provider/context';
import React, { useContext } from 'react'

const LoginButton = () => {


  const signin = async () => {
		console.log(await signInUser("ishwak@gmail.com", "ishwak09"));
	};

  return (
    <div>
        <button onClick={signin} className="bg-teal-300 rounded-lg w-32 h-10">Login</button>
    </div>
  )
}

export default LoginButton