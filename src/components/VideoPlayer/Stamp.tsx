import React from "react";

import { TextArea, Input, Button } from "@ui";

import styles from "@styles/components/VideoPlayer/stamp.module.scss";

type Props = {
  text: string;
  onChangeText: React.ChangeEventHandler<HTMLTextAreaElement>;
  time: string;
  onChangeTime: React.ChangeEventHandler<HTMLInputElement>;
  onAdd?: () => void;
};

const Stamp: React.FC<Props> = ({
  text,
  onChangeText,
  time,
  onChangeTime,
  onAdd,
}) => {
  return (
    <div className={styles.stamp}>
      <TextArea
        onChange={onChangeText}
        value={text}
        placeholder="Synopsis text..."
      />
      <Input onChange={onChangeTime} value={time} placeholder="Timestamp..." />
      {onAdd && <Button onClick={onAdd}>Add</Button>}
    </div>
  );
};

export default Stamp;
