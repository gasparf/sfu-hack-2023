import LoadCache from "@/cache";
import { AuthProvider } from "@/provider/context";
import store from "@/provider/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		(async () => {
			await LoadCache();
		})();
	});
	return (
		<Provider store={store}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</Provider>
	);
}
