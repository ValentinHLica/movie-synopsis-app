import React from "react";

// import FileUploadIcon from "@mui/icons-material/FileUpload";
import { UploadIcon } from "@icon";
import styles from "@styles/components/UI/dropbox.module.scss";

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
};

const DropBox: React.FC<Props> = ({ onDrop, onClick, onDragOver }) => {
  return (
    <div
      className={styles.dropbox}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onClick}
    >
      <UploadIcon />
      Please select a movie
    </div>
  );
};

export default DropBox;
