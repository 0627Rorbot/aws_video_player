import React, { useState, useRef, useEffect } from 'react'

export default function EnhancedLocalVideoPlayer() {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHoverControls, setShowHoverControls] = useState(false)
  const [showInfoHoverControls, setShowInfoHoverControls] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        handlePlayPause()
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
    setPlaying(!playing)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    videoRef.current.volume = newVolume
  }

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) || 0
      setProgress(progress)
    }
  }

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value) * duration
    videoRef.current.currentTime = newTime
    setProgress(parseFloat(e.target.value))
  }

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  const handleSettingsToggle = () => setShowSettings(!showSettings)

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
  }

  return (
    <div className='w-full h-[100vh] flex items-center mx-auto'>
      <div className="flex w-full max-w-6xl mx-auto bg-gray-100">
        <div ref={containerRef} className="relative w-full bg-black">
          <div className="relative pb-[56.25%]">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full"
              onTimeUpdate={handleProgress}
              onLoadedMetadata={() => setDuration(videoRef.current.duration)}
            >
              <source src="./video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute px-2 py-1 font-bold text-white bg-black bg-opacity-50 rounded top-4 left-4">
              YourTube
            </div>
            {showHoverControls && (
              <div className="absolute left-0 right-0 bottom-0 flex p-4 items-center justify-between transform border-collapse h-[150px] bg-gray-800 bg-opacity-80 z-50"
                onMouseEnter={() => setShowHoverControls(true)}
                onMouseLeave={() => setShowHoverControls(false)}
              >
                <button className='p-3 bg-black border-2 border-white rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="block w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="px-6 py-3 font-bold text-white bg-black border-2 border-white rounded-full text-md">
                  LIVE
                </button>
                <button className="p-3 bg-black border-2 border-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            {showInfoHoverControls && (
              <div className="absolute top-0 right-0 flex-row items-center justify-between p-4 transform bg-white border-collapse shadow-lg bg-opacity-70 w-[200px] h-full">
                <h2 className="mt-5 mb-2 text-xl font-bold text-gray-800">Local Video Title</h2>
                <p className="mb-4 text-sm text-gray-600">1,234,567 views • May 15, 2023</p>
                <div className="py-4 my-4 border-t border-b">
                  <p className="mb-4 text-sm text-gray-700">
                    This is the description of your local video. You can provide details about the content,
                    creator information, or any other relevant details here.
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <p><strong>File:</strong> local_video.mp4</p>
                  <p><strong>Duration:</strong> {formatTime(duration)}</p>
                  <p><strong>Size:</strong> 15.7 MB</p>
                </div>
                
                <button className="px-4 py-2 mt-5 text-center text-white transition bg-blue-600 rounded duration-00 hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            )}
            
            <div className="absolute top-0 right-0 flex-row items-center justify-between p-4 transform bg-opacity-0 w-[10px] h-full"
              onMouseEnter={() => setShowInfoHoverControls(true)}
              onMouseLeave={() => setShowInfoHoverControls(false)}
            >
            </div>
            
          </div>
          <div className="absolute bottom-0 left-0 right-0 pb-4 bg-gradient-to-t from-black to-transparent">
            <div className="px-4 py-2">
              <div className="flex items-center space-x-4">
                <button onClick={handlePlayPause} className="text-white focus:outline-none">
                  {playing ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={progress}
                  onChange={handleSeekChange}
                  className="w-full"
                />
                <button onClick={handleSettingsToggle} className="text-white focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button onClick={handleFullscreenToggle} className="text-white focus:outline-none">
                  {fullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-white">
                <span>{formatTime(progress * duration)} / {formatTime(duration)}</span>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
            <div className='h-[20px]'
              onMouseEnter={() => setShowHoverControls(true)}
              onMouseLeave={() => setShowHoverControls(false)}
            >
            </div>
          </div>
          {showSettings && (
            <div className="absolute p-4 bg-white rounded shadow-lg bottom-16 right-4">
              <h3 className="mb-2 font-bold text-gray-800">Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-700">Quality</label>
                  <select className="px-2 py-1 text-gray-800 bg-gray-100 rounded">
                    <option>Original</option>
                    <option>720p</option>
                    <option>480p</option>
                    <option>360p</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Playback Speed</label>
                  <select className="px-2 py-1 text-gray-800 bg-gray-100 rounded" onChange={(e) => videoRef.current.playbackRate = parseFloat(e.target.value)}>
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>Normal</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}