import React, { useEffect, useRef, useState } from "react";

import Controls from "./Controls";

import styles from "@styles/components/VideoPlayer/index.module.scss";

type Props = {
  video: string;
  setVideo: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Player: React.FC<Props> = ({ video, setVideo }) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const playerEl = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<boolean>(false);
  const [viewTimestamp, setViewTimestamp] = useState<boolean>(false);
  const [mouseMove, setMouseMove] = useState<boolean>(false);
  const timeOut = useRef<NodeJS.Timeout>();

  const onVideoClick = () => {
    if (videoEl.current) {
      const method = videoEl.current.paused ? "play" : "pause";
      videoEl.current[method]();

      if (method === "play") {
        setViewTimestamp(false);
        setSettings(false);
      }
    }
  };

  const onDoubleClick = () => {
    if (playerEl.current) {
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
    if (playerEl.current) {
      playerEl.current.style.cursor = !mouseMove ? "none" : "pointer";
    }
  }, [mouseMove]);

  return (
    <div className={styles.player} ref={playerEl} onMouseMove={onMouseMove}>
      <video
        src={video}
        className={styles.video}
        ref={videoEl}
        autoPlay
        onClick={onVideoClick}
        onDoubleClick={onDoubleClick}
      />

      <Controls
        playerEl={playerEl}
        videoEl={videoEl}
        videoPath={video}
        viewTimestamp={viewTimestamp}
        setViewTimestamp={setViewTimestamp}
        settings={settings}
        setSettings={setSettings}
        visible={mouseMove}
        setVideo={setVideo}
      />
    </div>
  );
};

export default Player;
