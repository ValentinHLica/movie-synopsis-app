import React from "react";

import { Button, Tabs, TextArea } from "@ui";

import { TimeStamp as TimeStampType } from "@interface/movie";

import Stamp from "./Stamp";

import styles from "@styles/components/VideoPlayer/timestamp.module.scss";
import { createMovie } from "@utils/generation";

type Props = {
  addStamp: TimeStampType;
  setAddStamp: React.Dispatch<React.SetStateAction<TimeStampType>>;
  timestamps: TimeStampType[];
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStampType[]>>;
  visible: boolean;
  script: string;
  setScript: React.Dispatch<React.SetStateAction<string>>;
  videoPath: string;
};

const Timestamp: React.FC<Props> = ({
  addStamp,
  setAddStamp,
  timestamps,
  setTimestamps,
  visible,
  script,
  setScript,
  videoPath,
}) => {
  const onAdd = () => {
    // setTimestamps((prevValue) => prevValue.concat(addStamp));

    setTimestamps((prevState) =>
      prevState.map((item) => {
        if (item.text === addStamp.text) {
          return {
            ...item,
            startTime: addStamp.startTime,
          };
        }

        return item;
      })
    );

    setAddStamp({
      text: "",
      startTime: "",
    });
  };

  const onChange = (
    value: string,
    key: "text" | "startTime",
    index: number
  ) => {
    setTimestamps((prevValue) => {
      return prevValue.map((item, idx) => {
        if (index === idx) {
          return {
            ...item,
            [key]: value,
          };
        }

        return item;
      });
    });
  };

  const createVideo = () => {
    createMovie(videoPath, timestamps, "C:\\Users\\licav\\Desktop");
  };

  return (
    <div
      className={`${styles.timestamp} ${
        !visible ? styles.timestamp__hidden : ""
      }`}
    >
      <Tabs
        timestamps={timestamps}
        tabs={[
          {
            text: "Add",
            content: (
              <Stamp
                text={addStamp.text}
                onChangeText={(e) => {
                  setAddStamp((prevValue) => ({
                    ...prevValue,
                    text: e.target.value,
                  }));
                }}
                time={addStamp.startTime}
                onChangeTime={(e) => {
                  setAddStamp((prevValue) => ({
                    ...prevValue,
                    startTime: e.target.value,
                  }));
                }}
                onAdd={onAdd}
              />
            ),
          },
          {
            text: "Timestamps",
            content:
              timestamps.length > 0 ? (
                <div>
                  <Button onClick={createVideo}>Create Video</Button>

                  <ul className={styles.timestamps}>
                    {timestamps.map((stamp, index) => {
                      const { text, startTime } = stamp;

                      return (
                        <li key={index}>
                          <Stamp
                            text={text}
                            onChangeText={(e) => {
                              onChange(e.target.value, "text", index);
                            }}
                            time={startTime}
                            onChangeTime={(e) => {
                              onChange(e.target.value, "startTime", index);
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <h4>No Time Stamps</h4>
              ),
          },
          {
            text: "Script",
            content: (
              <TextArea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Movie Script..."
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Timestamp;
