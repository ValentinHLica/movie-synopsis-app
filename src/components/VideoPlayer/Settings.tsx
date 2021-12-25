import React from "react";

import styles from "@styles/components/VideoPlayer/settings.module.scss";

type Props = {
  visible: boolean;
};

const Settings: React.FC<Props> = ({ visible }) => {
  return (
    <div
      className={`${styles.settings} ${
        !visible ? styles.settings__hidden : ""
      }`}
    ></div>
  );
};

export default Settings;
