import React, { useState } from "react";

import VideoPlayer from "@components/VideoPlayer/index";
import DropBox from "@components/UI/DropBox";

import styles from "@styles/pages/editor.module.scss";

const { dialog } = window.require("@electron/remote");

const EditorPage: React.FC = () => {
  const [video, setVideo] = useState<string | undefined>(undefined);

  const onClick: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    const path = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        {
          name: "Movies",
          extensions: ["mkv", "avi", "mp4"],
        },
      ],
    });

    setVideo(path.filePaths[0]);
  };

  return (
    <div className={styles.editor}>
      {!video ? <DropBox onClick={onClick} /> : <VideoPlayer video={video} />}
    </div>
  );
};

export default EditorPage;
