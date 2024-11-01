import React from "react";

const LiveButton = ({ isLive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isLive ? "bg-red-600" : "bg-blue-500"
      } text-white font-bold py-2 px-6 rounded-full mt-4 transition-all hover:bg-blue-700 focus:outline-none`}
    >
      {isLive ? "LIVE" : "Go to Live"}
    </button>
  );
};

export default LiveButton;
