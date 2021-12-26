import React from "react";

import { Tabs } from "@ui";
import Create from "./Create";
import Timestamps from "./Timestamps";
import Add from "./Add";

import { TimeStamp as TimeStampType } from "@interface/movie";

import styles from "@styles/components/VideoPlayer/Timestamp/index.module.scss";

type Props = {
  addStamp: TimeStampType;
  setAddStamp: React.Dispatch<React.SetStateAction<TimeStampType>>;
  timestamps: TimeStampType[];
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStampType[]>>;
  visible: boolean;
  videoPath: string;
  currentTime: number;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setViewTimestamp: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timestamp: React.FC<Props> = ({
  addStamp,
  setAddStamp,
  timestamps,
  setTimestamps,
  visible,
  videoPath,
  currentTime,
  setSettings,
  setViewTimestamp,
}) => {
  return (
    <div
      className={`${styles.timestamp} ${
        !visible ? styles.timestamp__hidden : ""
      }`}
    >
      <Tabs
        tabs={[
          {
            text: "Add",
            content: (
              <Add
                addStamp={addStamp}
                setAddStamp={setAddStamp}
                currentTime={currentTime}
                setTimestamps={setTimestamps}
              />
            ),
          },
          {
            text: "Timestamps",
            content: (
              <Timestamps
                timestamps={timestamps}
                setTimestamps={setTimestamps}
              />
            ),
          },
          {
            text: "Create",
            content: (
              <Create
                videoPath={videoPath}
                timestamps={timestamps}
                setSettings={setSettings}
                setViewTimestamp={setViewTimestamp}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Timestamp;
