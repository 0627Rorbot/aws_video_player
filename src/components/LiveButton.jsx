import React from "react";

const LiveButton = ({ isLive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isLive ? "bg-blue-600" : "bg-gray-500"
      } text-white font-bold py-2 px-4 rounded-full transition-all`}
    >
      {isLive ? "LIVE" : "Go to Live"}
    </button>
  );
};

export default LiveButton;
