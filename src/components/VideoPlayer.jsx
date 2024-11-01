import React, { useState, useEffect, useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import DatePicker from "react-datepicker";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Loader2 } from 'lucide-react'
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

const VideoPlayer = () => {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [first, setFirst] = useState(false)

  const [hoverVisible, setHoverVisible] = useState(false);
  const videoRef = useRef(null);
  
  const [videoData, setVideoData] = useState({
    date : "2021-10-06T05:14:00.000Z",
    image : "https://planets17.s3.af-south-1.amazonaws.com/IMAGE/2021/20211006-0514-S30.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQMEY6FX5IYCEKG53%2F20241101%2Faf-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241101T021657Z&X-Amz-Expires=86400&X-Amz-Signature=504fcbe24f1a0b3d04e025044fa86e5bee172a633e7f302f7218beb788864df1&X-Amz-SignedHeaders=host&x-id=GetObject",
    key : "2021/20211006-0514-S30",
    metadata : {"name": 'TASH SULTANA - LET THE LIGHT IN (Live at Lonely Lands Studio)', owner: '@TashSultanaMusic', date_released: '2021-10-05', length: '03:55', starting_point: '0'},
    subtitle : {},
    video : "https://planets17.s3.af-south-1.amazonaws.com/VIDEO/2021/20211006-0514-S30.mkv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQMEY6FX5IYCEKG53%2F20241101%2Faf-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241101T021658Z&X-Amz-Expires=86400&X-Amz-Signature=3d3efbdc76edc1ceed40dae51f1f35c330c499f14ef84628ce00c57af15c504c&X-Amz-SignedHeaders=host&x-id=GetObject"
  }) 
    
  const [selectedDate, setSelectedDate] = useState(new Date(videoData.date));
  
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const onNextVideo = async(date) => {
    setIsLoading(true)
    videoRef.current.pause()

    const video = await API.get(`/videos/next`, {
      params: {
        date: date
      }
    });
    console.log(video);
    
    if(video.data.status) {
      setVideoData(video.data.data)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    
    const getRecentVideo = async () => {
      try {
        const video = await API.get(`/videos/recent`);
        console.log(video);
        
        if(video.data.status) {
          setVideoData(video.data.data)
        }
      } catch (err) {
        console.log(err);
      } 
    };
    
    setIsLoading(true)

    getRecentVideo();
    
    setIsLoading(false)
  }, [first])
  
  // useEffect(() => {
  //   if(!showThumbnail){
  //     const timer = setTimeout(() => {
  //       setShowThumbnail(false);
  //       videoRef.current.play(); // Start playing the video
  //     }, 3000); // 3000 milliseconds = 3 seconds
  
  //     // Clean up the timer when the component unmounts
  //     return () => clearTimeout(timer);
  //   }
  // }, [showThumbnail]);

  const onDateVideo = async(date) => {
    setIsLoading(true)
    videoRef.current.pause()

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

    setIsLoading(false)
  }

  const onLiveVideo = async() => {
    setIsLoading(true)
    videoRef.current.pause()

    const video = await API.get(`/videos/live`);
    console.log(video);
    
    if(video.data.status) {
      setVideoData(video.data.data)
    }
    else setSelectedDate(videoData.date)

    setIsLoading(false)
  }

  useEffect(() => {
    setShowThumbnail(false)
    setSelectedDate(videoData.date)
  }, [videoData])
  
  const onBeforeVideo = async(date) => {
    setIsLoading(true)
    videoRef.current.pause()

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

    setIsLoading(false)
  }

  return (
    <div className="relative flex flex-col w-full h-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg md:flex-row">
    
      <div
        className="relative w-full"
      >
        {!showThumbnail && (
          <div
            className="absolute top-0 left-0 z-50 flex flex-row items-center justify-center w-full h-full duration-300 ease-in-out thumbnail-overlay"
            onClick={() => setShowThumbnail(true)}
          >
            <img src={`${videoData.image}`} className="w-full h-full"/>
          </div>
        )}

        <video
          ref={videoRef}
          controls
          className="w-full h-[600px] rounded-none shadow-xl md:rounded-l-3xl"
          src={`${videoData.video}`}
          // style={{ display: showThumbnail ? 'none' : 'block' }}
          type="video/webm"
        >
        </video>

        {isLoading && (
          <div className="absolute w-full inset-0 flex items-center justify-center bg-black  z-50">
            <Loader2 className="w-[200px] h-[200px] text-white animate-spin z-50" />
          </div>
        )}
        
        {/* Info panel that appears on the right */}
        <div 
          className="absolute top-0 right-0 z-40 h-full overflow-visible w-80 "
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
            <button 
              className="px-6 py-1 text-xl text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-400"
              onClick={async() => {await onLiveVideo()}}
              >
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
    </div>
  );
};

export default VideoPlayer;