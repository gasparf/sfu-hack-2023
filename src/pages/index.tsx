import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useContext } from "react";
import { askChat } from "@/chat-api";
import {
	SignOutUser,
	authWithGoogle,
	signInUser,
	signUpUser,
} from "@/firebase";
import { AuthContext } from "@/provider/context";
import Navbar from '@/components/Navbar'
import Body from '@/components/Body'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { currentUser, signOut } = useContext(AuthContext);
	React.useEffect(() => {
		(async () => {})();
	}, []);
	const signin = async () => {
		console.log(await signInUser("ishwak@gmail.com", "ishwak09"));
	};

	const signup = async () => {
		console.log(await signUpUser("ishwak@gmail.com", "ishwak09"));
	};

	const logout = async () => {
		await signOut(() => {});
	};

	const googleAuth = async () => {
		await authWithGoogle();
	};

	return (
		<main className="flex min-h-screen flex-col bg-white ">
     <Navbar />
     <Body />
			{!currentUser && (
				<>
					<button onClick={signin}>sign in</button>
					<button onClick={signup}>sign up</button>
					<button onClick={googleAuth}>Authenticate with google</button>
				</>
			)}
			{currentUser && (
				<>
					<h3>Welcome {currentUser.email}</h3>
					<button onClick={logout}>logout</button>
				</>
			)}
		</main>
	);
}
