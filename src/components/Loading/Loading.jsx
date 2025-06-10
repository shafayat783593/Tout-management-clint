import React from 'react'

function Loading() {
    return (
        <div className=" flex justify-center items-center h-screen text-center w-full">


            <div className="flex justify-center items-center gap-2  ">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>


        </div>
    )
}

export default Loading
