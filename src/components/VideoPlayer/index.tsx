import React, { useContext, useEffect, useRef } from "react";

import Controls from "./Controls";
import Context from "@components/Context";

import styles from "@styles/components/VideoPlayer/index.module.scss";

const Player: React.FC = () => {
  const {
    videoPath,
    videoEl,
    playerEl,
    setSettings,
    viewTimestamp,
    setViewTimestamp,
    mouseMove,
    setMouseMove,
  } = useContext(Context);

  const timeOut = useRef<NodeJS.Timeout>();

  const onVideoClick = () => {
    if (videoEl && videoEl.current) {
      const method = videoEl.current.paused ? "play" : "pause";
      videoEl.current[method]();

      if (method === "play") {
        setViewTimestamp(false);
        setSettings(false);
      }
    }
  };

  const onDoubleClick = () => {
    if (playerEl && playerEl.current) {
      const isInFullScreen =
        document.fullscreenElement && document.fullscreenElement !== null;

      if (!isInFullScreen) {
        playerEl.current.requestFullscreen();
      } else {
        window.document.exitFullscreen();
      }
    }
  };

  const onMouseMove = () => {
    setMouseMove(true);

    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    if (!viewTimestamp) {
      timeOut.current = setTimeout(() => {
        setMouseMove(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (playerEl && playerEl.current) {
      playerEl.current.style.cursor = !mouseMove ? "none" : "pointer";
    }
  }, [mouseMove]);

  return (
    <div className={styles.player} ref={playerEl} onMouseMove={onMouseMove}>
      <video
        src={videoPath as string}
        className={styles.video}
        ref={videoEl}
        autoPlay
        onClick={onVideoClick}
        onDoubleClick={onDoubleClick}
      />

      <Controls />
    </div>
  );
};

export default Player;
