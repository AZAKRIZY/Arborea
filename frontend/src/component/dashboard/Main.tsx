import React from "react";

const Main = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-start bg-gradient-to-br from-green-100 via-green-200 to-green-50 p-8 overflow-y-auto rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-green-800 mb-8 drop-shadow-lg">
        Dashboard Overview
      </h1>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Example dashboard card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-lg text-gray-700">
            Welcome to your Arborea dashboard!
          </span>
          <span className="text-green-700 mt-2">
            Add widgets or summary info here.
          </span>
        </div>
        {/* Add more dashboard widgets/cards here as needed */}
      </div>
    </div>
  );
};

export default Main;
