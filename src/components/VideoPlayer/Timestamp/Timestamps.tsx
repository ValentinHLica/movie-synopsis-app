import React, { useContext, useEffect, useRef, useState } from "react";

import { Button } from "@ui";
import { SaveIcon } from "@icon";
import Stamp from "../Stamp";
import Context from "@context";
import { LocalTimeStamp, TimeStamp } from "@interface/movie";

import styles from "@styles/components/VideoPlayer/Timestamp/timestamps.module.scss";

type StampItemProps = {
  details: TimeStamp;
  index: number;
  onChange: (value: string, key: "text" | "startTime", index: number) => void;
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStamp[]>>;
  videoEl: React.RefObject<HTMLVideoElement> | null;
};

const StampItem: React.FC<StampItemProps> = ({
  details,
  index,
  onChange,
  setTimestamps,
  videoEl,
}) => {
  const [toolTip, setToolTip] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const { text, startTime } = details;

  const onDoubleClick = () => {
    if (videoEl && videoEl.current) {
      const a = startTime.split(":");
      const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      videoEl.current.currentTime = seconds;
    }
  };

  useEffect(() => {
    const handleVisibility = (event: any) => {
      if (container.current && !container.current.contains(event.target)) {
        setToolTip(false);
      }
    };

    window.addEventListener("click", handleVisibility);
    return () => {
      window.removeEventListener("click", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className={`${styles.timestamp__item} ${
        toolTip ? styles.timestamp__item__current : ""
      }`}
      onClick={() => {
        setToolTip(true);
      }}
      onDoubleClick={onDoubleClick}
      ref={container}
    >
      {text}

      <Stamp
        className={`${styles.item__controls} ${
          toolTip ? styles.item__controls__visible : ""
        }`}
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
    </span>
  );
};

const Timestamps: React.FC = () => {
  const { timestamps, setTimestamps, videoEl } = useContext(Context);

  if (!(timestamps.length > 0)) {
    return <h4>No Time Stamps</h4>;
  }

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

  const saveProgress = () => {
    const saves = localStorage.getItem("saves");
    if (videoEl && videoEl.current) {
      const newSave: LocalTimeStamp = {
        title: videoEl.current.getAttribute("src") as string,
        timestamps,
        date: new Date(),
      };

      if (saves) {
        const parsedSaves = JSON.parse(saves) as LocalTimeStamp[];

        localStorage.setItem(
          "saves",
          JSON.stringify([...parsedSaves, newSave])
        );
      } else {
        localStorage.setItem("saves", JSON.stringify([newSave]));
      }
    }
  };

  return (
    <div className={styles.timestamps}>
      <div className={styles.content}>
        {timestamps.map((timestamp, index) => (
          <StampItem
            details={timestamp}
            onChange={onChange}
            index={index}
            setTimestamps={setTimestamps}
            videoEl={videoEl}
            key={index}
          />
        ))}
      </div>

      <Button type="warning" icon={<SaveIcon />} onClick={saveProgress}>
        Save Progress
      </Button>
    </div>
  );
};

export default Timestamps;
