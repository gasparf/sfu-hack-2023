import { signInUser, signUpUser, authWithGoogle } from "@/firebase/index";
import React, { HTMLInputTypeAttribute, useState } from 'react';
import GoogleSignIn from "./GoogleSignIn";

export default function SignIn() {
    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")

    const signin = async () => {
		console.log(await signInUser(userEmail, userPass));

	};

	const signup = async () => {
		console.log(await signUpUser(userEmail, userPass));
	};

    return(
        <div className="max-w-sm mx-auto p-4">
        <div className="space-y-4">
          <div>
            {/* <label htmlFor="email" className="block text-gray-700">Email:</label> */}
            <input 
            value={userEmail}
            type="email" onChange={(e) => setUserEmail(e.target.value)} id="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Enter your email"/>
          </div>
  
          <div>
            {/* <label htmlFor="password" className="block text-gray-700">Password:</label> */}
            <input 
            value = {userPass}
            onChange={(e) => setUserPass(e.target.value)} type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Enter your password"/>
          </div>
  
          <button onClick={signin} type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300">
            Login
          </button>
  
          <button onClick={signup} type="button" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-300">
            Create Account
          </button>

            <GoogleSignIn></GoogleSignIn>
        </div>
      </div>
    )


}

