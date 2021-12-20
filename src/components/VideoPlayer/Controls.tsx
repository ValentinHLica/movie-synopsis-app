import React, { useEffect, useState } from "react";

import moment from "moment";

import { TimeStamp as TimeStampType } from "@interface/movie";

import { ExpandIcon, MinimizeIcon } from "@icon";
import TimeStamp from "./Timestamp";
import Progress from "./Progress";
import { splitText } from "@utils/helpers";

import styles from "@styles/components/VideoPlayer/controls.module.scss";

type Props = {
  videoEl: React.RefObject<HTMLVideoElement>;
  videoPath: string;
  playerEl: React.RefObject<HTMLDivElement>;
  viewTimestamp: boolean;
  setViewTimestamp: React.Dispatch<React.SetStateAction<boolean>>;
  script: string;
  setScript: React.Dispatch<React.SetStateAction<string>>;
};

const Controls: React.FC<Props> = ({
  videoEl,
  videoPath,
  playerEl,
  viewTimestamp,
  setViewTimestamp,
  script,
  setScript,
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

    if (
      timestamps.length > 1 &&
      timestamps.filter((item) => item.startTime === "").length > 0
    ) {
      setAddStamp({
        text: timestamps.filter((item) => item.startTime === "")[0].text,
        startTime: moment.utc(currentTime * 1000).format("HH:mm:ss"),
      });
    }

    if (videoEl.current) {
      videoEl.current.pause();
    }
  };

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
  }, []);

  useEffect(() => {
    const newTimeScript: TimeStampType[] = splitText(script).map((text) => ({
      text,
      startTime: "",
    }));

    setTimestamps(newTimeScript);
  }, [script]);

  return (
    <div className={styles.controls}>
      {timestamps.length > 1 && (
        <p className={styles.timestamp}>
          {
            // (timestamps.filter(
            //   (item) =>
            //     item.startTime ===
            //     moment.utc(currentTime * 1000).format("HH:mm:ss")
            // ).length > 0 &&
            //   timestamps.filter(
            //     (item) =>
            //       item.startTime ===
            //       moment.utc(currentTime * 1000).format("HH:mm:ss")
            //   )[0].text) ??
            timestamps.filter((item) => item.startTime === "").length > 0 &&
              timestamps.filter((item) => item.startTime === "")[0].text
          }
        </p>
      )}

      <p className={styles.timer} onClick={timestampHandler}>
        {moment.utc(currentTime * 1000).format("HH:mm:ss")}
      </p>

      <Progress videoEl={videoEl} />

      <div className={styles.expand} onClick={onExpand}>
        {!isFullscreen ? <ExpandIcon /> : <MinimizeIcon />}
      </div>

      <TimeStamp
        addStamp={addStamp}
        setAddStamp={setAddStamp}
        timestamps={timestamps}
        setTimestamps={setTimestamps}
        visible={viewTimestamp}
        script={script}
        setScript={setScript}
        videoPath={videoPath}
      />
    </div>
  );
};

export default Controls;
