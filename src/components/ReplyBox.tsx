import React, { useState } from 'react'

interface ReplyBox {
    isPerson: boolean;
    date: String;
    text:string;
}

const ReplyBox:React.FC<ReplyBox> = ({isPerson,date, text}) => {
  const [expand, setExpand] = useState(false)
  const boxStyles =  isPerson ? "bg-green-400" : "bg-green-300"
  return (
        <div className={isPerson != false ? "float-right clear-both" : "float-left clear-both"}>
          <div className={`${boxStyles} mb-5 rounded-lg w-[350px] p-3 m-2 shadow-lg  sm:px-6`}>
            <div className="flex space-x-3">
              <div className="flex-1 gap-4">
                <p className="font-large text-sm text-black font-semibold mb-2">
                  {isPerson == false ? "AI" : "You"} 
                </p>
                <p onClick={() => setExpand(true)}>{isPerson ? text : text.length > 200 ? expand ? text : text.slice(0,200)+"... Read more" : text}</p>
                <p className="text-black text-right font-light" style={{fontSize: 9}}>
                  {date}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ReplyBox