import { authWithGoogle } from "@/firebase/index";

export default function GoogleSignIn() {
    const googleAuth = async () => {
		await authWithGoogle();
	};

    return (
        <div className="flex max-w-sm justify-between">
            <button onClick={googleAuth}  className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-800 transition duration-300">
                Login with Google
            </button>
        </div>

    )
}