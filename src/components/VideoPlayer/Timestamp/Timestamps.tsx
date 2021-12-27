import React, { useContext } from "react";

import Stamp from "../Stamp";
import Context from "@components/Context";

import styles from "@styles/components/VideoPlayer/Timestamp/timestamps.module.scss";

const Timestamps: React.FC = () => {
  const { timestamps, setTimestamps } = useContext(Context);

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
