import { signInUser, signUpUser, authWithGoogle } from "@/firebase/index";
import React, { HTMLInputTypeAttribute, useContext, useEffect, useState } from 'react';
import GoogleSignIn from "@/components/GoogleSignIn";
import { AuthContext } from "@/provider/context";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Login() {
    const router = useRouter();

    const { currentUser, signOut } = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (currentUser) {
            router.push(
                "/chat"
            )
        }
    }, [currentUser])

    const signin = async () => {
        try {
            console.log(await signInUser(userEmail, userPass));

        } catch(err) {
            setError(err.message);
        }

	};

	const signup = async () => {
		
        try {
            console.log(await signUpUser(userEmail, userPass));

        } catch(err) {
            setError(err.message);
        }
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
            <p>{error}</p>
        </div>
      </div>
    )


}

