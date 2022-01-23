import React, { useContext, useEffect, useState } from "react";

import moment from "moment";

import { SettingsIcon, FullScreenIcon, FullScreenExitIcon } from "@icon";
import Context from "@context";
import TimeStamp from "./Timestamp/index";
import Progress from "./Progress";
import Settings from "./Settings/index";
import Subtitle from "./Subtitle";

import styles from "@styles/components/VideoPlayer/controls.module.scss";

const Controls: React.FC = () => {
  const {
    videoEl,
    playerEl,
    viewTimestamp,
    setViewTimestamp,
    settings,
    setSettings,
    mouseMove,
    setVideoPath,
    setAddStamp,
    currentTime,
    setCurrentTime,
  } = useContext(Context);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const videoControl = (e: KeyboardEvent) => {
    if (!(videoEl && videoEl.current)) return;

    const video = videoEl.current;
    const key = e.code;

    if (document.activeElement?.tagName !== "BODY") return;

    if (!video) return;

    switch (key) {
      case "ArrowLeft":
        video.currentTime -= 5;
        if (video.currentTime < 0) {
          video.pause();
          video.currentTime = 0;
        }
        break;

      case "ArrowRight":
        video.currentTime += 5;
        if (video.currentTime > video.duration) {
          video.pause();
          video.currentTime = 0;
        }
        break;

      case "Space":
        if (video.paused || video.ended) {
          video.play();
          setViewTimestamp(false);
          setSettings(false);
        } else {
          video.pause();
        }
        break;

      case "Escape":
        setVideoPath(null);
        break;

      default:
        break;
    }
  };

  const onTimeChange = () => {
    if (videoEl && videoEl.current) {
      setCurrentTime(videoEl.current.currentTime);
    }
  };

  const onExpand = () => {
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

  const timestampHandler = () => {
    setViewTimestamp(true);

    if (settings) {
      setSettings(false);
    }

    setAddStamp((prevState) => ({
      ...prevState,
      startTime: moment.utc(currentTime * 1000).format("HH:mm:ss"),
    }));

    if (videoEl && videoEl.current) {
      videoEl.current.pause();
    }
  };

  const settingsHandler = () => {
    setSettings(true);

    if (viewTimestamp) {
      setViewTimestamp(false);
    }

    if (videoEl && videoEl.current) {
      videoEl.current.pause();
    }
  };

  useEffect(() => {
    setAddStamp((prevState) => ({
      ...prevState,
      startTime: moment.utc(currentTime * 1000).format("HH:mm:ss"),
    }));

    // eslint-disable-next-line
  }, [currentTime]);

  useEffect(() => {
    window.onkeydown = videoControl;

    if (videoEl && videoEl.current) {
      videoEl.current.onkeydown = (e) => e.preventDefault();

      videoEl.current.addEventListener("timeupdate", onTimeChange);
    }

    if (playerEl && playerEl.current) {
      playerEl.current.onfullscreenchange = () =>
        setIsFullscreen((prevValue) => !prevValue);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`${styles.controls} ${
        mouseMove ? styles.controls__visible : ""
      }`}
    >
      <Subtitle />

      <Progress />

      <ul className={styles.content}>
        <li className={styles.content__time} onClick={timestampHandler}>
          {moment.utc(currentTime * 1000).format("HH:mm:ss")}
        </li>

        <li className={styles.settings} onClick={settingsHandler}>
          <SettingsIcon />
        </li>

        <li onClick={onExpand}>
          {isFullscreen ? <FullScreenExitIcon /> : <FullScreenIcon />}
        </li>
      </ul>

      <Settings />

      <TimeStamp />
    </div>
  );
};

export default Controls;
