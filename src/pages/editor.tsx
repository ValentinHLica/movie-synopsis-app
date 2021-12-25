import React, { useState } from "react";

import VideoPlayer from "@components/VideoPlayer/index";
import DropBox from "@components/UI/DropBox";

import styles from "@styles/pages/editor.module.scss";
import { File } from "@interface/editor";

const { dialog } = window.require("@electron/remote");

const EditorPage: React.FC = () => {
  const [video, setVideo] = useState<string | undefined>(undefined);

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
            setVideo(file.path);
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

    setVideo(path.filePaths[0]);
  };

  return (
    <div className={styles.editor}>
      {!video ? (
        <DropBox onClick={onClick} onDrop={onDrop} onDragOver={onDragOver} />
      ) : (
        <VideoPlayer video={video} />
      )}
    </div>
  );
};

export default EditorPage;
