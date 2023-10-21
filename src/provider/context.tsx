import { User } from "firebase/auth";
import { SignOutUser, userStateListener } from "@/firebase";
import { createContext, useState, useEffect, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

export const AuthContext = createContext({
	currentUser: {} as User | null,
	setCurrentUser: (_user: User) => {},
	signOut: (cb: () => void) => {},
});

export const AuthProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = userStateListener((user) => {
			if (user) setCurrentUser(user);
		});

		return unsubscribe;
	}, [setCurrentUser]);

	const signOut = async (cb: () => void) => {
		await SignOutUser();
		setCurrentUser(null);
		cb();
	};
	const values = {
		currentUser,
		setCurrentUser,
		signOut,
	};

	console.log(values);

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
