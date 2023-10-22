import React, { useState } from 'react'
import ReplyBox from './ReplyBox'
import InputBox from './InputBox'
import { askChat } from '@/chat-api'

const Body = () => {
  const [userInput,setUserInput] = useState('')
  const [chatResponse,setChatResponse] = useState([]) 
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) =>{
    setUserInput(e.target.value);
}

const handleSubmission = async() =>{
  setLoading(true)
    try{
        const response = await askChat(userInput);
        const arr: any[] = [...chatResponse];
        
        arr.unshift({
          from: "user",
          message: userInput,
          date: new Date()
        });
        arr.unshift({
          from: "ai",
          message: response[0].message.content,
          date: new Date()
        });
        
       setChatResponse(arr);
       
    }catch(error){
        console.error('Error calling askChat:', error);
    }
    setLoading(false)
}
    
  return (
    <div className={"bg-gray-100 w-2/5 mx-auto mt-5 flex-col rounded-xl border border-beige " + (chatResponse.length === 0 ? "pb-96" : "")}>

        <InputBox onChange={handleInputChange} onSubmit={handleSubmission} userInput={userInput} />
        {loading && <ReplyBox isPerson={false} text='Asking question...' date={"Now"}/>}

        {loading && <ReplyBox isPerson = {true} date={`${(new Date).getDate()}`+`/`+`${(new Date).getMonth()+1}`+`/`+`${(new Date).getFullYear()}`} text={userInput}/>}
        {chatResponse.map(response => <ReplyBox isPerson = {response.from === "user"} date={`${response.date.getDate()}`+`/`+`${response.date.getMonth()+1}`+`/`+`${response.date.getFullYear()}`} text={response.message}/>)}
    </div>
  )
}

export default Body