import React, { useContext, useRef } from "react";

import Voice from "./Voice";
import Output from "./Output";
import CustomContent from "./CustomContent";
import Cli from "./Cli";
import Context from "@context";
import { Switch } from "@ui";

import styles from "@styles/components/VideoPlayer/settings.module.scss";
import { useEffect } from "react";

const Settings: React.FC = () => {
  const { settings, customAudio, setCustomAudio } = useContext(Context);

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
      <CustomContent />

      <li className={styles.switch}>
        <h5>Custom Audio</h5>
        <Switch state={customAudio} setState={setCustomAudio} />
      </li>

      <li className={styles.voice}>
        <h5>Voice</h5>
        <Voice />
      </li>

      <li>
        <h5>Export</h5>
        <Output />
      </li>

      <Cli />
    </ul>
  );
};

export default Settings;
