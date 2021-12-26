import React from "react";

import Voice from "./Voice";
import Output from "./Output";

import styles from "@styles/components/VideoPlayer/Settings/settings.module.scss";

type Props = {
  visible: boolean;
};

const Settings: React.FC<Props> = ({ visible }) => {
  return (
    <ul
      className={`${styles.settings} ${
        !visible ? styles.settings__hidden : ""
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
