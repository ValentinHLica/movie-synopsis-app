import React, { useEffect, useState } from "react";

import moment from "moment";

import { TimeStamp as TimeStampType } from "@interface/movie";

import { CogIcon, ExpandIcon, MinimizeIcon } from "@icon";
import TimeStamp from "./Timestamp";
import Progress from "./Progress";
import Settings from "./Settings";

import styles from "@styles/components/VideoPlayer/controls.module.scss";
import Subtitle from "./Subtitle";

type Props = {
  videoEl: React.RefObject<HTMLVideoElement>;
  videoPath: string;
  playerEl: React.RefObject<HTMLDivElement>;
  viewTimestamp: boolean;
  setViewTimestamp: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
};

const Controls: React.FC<Props> = ({
  videoEl,
  videoPath,
  playerEl,
  viewTimestamp,
  setViewTimestamp,
  settings,
  setSettings,
  visible,
}) => {
  const [addStamp, setAddStamp] = useState<TimeStampType>({
    text: "",
    startTime: "",
  });
  const [timestamps, setTimestamps] = useState<TimeStampType[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoControl = (e: KeyboardEvent) => {
    const video = videoEl.current;
    const key = e.code;

    if (document.activeElement?.tagName !== "BODY") return;

    if (!video) return;

    if (key === "ArrowLeft") {
      video.currentTime -= 5;
      if (video.currentTime < 0) {
        video.pause();
        video.currentTime = 0;
      }
    } else if (key === "ArrowRight") {
      video.currentTime += 5;
      if (video.currentTime > video.duration) {
        video.pause();
        video.currentTime = 0;
      }
    } else if (key === "Space") {
      if (video.paused || video.ended) {
        video.play();
        setViewTimestamp(false);
        setSettings(false);
      } else {
        video.pause();
      }
    }
  };

  const onTimeChange = () => {
    if (videoEl.current) {
      setCurrentTime(videoEl.current.currentTime);
    }
  };

  const onExpand = () => {
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

  const timestampHandler = () => {
    setViewTimestamp(true);

    if (settings) {
      setSettings(false);
    }

    setAddStamp((prevState) => ({
      ...prevState,
      startTime: moment.utc(currentTime * 1000).format("HH:mm:ss"),
    }));

    if (videoEl.current) {
      videoEl.current.pause();
    }
  };

  const settingsHandler = () => {
    setSettings(true);

    if (viewTimestamp) {
      setViewTimestamp(false);
    }

    if (videoEl.current) {
      videoEl.current.pause();
    }
  };

  useEffect(() => {
    setAddStamp((prevState) => ({
      ...prevState,
      startTime: moment.utc(currentTime * 1000).format("HH:mm:ss"),
    }));
  }, [currentTime]);

  useEffect(() => {
    window.onkeydown = videoControl;

    if (videoEl.current) {
      videoEl.current.onkeydown = (e) => e.preventDefault();

      videoEl.current.addEventListener("timeupdate", onTimeChange);
    }

    if (playerEl.current) {
      playerEl.current.onfullscreenchange = () =>
        setIsFullscreen((prevValue) => !prevValue);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`${styles.controls} ${
        visible ? styles.controls__visible : ""
      }`}
    >
      <Subtitle timestamps={timestamps} currentTime={currentTime} />

      <p className={styles.timer} onClick={timestampHandler}>
        {moment.utc(currentTime * 1000).format("HH:mm:ss")}
      </p>

      <Progress videoEl={videoEl} />

      <div className={styles.expand} onClick={settingsHandler}>
        <CogIcon />
      </div>

      <div className={styles.expand} onClick={onExpand}>
        {!isFullscreen ? <ExpandIcon /> : <MinimizeIcon />}
      </div>

      <Settings visible={settings} />

      <TimeStamp
        addStamp={addStamp}
        setAddStamp={setAddStamp}
        timestamps={timestamps}
        setTimestamps={setTimestamps}
        visible={viewTimestamp}
        videoPath={videoPath}
        currentTime={currentTime}
      />
    </div>
  );
};

export default Controls;
