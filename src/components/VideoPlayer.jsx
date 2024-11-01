import React, { useState, useEffect, useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import DatePicker from "react-datepicker";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

const VideoPlayer = () => {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [hoverVisible, setHoverVisible] = useState(false);
  
  const [videoData, setVideoData] = useState({
    "key":"2024/20241016-1458-S1",
    "date":"2024-10-16T21:58:00.000Z",
    "image":"https://planets17.s3.af-south-1.amazonaws.com/IMAGE/2024/20241016-1458-S1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQMEY6FX5IYCEKG53%2F20241031%2Faf-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241031T120518Z&X-Amz-Expires=86400&X-Amz-Signature=7da2a37dbdd5a6524c2ca6dd545ca907e1813d3a125bed20ba6b26402ab0eca6&X-Amz-SignedHeaders=host&x-id=GetObject",
    "metadata":{"name":"How to set 0 point on ruler in adobe illustrator| rulers and guides in illustrator 2015 cc","owner":"@Juliapak","date_released":"2016-01-14","length":"00:36","starting_point":"0","quality":"1280x684","fps":"30","vcodec":"avc1.64001F","acodec":"opus","date_pasted":"2024-10-16","time_pasted":"14:58:02","new_name":"20241016-1458-S1","youtube_link":"https://www.youtube.com/watch?v=IrGuB4gSe8Q","chapters":""},
    "subtitle":{},
    "video":"https://planets17.s3.af-south-1.amazonaws.com/VIDEO/2024/20241016-1458-S1.mkv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQMEY6FX5IYCEKG53%2F20241031%2Faf-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241031T120520Z&X-Amz-Expires=86400&X-Amz-Signature=2fd731cfed17eab35c03192d7241ba9f2459f2f58bda6b5d4b676446dd3c22dd&X-Amz-SignedHeaders=host&x-id=GetObject"}) 
    
  const [selectedDate, setSelectedDate] = useState(new Date(videoData.date));
  
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const onNextVideo = async(date) => {
    const video = await API.get(`/videos/next`, {
      params: {
        date: date
      }
    });
    console.log(video);
    
    if(video.data.status) {
      setVideoData(video.data.data)
    }
  }

  
  const onDateVideo = async(date) => {
    const video = await API.get(`/videos/date`, {
      params: {
        date: date
      }
    });
    console.log(video);
    
    if(video.data.status) {
      setVideoData(video.data.data)
    }
    else setSelectedDate(videoData.date)
  }

  useEffect(() => {
    setIsPlaying(false)
    setSelectedDate(videoData.date)
  }, [videoData])
  
  const onBeforeVideo = async(date) => {
    const video = await API.get(`/videos/before`, {
      params: {
        date: date
      }
    });
    console.log(video.data.data);
    
    if(video.data.status) {
      setVideoData(video.data.data)
      console.log(video.data.data.video);
    }
  }

  return (
    <div className="relative flex flex-col w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg md:flex-row">

      {/* Video Container */}
      <div
        className="relative w-full"
      >
        {!isPlaying && (
          <div
            className="absolute top-0 left-0 z-50 flex flex-row items-center justify-center w-full h-full duration-300 ease-in-out thumbnail-overlay"
            onClick={() => setIsPlaying(true)}
          >
            <img src={`${videoData.image}`} className="w-full h-full"/>
          </div>
        )}

        <video
          controls
          className="w-full h-auto rounded-none shadow-xl md:rounded-l-3xl"
          src={`${videoData.video}`}
          type="video/webm"
        >
        </video>

        {/* Info panel that appears on the right */}
        <div 
          className="absolute top-0 right-0 z-50 h-full overflow-visible w-80 "
          onMouseEnter={() => setShowInfoPanel(true)}
          onMouseLeave={() => setShowInfoPanel(false)}
        >
          <div className={`top-0 right-0 h-full w-full rounded-md bg-white bg-opacity-90 text-gray-900 p-4 transition-transform duration-300 ease-in-out transform ${
              showInfoPanel ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="flex items-center mb-4">
              <img src="./assets/chanel.svg" alt="Channel Avatar" className="w-10 h-10 mr-2 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">VIDEO INFO</h2>
              </div>
            </div>
            <hr className="my-4 bg-black" />
            
            <p className="mb-2 font-semibold text-md">
              {Object.values(videoData.metadata).length === 0 ? "Unavailble Name" : Object.values(videoData.metadata)[0]}
            </p>
            <p className="mb-4 text-sm font-semibold">
              {videoData.metadata.date_released} - {videoData.metadata.length ? "Unavailable Length" : videoData.metadata.length}
            </p>
            <hr className="my-4" />
            <div className="flex items-center mb-2">
              <FaRegCalendarAlt className="w-10 h-8 mr-2"/>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={async(date) => {
                    setSelectedDate(date)
                    await onDateVideo(date)
                  }}
                  dateFormat="MMMM d, yyyy"
                  className="px-0 py-1 font-semibold text-center text-gray-900 bg-transparent border border-gray-900 rounded-md "
                  popperPlacement="bottom"
                  showPopperArrow={false}
                />
              </div>
            </div>
            <hr className="my-4" />
            
            <div className="flex items-center">
              <IoPersonCircleOutline className="w-10 h-10 mr-2"/>
              <div>
                <h2 className="font-semibold text-md">{videoData.metadata.owner === "" ? "Unavailable Owner" : videoData.metadata.owner}</h2>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex items-center">
              <img src="./assets/youtube.ico" alt="Channel Avatar" className="w-10 h-10 mr-2 rounded-full" />
              <div>
                <h2 className="font-semibold text-md">YOUTUBE</h2>
              </div>
            </div>
            <p className="p-2 mb-2 font-semibold text-md">
              {videoData.metadata.youtube_link === "" ? "Unavailable Link" : videoData.metadata.youtube_link}
            </p>
            <hr className="my-4" />
          </div>
        </div>
        
        {/* Hover Panel for Navigation Buttons */}
        <div 
          onMouseEnter={() => setHoverVisible(true)}
          onMouseLeave={() => setHoverVisible(false)}
          className="absolute left-0 w-full bottom-14"
        >
          <div
            className={`w-full flex justify-center items-center space-x-4 transition-opacity duration-300 p-5 ease-in-out bg-transparent ${
              hoverVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <button 
              className="px-2 py-2 text-white transition-colors duration-200 bg-blue-800 rounded-lg hover:bg-blue-700"
              onClick={async() => {await onBeforeVideo(videoData.date)}}
              >
              <MdNavigateBefore className="w-6 h-6"/>
            </button>
            <button className="px-6 py-1 text-xl text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-400">
              Live
            </button>
            <button 
              className="px-2 py-2 text-white transition-colors duration-200 bg-blue-800 rounded-lg hover:bg-blue-700"
              onClick={async() => {await onNextVideo(videoData.date)}}
              >
              <MdNavigateNext className="w-6 h-6"/>
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {/* <div className="flex flex-col w-full bg-transparent rounded-none shadow-2xl h-100 md:w-1/5">
        <div className="w-full p-4 bg-red-500 shadow-2xl md:rounded-r-3xl">
          <p className="font-semibold text-center text-white ">
            {videoData.metadata.name}
          </p>
        </div>
        
        <div className="p-4 mt-4 bg-green-600 rounded-r-3xl">
          <label className="block mb-2 font-semibold text-center text-white">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full p-2 text-center border rounded-md"
            popperPlacement="bottom"
            showPopperArrow={false}
          />
        </div>
        
        <div className="items-center w-full h-full p-4 mt-3 bg-gray-800 md:rounded-r-3xl">
          <p className="mt-4 font-semibold text-center text-white">
            {videoData.metadata.owner}
          </p>
          <p className="mt-4 font-semibold text-center text-white">
            {videoData.metadata.date}
          </p>
          <p className="mt-4 font-semibold text-center text-white">
            {videoData.metadata.date_released}
          </p>
          <p className="mt-4 font-semibold text-center text-white">
            {videoData.metadata.length}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default VideoPlayer;