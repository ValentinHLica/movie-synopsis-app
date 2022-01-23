import React from "react";

import { TextArea, Input, Button } from "@ui";
import { BinIcon, AddIcon } from "@icon";

import styles from "@styles/components/VideoPlayer/stamp.module.scss";

type Props = {
  text: string;
  onChangeText: React.ChangeEventHandler<HTMLTextAreaElement>;
  time: string;
  onChangeTime: React.ChangeEventHandler<HTMLInputElement>;
  onAdd?: () => void;
  onRemove?: () => void;
  className?: string;
};

const Stamp: React.FC<Props> = ({
  text,
  onChangeText,
  time,
  onChangeTime,
  onAdd,
  onRemove,
  className = "",
}) => {
  return (
    <div className={`${styles.stamp} ${className}`}>
      <TextArea
        onChange={onChangeText}
        value={text}
        placeholder="Synopsis text..."
      />

      <Input onChange={onChangeTime} value={time} placeholder="Timestamp..." />

      {onAdd && (
        <Button onClick={onAdd} size="sm" icon={<AddIcon />}>
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
