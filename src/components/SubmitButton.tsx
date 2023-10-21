interface SubmitButton{
    onSubmit : () =>void
}


export default function SubmitButton({onSubmit}) {
    return (
        <div className="buttonContainer flex justify-center p-1 rounded-20">
            <button onClick={onSubmit} type="button" className="submitButton flex bg-red-500 rounded-xl p-3">
                Send
            </button>
        </div> 
    )
    }