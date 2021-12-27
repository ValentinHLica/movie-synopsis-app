import React, { useContext } from "react";

import Voice from "./Voice";
import Output from "./Output";
import Context from "@components/Context";

import styles from "@styles/components/VideoPlayer/Settings/settings.module.scss";

const Settings: React.FC = () => {
  const { settings } = useContext(Context);

  return (
    <ul
      className={`${styles.settings} ${
        !settings ? styles.settings__hidden : ""
      }`}
    >
      <li>
        <h5>Change Voice</h5>
        <Voice />
      </li>

      <li>
        <h5>Change Export Path</h5>
        <Output />
      </li>
    </ul>
  );
};

export default Settings;
