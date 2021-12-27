import React, { useContext } from "react";

import moment from "moment";

import Stamp from "../Stamp";
import Context from "@components/Context";

const Add: React.FC = () => {
  const { addStamp, setAddStamp, currentTime, setTimestamps } =
    useContext(Context);

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
