// export function checkInput() {

// }
import TextSubmit from "./text_Submit"

export default function InputBox() {
    return (
        <div className="inputContainer flex  items-center p-0 w-full">
            <div className="inputBoxContainer p-1 flex-1 align-middle rounded-xl">
                <input  type="text" placeholder="Your Input Goes Here..." className="userInput flex w-full justify-center self-start p-5 bg-beige rounded-xl text-black border border-black rounded-md">
                
                </input>
            </div>
            <div>
                <TextSubmit/>
            </div>

        </div>
   
    )
}