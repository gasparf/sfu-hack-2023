import React from 'react'
import ReplyBox from './ReplyBox'

const Body = () => {
    
  return (
    <div className="bg-gray-100 w-1/2 h-96 mx-auto mt-5 flex-col">
        <ReplyBox isPerson = {false} date="DD/MM/YYYY"/>
        <ReplyBox isPerson = {true} date="DD/MM/YYYY"/>
    </div>
  )
}

export default Body