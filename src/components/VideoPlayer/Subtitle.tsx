import React, { useContext } from "react";

import moment from "moment";

import Context from "@components/Context";

import styles from "@styles/components/VideoPlayer/subtitle.module.scss";

const Subtitle: React.FC = () => {
  const { timestamps, currentTime } = useContext(Context);

  if (timestamps.length > 0) {
    const time = moment.utc(currentTime * 1000).format("HH:mm:ss");
    const availableTimes = timestamps.filter((item) => item.startTime === time);

    if (availableTimes.length === 0) {
      return null;
    }

    return <div className={styles.timestamp}>{availableTimes[0].text}</div>;
  }

  return null;
};

export default Subtitle;
