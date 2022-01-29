import { createContext, useEffect, useRef, useState } from "react";

import { TimeStamp } from "@interface/movie";
import { Theme } from "@interface/UI/theme";

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
  customAudio: boolean;
  setCustomAudio: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  createLoading: boolean;
  setCreateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  totalProgress: number;
  setTotalProgress: React.Dispatch<React.SetStateAction<number>>;
  currentTimer: number;
  setCurrentTimer: React.Dispatch<React.SetStateAction<number>>;
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
  customAudio: false,
  setCustomAudio: (arg) => null,
  theme: false,
  setTheme: (arg) => null,
  createLoading: false,
  setCreateLoading: (arg) => null,
  progress: 0,
  setProgress: (arg) => null,
  totalProgress: 0,
  setTotalProgress: (arg) => null,
  currentTimer: 0,
  setCurrentTimer: (arg) => null,
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
  const [customAudio, setCustomAudio] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [currentTimer, setCurrentTimer] = useState<number>(0);
  const firstLoad = useRef<boolean>(false);

  useEffect(() => {
    if (firstLoad.current) {
      localStorage.setItem("theme", theme ? "light" : "dark");

      const body = document.querySelector("body");

      if (body) {
        body.className = theme ? "light" : "dark";
      }
    }
  }, [theme]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    if (!localTheme) {
      localStorage.setItem("theme", "light");
    } else {
      setTheme((localTheme as Theme) === "light");
    }

    firstLoad.current = true;
  }, []);

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
    customAudio,
    setCustomAudio,
    theme,
    setTheme,
    createLoading,
    setCreateLoading,
    progress,
    setProgress,
    totalProgress,
    setTotalProgress,
    currentTimer,
    setCurrentTimer,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
