import React, { useEffect, useState } from "react";

import { Button, Input } from "@ui";
import { ImageIcon, StartIcon, TimerIcon } from "@icon";

const { dialog } = window.require("@electron/remote");

const CustomContent: React.FC = () => {
  const [intro, setIntro] = useState<string>("");
  const [outro, setOutro] = useState<string>("");
  const [outroImage, setOutroImage] = useState<string | null>(null);
  const [trimDuration, setTrimDuration] = useState<string>("0");
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onChange: (
    type: "intro" | "outro" | "trim-duration",
    value: string
  ) => void = (type, value) => {
    switch (type) {
      case "intro":
        setIntro(value);

        break;

      case "outro":
        setOutro(value);
        break;

      case "trim-duration":
        setTrimDuration(value);
        break;
    }

    localStorage.setItem(type, value);
  };

  const getPath = async () => {
    setIsClicked(true);

    const path = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png", "jpg"] }],
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
      setOutroImage(path);

      localStorage.setItem("outro-image", path);
    } else {
      setOutroImage(null);

      localStorage.removeItem("outro-image");
    }
  };

  useEffect(() => {
    const savedIntro = localStorage.getItem("intro");
    if (savedIntro) {
      setIntro(savedIntro);
    }

    const savedOutro = localStorage.getItem("outro");
    if (savedOutro) {
      setOutro(savedOutro);
    }

    const savedOutroImage = localStorage.getItem("outro-image");
    if (savedOutroImage) {
      setOutroImage(savedOutroImage);
    }

    const trimDurationLocal = localStorage.getItem("trim-duration");
    if (trimDurationLocal) {
      setTrimDuration(trimDurationLocal);
    }
  }, []);

  return (
    <>
      <li>
        <StartIcon />

        <h5>Intro</h5>

        <Input
          placeholder="Intro text..."
          value={intro}
          onChange={(e) => {
            onChange("intro", e.target.value);
          }}
        />
      </li>

      <li>
        <StartIcon />

        <h5>Outro</h5>

        <Input
          placeholder="Outro text..."
          value={outro}
          onChange={(e) => {
            onChange("outro", e.target.value);
          }}
        />
      </li>

      <li>
        <TimerIcon />

        <h5>Time remove</h5>

        <Input
          placeholder="Outro text..."
          value={trimDuration}
          type="number"
          onChange={(e) => {
            onChange("trim-duration", e.target.value);
          }}
        />
      </li>

      <li>
        <ImageIcon />

        <h5>Outro Image</h5>

        <Input readOnly placeholder={outroImage ?? "..."} />

        <Button onClick={updatePath}>Change</Button>
      </li>
    </>
  );
};

export default CustomContent;
