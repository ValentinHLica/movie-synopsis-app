import React, { useEffect, useRef } from "react";

import TimeStamper from "./TimeStamper";

import styles from "@styles/components/VideoPlayer/index.module.scss";

type Props = {
  title?: string;
  video: string;
  synopsis?: string;
};
const Player: React.FC<Props> = ({ video, title, synopsis }) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  return (
    <div className={styles.player}>
      <video
        src={video}
        className={styles.video}
        controls
        ref={videoEl}
      ></video>

      <TimeStamper
        synopsis={synopsis}
        videoPath={video}
        title={title}
        video={videoEl}
      />
    </div>
  );
};

export default Player;
