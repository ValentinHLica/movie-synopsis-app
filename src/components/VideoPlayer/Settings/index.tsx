import React, { useContext } from "react";

import Voice from "./Voice";
import Output from "./Output";
import ContentText from "./ContentText";
import Cli from "./Cli";
import Context from "@context";
import { Switch } from "@ui";

import styles from "@styles/components/VideoPlayer/settings.module.scss";
import { useEffect } from "react";

const Settings: React.FC = () => {
  const { settings, customAudio, setCustomAudio } = useContext(Context);

  useEffect(() => {
    localStorage.setItem("custom-audio", "on");
  }, [customAudio]);

  useEffect(() => {
    const customAudioLocal = localStorage.getItem("custom-audio");

    if (customAudioLocal && customAudioLocal === "on") {
      setCustomAudio(true);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <ul
      className={`${styles.settings} ${
        !settings ? styles.settings__hidden : ""
      }`}
    >
      <ContentText />

      <li>
        <h5>Custom Audio</h5>
        <Switch state={customAudio} setState={setCustomAudio} />
      </li>

      <li>
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
