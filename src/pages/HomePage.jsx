import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import LiveButton from "../components/LiveButton";
import CalendarPicker from "../components/CalendarPicker";
import axios from "axios";

const HomePage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleLiveClick = async () => {
    try {
      const response = await axios.get("/api/videos/live");
      const { s3_key, thumbnail, subtitles } = response.data;
      setVideoUrl(`https://your-s3-url/${s3_key}`);
      setThumbnail(thumbnail);
      setSubtitles(subtitles);
      setIsLive(true);
    } catch (error) {
      console.error("Error fetching live video", error);
    }
  };

  const handleDateChange = async (date) => {
    try {
      const response = await axios.get(`/api/videos/calendar?date=${date}`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos by date", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-blue">
      <h1 className="mb-4 text-4xl text-white">SSAFFiire</h1>
      <VideoPlayer videoUrl={videoUrl} thumbnail={thumbnail} subtitles={subtitles} />
      <LiveButton isLive={isLive} onClick={handleLiveClick} />
      <CalendarPicker onDateChange={handleDateChange} />
      <div className="absolute bottom-0 text-white">Viewers Count: XYZ</div>
    </div>
  );
};

export default HomePage;
