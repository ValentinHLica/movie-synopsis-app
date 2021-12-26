import React from "react";

import moment from "moment";

import { TimeStamp } from "@interface/movie";

import Stamp from "../Stamp";

type Props = {
  addStamp: TimeStamp;
  setAddStamp: React.Dispatch<React.SetStateAction<TimeStamp>>;
  currentTime: number;
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStamp[]>>;
};

const Add: React.FC<Props> = ({
  addStamp,
  setAddStamp,
  currentTime,
  setTimestamps,
}) => {
  const onAdd = () => {
    if (addStamp.text !== "" && addStamp.startTime !== "") {
      setTimestamps((prevValue) => prevValue.concat(addStamp));

      setAddStamp((prevState) => ({
        ...prevState,
        text: "",
      }));
    }
  };

  return (
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
  );
};

export default Add;
