interface SubmitButton{
    onSubmit : () =>void
}


export default function SubmitButton({onSubmit}) {
    return (
        <div className="buttonContainer flex justify-center m-1 rounded-xl  ">
            <button onClick={onSubmit} type="button" className="submitButton flex bg-green-500 rounded-xl p-3 text-white border-2 border-green-400 shadow-md hover:bg-green-600 transition-duration-300">
                Send
            </button>
        </div> 
    )
    }