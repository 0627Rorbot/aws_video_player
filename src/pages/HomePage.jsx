import React from "react";
import VideoPlayer from "../components/VideoPlayer"

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <VideoPlayer />
    </div>
  );
};

export default HomePage;
