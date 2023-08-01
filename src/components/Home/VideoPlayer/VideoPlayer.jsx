import React, { useRef, useEffect, useState } from 'react';
import Video from "../../../assets/Home/VideoPlayer/shoevideo.mp4";
import './VideoPlayer.css'; // Import the CSS file

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleScroll = () => {
      const videoTop = videoElement.getBoundingClientRect().top;
      const videoBottom = videoElement.getBoundingClientRect().bottom;
      const windowMid = window.innerHeight / 2;

      // Check if the video is in the viewport and focused
      if (videoTop <= windowMid && videoBottom >= windowMid) {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    // Play the video when it is in focus
    if (isFocused && !isPlaying) {
      setIsPlaying(true);
      videoElement.play().catch(error => console.log(error));
    } else if (!isFocused && isPlaying) {
      setIsPlaying(false);
      videoElement.pause();
    }
  }, [isFocused, isPlaying]);

  return (
    <div className="video-container">
      <video className='video' ref={videoRef} loop>
        <source src={Video} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
