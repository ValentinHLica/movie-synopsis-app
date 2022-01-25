import React, { useEffect, useRef, useState } from "react";

import { Dropdown, Input } from "@ui";

import { getVoices, listenVoice } from "@utils/helpers";

const VoiceChanger: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voices, setVoices] = useState<string[]>([]);

  const loadVoices = async () => {
    let listOfVoices: string[];

    try {
      listOfVoices = await getVoices();

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

  useEffect(() => {
    loadVoices();
  }, []);

  return (
    <div>
      <Input placeholder="Enter text..." inputRef={inputEl} />

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
        onClick={() => {
          listenVoice(inputEl.current?.value);
        }}
      />
    </div>
  );
};

export default VoiceChanger;
