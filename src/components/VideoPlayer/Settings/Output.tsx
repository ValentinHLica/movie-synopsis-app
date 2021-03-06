import React, { useEffect, useState } from "react";

import { Button, Input } from "@ui";

const { dialog } = window.require("@electron/remote");
const { existsSync } = window.require("fs");

const OutputVideo: React.FC = () => {
  const [outputPath, setOutputPath] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const getPath = async () => {
    setIsClicked(true);

    const path = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    setIsClicked(false);

    return path.filePaths[0];
  };

  const updatePath = async () => {
    if (isClicked) {
      return true;
    }

    const path = await getPath();

    if (path) {
      setOutputPath(path);

      localStorage.setItem("output-path", path);
    } else {
      setOutputPath(null);

      localStorage.removeItem("output-path");
    }
  };

  useEffect(() => {
    const outputPath = localStorage.getItem("output-path");

    if (outputPath) {
      if (existsSync(outputPath)) {
        setOutputPath(outputPath);
      }
    }
  }, []);

  return (
    <div>
      <Input readOnly placeholder={outputPath ?? "..."} />

      <Button onClick={updatePath}>Change</Button>
    </div>
  );
};

export default OutputVideo;
