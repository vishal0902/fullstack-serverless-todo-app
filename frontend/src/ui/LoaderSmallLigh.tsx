import React from "react";

function LoaderSmallLight(){
  return (
    <div className="z-50 top-0 left-0 w-32 justify-center items-center">
      <div className="flex space-x-1 justify-center items-center bg-transparent ">
        <span className="sr-only">Loading...</span>
        <div className="h-3 w-3 bg-teal-400  rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-teal-400  rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-teal-400  rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default LoaderSmallLight;
