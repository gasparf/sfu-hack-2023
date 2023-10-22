import React, { useContext, useEffect } from 'react'
import LoginButton from './LoginButton'
import { AuthContext } from '@/provider/context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
  const router = useRouter()
  const { currentUser, signOut } = useContext(AuthContext);
  const logout = async () => {
		await signOut(() => {});
	};
  useEffect(() => {
    if (!currentUser) {
        router.push(
            "/"
        )
    }
}, [currentUser])

  
  return (
    <nav className="bg-white border border-b-black border-opacity-40">
      <div className="flex flex-row justify-between">
        <div className="text-xl">
          <Link href="/"><Image src="/adaptive-icon.png" alt="Logo" height={60} width={60}/></Link>
        </div>
        <div className="mt-2 mb-2 flex flex-row">
          <div>{!currentUser ? <LoginButton onClick={() => router.push("/login")} /> : (<div className="flex"><p className="p-2 font-bold">Welcome {currentUser.email} :)</p> <button onClick={logout} className="bg-blue-500 p-2 rounded text-white hover:bg-blue-400 transition-duration-300 ml-4">Logout</button></div>)}</div>
        </div>
 
      </div>
    </nav>  
  )
}

export default Navbar