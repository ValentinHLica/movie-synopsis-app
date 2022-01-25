import React, { useContext, useEffect, useState } from "react";

import moment from "moment";

import {
  SettingsIcon,
  FullScreenIcon,
  FullScreenExitIcon,
  PlayIcon,
  PauseIcon,
  SubtitleIcon,
} from "@icon";
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

  const onPlay = () => {
    if (videoEl && videoEl.current) {
      const method = videoEl.current.paused ? "play" : "pause";
      videoEl.current[method]();

      if (method === "play") {
        setViewTimestamp(false);
        setSettings(false);
      }
    }
  };

  const timestampHandler = () => {
    if (settings) {
      setSettings(false);
    }

    setViewTimestamp((prevState) => {
      if (prevState) {
        if (videoEl && videoEl.current) {
          videoEl.current.play();
        }
      } else {
        if (videoEl && videoEl.current) {
          videoEl.current.pause();
        }
      }
      return !prevState;
    });

    setAddStamp((prevState) => ({
      ...prevState,
      startTime: moment.utc(currentTime * 1000).format("HH:mm:ss"),
    }));
  };

  const settingsHandler = () => {
    setSettings((prevState) => {
      if (prevState) {
        if (videoEl && videoEl.current) {
          videoEl.current.play();
        }
      } else {
        if (videoEl && videoEl.current) {
          videoEl.current.pause();
        }
      }

      return !prevState;
    });

    if (viewTimestamp) {
      setViewTimestamp(false);
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

      <Progress className={styles.progress} />

      <ul className={styles.content}>
        <li onClick={onPlay}>
          {videoEl && videoEl.current && videoEl.current.paused ? (
            <PlayIcon />
          ) : (
            <PauseIcon />
          )}
        </li>

        <li className={styles.content__time}>
          <p>{moment.utc(currentTime * 1000).format("HH:mm:ss")}</p>
          <span>/</span>
          <p>
            {videoEl &&
              videoEl.current &&
              moment.utc(videoEl.current.duration * 1000).format("HH:mm:ss")}
          </p>
        </li>

        <li onClick={timestampHandler}>
          <SubtitleIcon />
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
