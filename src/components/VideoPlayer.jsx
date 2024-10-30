import React from "react";

const VideoPlayer = ({ videoUrl, thumbnail, subtitles }) => {
  return (
    <div className="relative w-full max-w-4xl">
      <video
        className="w-full"
        controls
        poster={thumbnail}
      >
        <source src={videoUrl} type="video/mp4" />
        {subtitles.map((sub, index) => (
          <track key={index} label="English" kind="subtitles" srcLang="en" src={sub} />
        ))}
      </video>
    </div>
  );
};

export default VideoPlayer;
