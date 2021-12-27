import React, { useContext } from "react";

import { File } from "@interface/editor";

import VideoPlayer from "@components/VideoPlayer/index";
import { DropBox } from "@ui";
import Context from "@components/Context";

import styles from "@styles/pages/editor.module.scss";

const { dialog } = window.require("@electron/remote");

const EditorPage: React.FC = () => {
  const { videoPath, setVideoPath } = useContext(Context);

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files as unknown as File[];

    if (files) {
      for (const file of files) {
        const allowedTypes = [
          "video/mp4",
          "video/mkv",
          "video/flv",
          "video/avi",
        ];

        for (const type of allowedTypes) {
          if (file.type === type) {
            setVideoPath(file.path);
          }
        }
      }
    }
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    const path = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        {
          name: "Movies",
          extensions: ["mkv", "avi", "mp4", "flv"],
        },
      ],
    });

    setVideoPath(path.filePaths[0]);
  };

  return (
    <div className={styles.editor}>
      {!videoPath ? (
        <DropBox onClick={onClick} onDrop={onDrop} onDragOver={onDragOver} />
      ) : (
        <VideoPlayer />
      )}
    </div>
  );
};

export default EditorPage;
