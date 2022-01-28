import React, { useContext, useEffect, useRef, useState } from "react";

import { Dropdown, Input } from "@ui";
import Context from "@context";
import { tempPath, cliPath, tempDataDir } from "@config/paths";

import {
  getVoices,
  listenVoice,
  copyFolderRecursiveSync,
} from "@utils/helpers";

const { existsSync, mkdirSync } = window.require("fs");

const VoiceChanger: React.FC = () => {
  const { customAudio } = useContext(Context);
  const [audioPath, setAudioPath] = useState<string | null>(null);

  const inputEl = useRef<HTMLInputElement>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voices, setVoices] = useState<string[]>([]);

  const loadVoices = async () => {
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
      copyFolderRecursiveSync(cliPath, tempPath);
    }

    let listOfVoices: string[];

    const balcon = localStorage.getItem("balcon");
    const bal4web = localStorage.getItem("bal4web");

    try {
      listOfVoices = await getVoices({
        customAudio,
        balcon,
        bal4web,
      });

      setVoices(listOfVoices);

      const voice = localStorage.getItem("voice");

      if (voice) {
        setSelectedVoice(voice);
      } else {
        setSelectedVoice(listOfVoices[0]);

        localStorage.setItem("voice", listOfVoices[0]);
      }
    } catch (error) {}
  };

  const onVoiceChange = (voice: string) => {
    localStorage.setItem("voice", voice);

    setSelectedVoice(voice);
  };

  const listenVoiceAudio = async () => {
    setAudioPath(null);

    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
      copyFolderRecursiveSync(cliPath, tempPath);
    }

    if (!existsSync(tempDataDir)) {
      mkdirSync(tempDataDir);
    }

    setAudioPath(
      await listenVoice({
        text:
          inputEl.current?.value !== ""
            ? inputEl.current?.value
            : "Hello World this is a test",
        customAudio,
      })
    );
  };

  useEffect(() => {
    loadVoices();

    // eslint-disable-next-line
  }, [customAudio]);

  return (
    <div>
      <Input placeholder="Enter text..." inputRef={inputEl} />

      {audioPath && <audio src={audioPath} autoPlay hidden />}

      <Dropdown
        size="sm"
        type="light"
        text={selectedVoice}
        items={voices.map((voice) => {
          return {
            text: voice,
            onClick: onVoiceChange.bind(this, voice),
          };
        })}
        onClick={listenVoiceAudio}
      />
    </div>
  );
};

export default VoiceChanger;
