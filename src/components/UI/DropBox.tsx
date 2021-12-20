import React from "react";

import { LinkIcon } from "@icon";

import styles from "@styles/components/UI/dropbox.module.scss";

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
};

const DropBox: React.FC<Props> = ({ onDrop, onClick }) => {
  return (
    <div className={styles.dropbox} onDrop={onDrop} onClick={onClick}>
      <LinkIcon />
      Please select a movie
    </div>
  );
};

export default DropBox;
