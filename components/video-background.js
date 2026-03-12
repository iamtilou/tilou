"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const tryPlay = () => {
      if (document.visibilityState === "hidden") {
        return;
      }
      video.play().catch(() => {
        // autoplay can be blocked on some environments; user interaction will resume it
      });
    };

    const handlePause = () => tryPlay();
    const handleEnded = () => {
      video.currentTime = 0;
      tryPlay();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    tryPlay();
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", tryPlay);
    window.addEventListener("focus", tryPlay);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", tryPlay);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <div className="bg-video-wrap" aria-hidden="true">
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
      >
        <source src="/batman-rain.mp4?v=hd20260311" type="video/mp4" />
      </video>
    </div>
  );
}
