import React from "react";

const InitialLoader = () => {
  return (
    <>
      <div className="bg-white w-[30vw] h-fit mb-4 rounded-md shadow-lg p-4 shrink-0 animate-pulse -z-10 m-auto mt-10">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-400 rounded"></div>

            <div className="h-3 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-[90%] bg-gray-300 rounded"></div>
          <div className="h-4 w-[60%] bg-gray-300 rounded"></div>
        </div>

        <div className="w-full h-64 bg-gray-400 rounded-md mb-4"></div>

        <div className="flex justify-between mt-2 px-4">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  );
};

export default InitialLoader;
