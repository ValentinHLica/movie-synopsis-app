import React from "react";

import { TextArea, Input, Button } from "@ui";
import { BinIcon, PlusCircleIcon } from "@icon";

import styles from "@styles/components/VideoPlayer/stamp.module.scss";

type Props = {
  text: string;
  onChangeText: React.ChangeEventHandler<HTMLTextAreaElement>;
  time: string;
  onChangeTime: React.ChangeEventHandler<HTMLInputElement>;
  onAdd?: () => void;
  onRemove?: () => void;
};

const Stamp: React.FC<Props> = ({
  text,
  onChangeText,
  time,
  onChangeTime,
  onAdd,
  onRemove,
}) => {
  return (
    <div className={styles.stamp}>
      <TextArea
        onChange={onChangeText}
        value={text}
        placeholder="Synopsis text..."
      />

      <Input onChange={onChangeTime} value={time} placeholder="Timestamp..." />

      {onAdd && (
        <Button onClick={onAdd} size="sm" icon={<PlusCircleIcon />}>
          Add
        </Button>
      )}

      {onRemove && (
        <Button onClick={onRemove} type="danger" size="sm" icon={<BinIcon />}>
          Remove
        </Button>
      )}
    </div>
  );
};

export default Stamp;
