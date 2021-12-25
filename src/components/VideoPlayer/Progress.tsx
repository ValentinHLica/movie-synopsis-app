import React, { useEffect, useRef, useState } from "react";

import styles from "@styles/components/VideoPlayer/progress.module.scss";

type Props = {
  videoEl: React.RefObject<HTMLVideoElement>;
};

const Progress: React.FC<Props> = ({ videoEl }) => {
  const progressEl = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!videoEl.current || !progressEl.current) return;

    const scrubTime =
      (event.nativeEvent.offsetX / progressEl.current.offsetWidth) *
      videoEl.current.duration;
    videoEl.current.currentTime = scrubTime;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoEl.current) {
        const percent =
          (videoEl.current.currentTime / videoEl.current.duration) * 100;
        setProgress(percent);
      }
    };

    if (videoEl.current) {
      videoEl.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    // return () => {
    //   if (videoEl.current) {
    //     videoEl.current.removeEventListener("timeupdate", handleTimeUpdate);
    //   }
    // };
  }, [videoEl]);

  return (
    <div className={styles.progress} ref={progressEl} onClick={onClick}>
      <div
        className={styles.progress_bar}
        style={{
          flexBasis: `${progress}%`,
        }}
      />
    </div>
  );
};

export default Progress;
