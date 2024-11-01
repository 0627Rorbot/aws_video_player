import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoList = ({ onSelectVideo }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos/s3-videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-full max-w-4xl mt-6">
      <h2 className="mb-4 text-2xl text-white">All Videos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.key}
            className="p-4 bg-gray-800 rounded-lg cursor-pointer"
            onClick={() => onSelectVideo(video)}
          >
            <h3 className="font-semibold text-white truncate">{video.key.split('/').pop()}</h3>
            <p className="text-gray-400">Last Modified: {new Date(video.lastModified).toLocaleDateString()}</p>
            <p className="text-gray-400">Size: {(video.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
