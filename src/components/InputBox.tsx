import {useState} from 'react'
import SubmitButton from "./SubmitButton"
import { askChat } from "@/chat-api"

export default function InputBox({onChange, onSubmit, userInput}) {

    return (
        <div className="inputContainer flex w-full">
            <div className="inputBoxContainer p-1 flex-1 align-middle rounded-xl">
                <input type="text" placeholder="Your Input Goes Here..." className="userInput flex w-full p-3 rounded-xl text-black border border-black" value={userInput} onChange={onChange}>
                </input>
            </div>
            <div>
                <SubmitButton onSubmit={onSubmit}/>
            </div>
        </div>
   
    )
}