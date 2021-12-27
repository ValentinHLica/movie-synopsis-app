import { createContext, useRef, useState } from "react";

import { TimeStamp } from "@interface/movie";

interface State {
  videoPath: string | null;
  setVideoPath: React.Dispatch<React.SetStateAction<string | null>>;
  videoEl: React.RefObject<HTMLVideoElement> | null;
  playerEl: React.RefObject<HTMLDivElement> | null;
  settings: boolean;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  viewTimestamp: boolean;
  setViewTimestamp: React.Dispatch<React.SetStateAction<boolean>>;
  mouseMove: boolean;
  setMouseMove: React.Dispatch<React.SetStateAction<boolean>>;
  addStamp: TimeStamp;
  setAddStamp: React.Dispatch<React.SetStateAction<TimeStamp>>;
  timestamps: TimeStamp[];
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStamp[]>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<State>({
  videoPath: null,
  setVideoPath: (arg) => null,
  videoEl: null,
  playerEl: null,
  settings: false,
  setSettings: (arg) => null,
  viewTimestamp: false,
  setViewTimestamp: (arg) => null,
  mouseMove: false,
  setMouseMove: (arg) => null,
  addStamp: {
    text: "",
    startTime: "",
  },
  setAddStamp: (arg) => null,
  timestamps: [],
  setTimestamps: (arg) => null,
  currentTime: 0,
  setCurrentTime: (arg) => null,
});

export const ContextProvider: React.FC = ({ children }) => {
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const playerEl = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<boolean>(false);
  const [viewTimestamp, setViewTimestamp] = useState<boolean>(false);
  const [mouseMove, setMouseMove] = useState<boolean>(false);
  const [addStamp, setAddStamp] = useState<TimeStamp>({
    text: "",
    startTime: "",
  });
  const [timestamps, setTimestamps] = useState<TimeStamp[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const context = {
    videoPath,
    setVideoPath,
    videoEl,
    playerEl,
    settings,
    setSettings,
    viewTimestamp,
    setViewTimestamp,
    mouseMove,
    setMouseMove,
    addStamp,
    setAddStamp,
    timestamps,
    setTimestamps,
    currentTime,
    setCurrentTime,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
