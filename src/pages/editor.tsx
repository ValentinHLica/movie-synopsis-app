import React, { ChangeEventHandler, useEffect, useState } from "react";

import Layout from "@components/Layout";
import VideoPlayer from "@components/VideoPlayer/index";
import DropBox from "@components/UI/DropBox";

import styles from "@styles/pages/editor.module.scss";
import { Input } from "@components/UI";

const { dialog } = window.require("@electron/remote");

const EditorPage: React.FC = () => {
  const [synopsis, setSynopsis] = useState<string | undefined>(undefined);
  const [video, setVideo] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (storedData && storedData !== "") {
      const { videoPath, videoSynopsis, videoTitle } = JSON.parse(
        storedData
      ) as {
        videoTitle?: string;
        videoSynopsis?: string;
        videoPath?: string;
      };

      if (videoTitle) {
        setTitle(videoTitle);
      }

      if (videoSynopsis) {
        setSynopsis(videoSynopsis);
      }

      if (videoPath) {
        setVideo(videoPath);
      }
    }
  }, []);

  return (
    <Layout>
      <div className={styles.editor}>
        {!video ? (
          <DropBox onClick={onClick} />
        ) : (
          <VideoPlayer video={video} title={title} synopsis={synopsis} />
        )}
      </div>
    </Layout>
  );
};

export default EditorPage;
