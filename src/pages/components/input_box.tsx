// export function checkInput() {

// }
import TextSubmit from "./text_Submit"

export default function InputBox() {
    return (
        <div className="inputContainer flex items-center justify-center p-0">
            <div className="inputBoxContainer p-1 align-middle rounded-xl">
                <input  type="text" placeholder="Your Input Goes Here..." className="userInput flex flex-1 justify-center self-start w-full p-5 bg-beige rounded-xl text-black border border-black rounded-md">
                
                </input>
            </div>
            <div>
                <TextSubmit/>
            </div>

        </div>
   
    )
}