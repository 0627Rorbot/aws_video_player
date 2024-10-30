import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const YouTubeLikePlayer = ({ videoSrc, videoTitle }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1); // volume between 0 and 1

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setDuration(videoRef.current.duration); // Set the duration once loaded
      });

      // Track the buffered amount and current playback time
      videoRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(videoRef.current.currentTime);
        updateBuffered();
      });

      videoRef.current.addEventListener('loadedmetadata', () => {
        setDuration(videoRef.current.duration);
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoSrc;
      videoRef.current.addEventListener('loadedmetadata', () => {
        setDuration(videoRef.current.duration);
      });

      videoRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(videoRef.current.currentTime);
        updateBuffered();
      });
    }
  }, [videoSrc]);

  // Function to update buffered ranges
  const updateBuffered = () => {
    const bufferedRanges = videoRef.current.buffered;
    if (bufferedRanges.length > 0) {
      const bufferedEnd = bufferedRanges.end(bufferedRanges.length - 1);
      setBuffered(bufferedEnd);
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle seek
  const handleSeek = (event) => {
    const seekTo = (event.target.value / 100) * duration; // Calculate seek time
    videoRef.current.currentTime = seekTo; // Set the current time
    setCurrentTime(seekTo);
  };

  // Format time (minutes:seconds)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle Fullscreen
  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen(); // Firefox
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen(); // IE/Edge
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      }
      setIsFullscreen(false);
    }
  };

  // Volume Control
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto bg-black rounded-lg shadow-lg">
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg"
        onClick={handlePlayPause}
        muted={isMuted}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl text-white bg-black bg-opacity-30"
          onClick={handlePlayPause}
        >
          ▶
        </div>
      )}

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="flex items-center justify-between w-full">
          {/* Play/Pause Button */}
          <button onClick={handlePlayPause} className="mr-4">
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Seek Bar */}
          <div className="relative w-full mx-4">
            {/* Combined Seek Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none"
              style={{
                background: `linear-gradient(to right, #999 ${(
                  (buffered / duration) *
                  100
                ).toFixed(2)}%, #ddd 0%)`,
              }}
            />
          </div>

          {/* Current Time / Duration */}
          <span className="mr-4">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Volume Control */}
          <div className="mr-4">
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          {/* Fullscreen Button */}
          <button onClick={handleFullscreen}>
            {isFullscreen ? '⛶' : '⛶'}
          </button>
        </div>

        {/* Video Title */}
        <div className="text-sm">{videoTitle}</div>
      </div>
    </div>
  );
};

export default YouTubeLikePlayer;
