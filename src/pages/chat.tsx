import Body from "@/components/Body"
import Navbar from "@/components/Navbar"
import { AuthContext } from "@/provider/context";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const chat = () => {
    const { currentUser, signOut } = useContext(AuthContext);
    const logout = async () => {
		await signOut(() => {});
	};
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push(
                "/"
            )
        }
    }, [currentUser])

  return (
    <div className="flex min-h-screen flex-col bg-white">
        {currentUser && 
            (<>
                <Navbar />
                <Body />
                <button onClick={logout}>logout</button>
            </>)}
        
        
    </div>
    
  )
}

export default chat
