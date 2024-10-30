import React from 'react';
import YouTubeLikePlayer from './components/YouTubeLikePlayer';

function App() {
  const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'; // Example HLS stream

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 App">
      <YouTubeLikePlayer videoSrc={videoSrc} videoTitle="Awesome Live Stream" />
    </div>
  );
}

export default App;
