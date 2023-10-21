import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import { NextOrObserver, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: "sfu-hack.firebaseapp.com",
    projectId: "sfu-hack",
    storageBucket: "sfu-hack.appspot.com",
    messagingSenderId: "351093955094",
    appId: "1:351093955094:web:3b495383379f7bbbfbf337",
    measurementId: "G-59G8DJN6FT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInUser = async (email: string, password: string) => {
    if (!email) throw new Error("Email is required.");
    if (!password) throw new Error("Passowrd is required.");

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signUpUser = async (email: string, password: string) => {
    if (!email) throw new Error("Email is required.");
    if (!password) throw new Error("Passowrd is required.");

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
}

export const SignOutUser = async () => await signOut(auth);

const provider = new GoogleAuthProvider();


export const authWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user; 

            return user
        }
    } catch(err) {
        console.log(err.message);
        return null;
    }
} 



