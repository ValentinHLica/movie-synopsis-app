import React, { useEffect, useState } from "react";

import { Button, Input } from "@ui";
import { FolderIcon } from "@icon";

const { dialog } = window.require("@electron/remote");

const CustomContent: React.FC = () => {
  const [intro, setIntro] = useState<string>("");
  const [outro, setOutro] = useState<string>("");
  const [outroImage, setOutroImage] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onChange: (type: "intro" | "outro", value: string) => void = (
    type,
    value
  ) => {
    if (type === "intro") {
      setIntro(value);
    } else {
      setOutro(value);
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
      setOutro(savedOutroImage);
    }
  }, []);

  return (
    <>
      <li>
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
        <h5>Outro Image</h5>

        <Input readOnly placeholder={outroImage ?? "..."} />

        <Button onClick={updatePath} size="sm" icon={<FolderIcon />}>
          Change
        </Button>
      </li>
    </>
  );
};

export default CustomContent;
