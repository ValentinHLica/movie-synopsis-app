import React, { useEffect, useRef, useState } from "react";

import { Button, Dropdown, TextArea } from "@ui";
import { SoundOnIcon } from "@icon";
import { getVoices, listenVoice } from "@utils/helpers";

import styles from "@styles/components/VideoPlayer/Settings/voice.module.scss";

const VoiceChanger: React.FC = () => {
  const textarea = useRef<HTMLTextAreaElement>(null);
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
            loadVoices();
          }}
        />

        <Button
          size="sm"
          icon={<SoundOnIcon />}
          onClick={() => {
            listenVoice(textarea.current?.value);
          }}
        >
          Speak
        </Button>
      </div>

      <TextArea placeholder="Enter text..." elementRef={textarea} />
    </div>
  );
};

export default VoiceChanger;
