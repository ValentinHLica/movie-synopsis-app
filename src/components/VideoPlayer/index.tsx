import React, { useRef, useState } from "react";

import Controls from "./Controls";

import styles from "@styles/components/VideoPlayer/index.module.scss";

type Props = {
  video: string;
};

const Player: React.FC<Props> = ({ video }) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const playerEl = useRef<HTMLDivElement>(null);
  const [viewTimestamp, setViewTimestamp] = useState<boolean>(false);
  const [script, setScript] = useState<string>("");

  const onVideoClick = () => {
    if (videoEl.current) {
      const method = videoEl.current.paused ? "play" : "pause";
      videoEl.current[method]();

      if (viewTimestamp && method === "play") {
        setViewTimestamp(false);
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

  return (
    <div className={styles.player} ref={playerEl}>
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
        script={script}
        setScript={setScript}
      />
    </div>
  );
};

export default Player;
