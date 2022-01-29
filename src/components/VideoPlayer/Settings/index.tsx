import React, { useContext, useRef, useEffect } from "react";

import Voice from "./Voice";
import Output from "./Output";
import CustomContent from "./CustomContent";
import Cli from "./Cli";
import Context from "@context";
import {
  AudioVizIcon,
  FolderIcon,
  HearAudioIcon,
  MoonIcon,
  SunIcon,
} from "@icon";
import { Switch } from "@ui";

import styles from "@styles/components/VideoPlayer/settings.module.scss";

const Settings: React.FC = () => {
  const { settings, customAudio, setCustomAudio, theme, setTheme } =
    useContext(Context);

  const firstLoad = useRef<boolean>(false);

  useEffect(() => {
    if (firstLoad.current) {
      if (customAudio) {
        localStorage.setItem("custom-audio", "on");
        setCustomAudio(true);
      } else {
        localStorage.removeItem("custom-audio");
        setCustomAudio(false);
      }
    } else {
      const customAudioLocal = localStorage.getItem("custom-audio");
      setCustomAudio(!!customAudioLocal);
    }

    firstLoad.current = true;

    // eslint-disable-next-line
  }, [customAudio]);

  return (
    <ul
      className={`${styles.settings} ${
        !settings ? styles.settings__hidden : ""
      }`}
    >
      <li className={styles.switch}>
        {theme ? <SunIcon /> : <MoonIcon />}

        <h5>Theme</h5>

        <Switch state={theme} setState={setTheme} />
      </li>

      <CustomContent />

      <li className={styles.switch}>
        <AudioVizIcon />

        <h5>Custom Audio</h5>

        <Switch state={customAudio} setState={setCustomAudio} />
      </li>

      <li className={styles.voice}>
        <HearAudioIcon />

        <h5>Voice</h5>

        <Voice />
      </li>

      <li>
        <FolderIcon />

        <h5>Export</h5>

        <Output />
      </li>

      <Cli />
    </ul>
  );
};

export default Settings;
