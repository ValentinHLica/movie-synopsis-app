import React, { useContext, useEffect, useRef, useState } from "react";

import Context from "@components/Context";

import styles from "@styles/components/VideoPlayer/progress.module.scss";

const Progress: React.FC = () => {
  const { videoEl } = useContext(Context);
  const progressEl = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!(videoEl && videoEl.current) || !progressEl.current) return;

    const scrubTime =
      (event.nativeEvent.offsetX / progressEl.current.offsetWidth) *
      videoEl.current.duration;
    videoEl.current.currentTime = scrubTime;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoEl && videoEl.current) {
        const percent =
          (videoEl.current.currentTime / videoEl.current.duration) * 100;
        setProgress(percent);
      }
    };

    if (videoEl && videoEl.current) {
      videoEl.current.addEventListener("timeupdate", handleTimeUpdate);
    }
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
