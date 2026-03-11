"use client";

import { useEffect, useRef } from "react";

function playVideo(video) {
  const playPromise = video.play();
  if (playPromise && typeof playPromise.then === "function") {
    return playPromise;
  }
  return Promise.resolve();
}

export default function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const body = document.body;
    const video = videoRef.current;

    let isReady = false;
    let isVideoResolved = false;
    let retryBound = false;
    let lastTime = 0;
    let stalledTicks = 0;
    let heartbeatId = 0;
    let resizeTimer = 0;
    const timeoutIds = new Set();

    const setTrackedTimeout = (fn, delay) => {
      const id = window.setTimeout(() => {
        timeoutIds.delete(id);
        fn();
      }, delay);
      timeoutIds.add(id);
      return id;
    };

    const markReady = () => {
      if (isReady) {
        return;
      }
      isReady = true;
      requestAnimationFrame(() => {
        body.classList.add("is-ready");
      });
    };

    const markVideoPlaying = () => {
      if (isVideoResolved) {
        return;
      }
      isVideoResolved = true;
      body.classList.remove("video-failed");
      body.classList.add("video-playing");
      markReady();
    };

    const markVideoFailed = (isPermanent) => {
      if (isVideoResolved) {
        return;
      }
      body.classList.add("video-failed");
      markReady();
      if (isPermanent) {
        isVideoResolved = true;
      }
    };

    const scheduleResume = (delay) => {
      if (document.hidden) {
        return;
      }
      setTrackedTimeout(() => {
        tryPlay();
      }, typeof delay === "number" ? delay : 120);
    };

    const ensurePlayback = (force) => {
      if (!video || document.hidden) {
        return;
      }

      if (video.paused || video.ended) {
        scheduleResume(force ? 0 : 100);
        return;
      }

      if (force) {
        lastTime = video.currentTime;
        stalledTicks = 0;
        return;
      }

      const nowTime = video.currentTime;
      if (Math.abs(nowTime - lastTime) < 0.01) {
        stalledTicks += 1;
        if (stalledTicks >= 2) {
          stalledTicks = 0;
          scheduleResume(80);
        }
      } else {
        stalledTicks = 0;
      }
      lastTime = nowTime;
    };

    const startHeartbeat = () => {
      if (heartbeatId) {
        return;
      }
      heartbeatId = window.setInterval(() => {
        ensurePlayback(false);
      }, 900);
    };

    const bindRetry = () => {
      if (retryBound || isVideoResolved) {
        return;
      }
      retryBound = true;

      const resumeVideo = () => {
        retryBound = false;
        body.classList.remove("video-failed");
        tryPlay();
      };

      window.addEventListener("pointerdown", resumeVideo, { once: true, passive: true });
      window.addEventListener("keydown", resumeVideo, { once: true });
    };

    const tryPlay = () => {
      if (!video) {
        markVideoFailed(true);
        return;
      }
      playVideo(video)
        .then(() => {
          markVideoPlaying();
        })
        .catch(() => {
          markVideoFailed(false);
          bindRetry();
        });
    };

    const onLoadedData = () => markReady();
    const onCanPlay = () => tryPlay();
    const onPlaying = () => markVideoPlaying();
    const onTimeUpdate = () => {
      if (!video) {
        return;
      }
      lastTime = video.currentTime;
    };
    const onStalled = () => scheduleResume(120);
    const onWaiting = () => scheduleResume(120);
    const onSuspend = () => scheduleResume(180);
    const onError = () => {
      markVideoFailed(false);
      bindRetry();
      scheduleResume(220);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        ensurePlayback(true);
        scheduleResume(80);
      }
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ensurePlayback(true);
        scheduleResume(80);
      }, 120);
    };

    const onOrientationChange = () => {
      ensurePlayback(true);
      scheduleResume(120);
    };

    const onPageShow = () => {
      ensurePlayback(true);
      scheduleResume(80);
    };

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      video.addEventListener("loadeddata", onLoadedData, { once: true });
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.addEventListener("playing", onPlaying, { once: true });
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("stalled", onStalled);
      video.addEventListener("waiting", onWaiting);
      video.addEventListener("suspend", onSuspend);
      video.addEventListener("error", onError);

      document.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onOrientationChange);
      window.addEventListener("pageshow", onPageShow);

      setTrackedTimeout(() => tryPlay(), 180);
      setTrackedTimeout(() => {
        if (!isVideoResolved) {
          markVideoFailed(false);
        }
      }, 2600);
      startHeartbeat();
    } else {
      markVideoFailed(true);
    }

    setTrackedTimeout(markReady, 260);

    return () => {
      window.clearTimeout(resizeTimer);
      timeoutIds.forEach((id) => window.clearTimeout(id));
      timeoutIds.clear();

      if (heartbeatId) {
        window.clearInterval(heartbeatId);
      }

      if (video) {
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("stalled", onStalled);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("suspend", onSuspend);
        video.removeEventListener("error", onError);
      }

      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return (
    <div className="bg-video-wrap" aria-hidden="true">
      <video
        id="bg-video"
        ref={videoRef}
        className="bg-video is-visible"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src="/batman-rain.mp4?v=hd20260311" type="video/mp4" />
      </video>
    </div>
  );
}
