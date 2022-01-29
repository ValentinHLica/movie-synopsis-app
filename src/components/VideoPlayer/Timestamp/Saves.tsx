import React, { useContext, useEffect, useState } from "react";

import moment from "moment";

import { LocalTimeStamp } from "@interface/movie";
import Context from "@context";
import { CloseIcon, SubtitleIcon, WarningIcon } from "@icon";

import styles from "@styles/components/VideoPlayer/Timestamp/saves.module.scss";

type SaveCardProps = {
  details: LocalTimeStamp;
  index: number;
  setLocalSaves: React.Dispatch<React.SetStateAction<LocalTimeStamp[]>>;
};

const SavedTimeStampCard: React.FC<SaveCardProps> = ({
  details,
  index,
  setLocalSaves,
}) => {
  const { setTimestamps } = useContext(Context);

  const { title, date, timestamps } = details;

  const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setTimestamps(timestamps);
  };

  const onRemove = () => {
    setLocalSaves((prevState) => {
      const newSaves = prevState.filter((_, i) => i !== index);

      localStorage.setItem("saves", JSON.stringify(newSaves));

      return newSaves;
    });
  };

  const fileName = title
    .split("\\")
    [title.split("\\").length - 1].replace(".mp4", "");

  return (
    <div className={styles.save__item} onDoubleClick={onDoubleClick}>
      <div className={styles.remove} onClick={onRemove}>
        <CloseIcon />
      </div>

      <div className={styles.item__details}>
        <SubtitleIcon />
        <h3>{fileName}</h3>
        <h4>{moment(date).format("MMMM Do YYYY")}</h4>
      </div>
    </div>
  );
};

const Saves: React.FC = () => {
  const [localSaves, setLocalSaves] = useState<LocalTimeStamp[]>([]);

  const getSaves = () => {
    const saves = localStorage.getItem("saves");

    if (saves) {
      setLocalSaves(JSON.parse(saves) as LocalTimeStamp[]);
    }
  };

  useEffect(() => {
    getSaves();
  }, []);

  return (
    <div className={styles.saves}>
      {localSaves.length > 0 ? (
        <ul className={styles.saves__list}>
          {localSaves.map((timestamp, index) => (
            <SavedTimeStampCard
              details={timestamp}
              index={index}
              setLocalSaves={setLocalSaves}
              key={index}
            />
          ))}
        </ul>
      ) : (
        <h4>
          <WarningIcon /> No Saved Timestamps
        </h4>
      )}
    </div>
  );
};

export default Saves;
