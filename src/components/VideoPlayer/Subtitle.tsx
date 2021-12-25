import React from "react";
import moment from "moment";

import { TimeStamp } from "@interface/movie";

import styles from "@styles/components/VideoPlayer/subtitle.module.scss";

type Props = {
  timestamps: TimeStamp[];
  currentTime: number;
};

const Subtitle: React.FC<Props> = ({ timestamps, currentTime }) => {
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
