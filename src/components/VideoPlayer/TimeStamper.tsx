import React, { useState } from "react";

import { TextArea, Tabs } from "@ui";
import TimeStamp from "./Timestamp";

import styles from "@styles/components/VideoPlayer/timestamp.module.scss";

type Props = {
  synopsis?: string;
  videoPath: string;
  title?: string;
  video: React.RefObject<HTMLVideoElement>;
};

const TimeStamper: React.FC<Props> = ({
  synopsis,
  videoPath,
  title,
  video,
}) => {
  const [movieSynopsis, setMovieSynopsis] = useState(synopsis);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;

    const storedData = localStorage.getItem("data") as {
      videoTitle?: string;
      videoSynopsis?: string;
      videoPath?: string;
    };

    let newData = storedData
      ? {
          ...storedData,
          videoPath,
        }
      : {
          videoPath,
          videoSynopsis: value,
          videoTitle: title,
        };

    localStorage.setItem("data", JSON.stringify(newData));

    setMovieSynopsis(value);
  };

  return (
    <div className={styles.timestamp}>
      <Tabs
        tabs={[
          {
            text: "Timestamp",
            content: <TimeStamp />,
          },
          {
            text: "Synopsis",
            content: (
              <TextArea
                value={movieSynopsis}
                placeholder="Movie Synopsis..."
                onChange={onChange}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default TimeStamper;
