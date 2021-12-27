import React, { useContext } from "react";

import { Tabs } from "@ui";
import Create from "./Create";
import Timestamps from "./Timestamps";
import Add from "./Add";
import Context from "@components/Context";

import styles from "@styles/components/VideoPlayer/Timestamp/index.module.scss";

const Timestamp: React.FC = () => {
  const { viewTimestamp } = useContext(Context);

  return (
    <div
      className={`${styles.timestamp} ${
        !viewTimestamp ? styles.timestamp__hidden : ""
      }`}
    >
      <Tabs
        tabs={[
          {
            text: "Add",
            content: <Add />,
          },
          {
            text: "Timestamps",
            content: <Timestamps />,
          },
          {
            text: "Create",
            content: <Create />,
          },
        ]}
      />
    </div>
  );
};

export default Timestamp;
