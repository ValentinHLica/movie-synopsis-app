import React from "react";

import { TimeStamp } from "@interface/movie";

import Stamp from "../Stamp";

import styles from "@styles/components/VideoPlayer/Timestamp/timestamps.module.scss";

type Props = {
  timestamps: TimeStamp[];
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStamp[]>>;
};

const Timestamps: React.FC<Props> = ({ timestamps, setTimestamps }) => {
  if (timestamps.length > 0) {
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

    return (
      <ul className={styles.timestamps}>
        {timestamps.map((stamp, index) => {
          const { text, startTime } = stamp;

          return (
            <li key={index}>
              <h3>{index}.</h3>

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
    );
  }

  return <h4>No Time Stamps</h4>;
};

export default Timestamps;
