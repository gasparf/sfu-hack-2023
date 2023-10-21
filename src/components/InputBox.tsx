import TextSubmit from "./SubmitButton"

export default function InputBox() {
    return (
        <div className="inputContainer flex w-full">
            <div className="inputBoxContainer p-1 flex-1 align-middle rounded-xl">
                <input  type="text" placeholder="Your Input Goes Here..." className="userInput flex w-full p-5 rounded-xl text-black border border-black ">
                
                </input>
            </div>
            <div>
                <TextSubmit/>
            </div>

        </div>
   
    )
}