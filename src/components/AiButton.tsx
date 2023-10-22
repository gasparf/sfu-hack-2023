import colors from "@/colors"
import Link from "next/link";

const AiButton = () => {
    return (<Link href={"/chat"}><button style={{
        
        background: colors.tailwind.blue._500,
        borderRadius: 12,
        padding: "12px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 40,
        right: 40,
        color: "white",
        fontWeight: "bold",
    }}>Ask Ai</button></Link>)
}

export default AiButton;