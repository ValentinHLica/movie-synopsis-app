import React, { useContext } from "react";

import { Tabs } from "@ui";
import { AddIcon, SubtitleIcon, SaveIcon, MovieIcon } from "@icon";
import Context from "@context";
import Create from "./Create";
import Timestamps from "./Timestamps";
import Add from "./Add";
import Saves from "./Saves";

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
            text: (
              <>
                <AddIcon /> Add
              </>
            ),
            content: <Add />,
          },
          {
            text: (
              <>
                <SubtitleIcon /> Timestamps
              </>
            ),
            content: <Timestamps />,
          },
          {
            text: (
              <>
                <MovieIcon /> Create
              </>
            ),
            content: <Create />,
          },
          {
            text: (
              <>
                <SaveIcon /> Saves
              </>
            ),
            content: <Saves />,
          },
        ]}
      />
    </div>
  );
};

export default Timestamp;
