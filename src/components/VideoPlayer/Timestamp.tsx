import React, { useEffect, useRef, useState } from "react";

import moment from "moment";

import { Button, Progress, Tabs } from "@ui";
import { SaveIcon } from "@icon";
import Stamp from "./Stamp";

import { TimeStamp as TimeStampType } from "@interface/movie";
import { createMovie } from "@utils/generation";

import styles from "@styles/components/VideoPlayer/timestamp.module.scss";

type Props = {
  addStamp: TimeStampType;
  setAddStamp: React.Dispatch<React.SetStateAction<TimeStampType>>;
  timestamps: TimeStampType[];
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStampType[]>>;
  visible: boolean;
  videoPath: string;
  currentTime: number;
};

const Timestamp: React.FC<Props> = ({
  addStamp,
  setAddStamp,
  timestamps,
  setTimestamps,
  visible,
  videoPath,
  currentTime,
}) => {
  const startTime = useRef<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [currentTimer, setCurrentTimer] = useState<Date>(new Date());
  const [progress, setProgress] = useState<number>(0);

  const onAdd = () => {
    if (addStamp.text !== "" && addStamp.startTime !== "") {
      setTimestamps((prevValue) => prevValue.concat(addStamp));

      setAddStamp((prevState) => ({
        ...prevState,
        text: "",
      }));
    }
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

  const createVideo = async () => {
    setLoading(true);

    try {
      await createMovie({
        videoPath,
        timeStamps: timestamps,
        exportPath: "C:\\Users\\licav\\Desktop",
        setProgress,
        setTotalProgress,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentTimer(new Date());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [loading]);

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
              <Stamp
                text={addStamp.text}
                onChangeText={(e) => {
                  setAddStamp((prevValue) => ({
                    ...prevValue,
                    text: e.target.value,
                  }));
                }}
                time={moment.utc(currentTime * 1000).format("HH:mm:ss")}
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
                <ul className={styles.timestamps}>
                  {timestamps.map((stamp, index) => {
                    const { text, startTime } = stamp;

                    return (
                      <li key={index}>
                        <h3>.{index}</h3>

                        <Stamp
                          text={text}
                          onChangeText={(e) => {
                            onChange(e.target.value, "text", index);
                          }}
                          time={startTime}
                          onChangeTime={(e) => {
                            onChange(e.target.value, "startTime", index);
                          }}
                          onRemove={() => {
                            setTimestamps((prevState) =>
                              prevState.filter((_, idx) => idx !== index)
                            );
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h4>No Time Stamps</h4>
              ),
          },
          {
            text: "Create",
            content: (
              <div className={styles.create}>
                <Button
                  onClick={createVideo}
                  className={styles.create_btn}
                  loading={loading}
                  type={error ? "danger" : "warning"}
                  icon={<SaveIcon />}
                  disabled={timestamps.length === 0}
                >
                  Create Video
                </Button>
                <div>
                  <h5>{`Elapsed Time: ${moment
                    .utc(currentTimer.getTime() - startTime.current.getTime())
                    .format("HH:mm:ss")}`}</h5>

                  <Progress
                    max={totalProgress}
                    value={loading ? progress : totalProgress}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Timestamp;
