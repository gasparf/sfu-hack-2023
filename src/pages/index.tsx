import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { askChat } from "@/chat-api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	React.useEffect(() => {
		(async () => {
			console.log(await askChat("what is your name?"));
		})();
	}, []);
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		></main>
	);
}
