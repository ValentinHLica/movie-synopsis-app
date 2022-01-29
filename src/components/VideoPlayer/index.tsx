import React, { useContext, useRef, useState } from "react";

import Controls from "./Controls";
import Context from "@context";
import { Spinner } from "@ui";

import styles from "@styles/components/VideoPlayer/index.module.scss";

const Player: React.FC = () => {
  const {
    videoPath,
    videoEl,
    playerEl,
    setSettings,
    viewTimestamp,
    setViewTimestamp,
    setMouseMove,
    settings,
  } = useContext(Context);

  const timeOut = useRef<NodeJS.Timeout>();
  const [loading, setLoading] = useState<boolean>(true);

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

    if (!viewTimestamp && !settings) {
      timeOut.current = setTimeout(() => {
        setMouseMove(false);
      }, 2000);
    }
  };

  return (
    <>
      <Spinner
        className={`${styles.spinner} ${loading ? styles.spinner__on : ""}`}
      />
      <div className={styles.player} ref={playerEl} onMouseMove={onMouseMove}>
        <video
          src={videoPath as string}
          className={styles.video}
          ref={videoEl}
          autoPlay
          onClick={onVideoClick}
          onDoubleClick={onDoubleClick}
          onPlay={() => {
            if (loading) {
              setLoading(false);
            }
          }}
        />

        <Controls />
      </div>
    </>
  );
};

export default Player;
