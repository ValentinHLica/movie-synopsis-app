export type TimeStamp = {
  text: string;
  startTime: string;
};

export type LocalTimeStamp = {
  title: string;
  date: Date;
  timestamps: TimeStamp[];
};

export type MovieData = {
  moviePath: string;
  timeStamps: TimeStamp[];
  exportPath: string;
  title: string;
  categories: string[];
  voice: string | null;
  cli: {
    ffprobe: string | null;
    ffmpeg: string | null;
    balcon: string | null;
    bal4web: string | null;
  };
  customAudio: boolean;
  audioTrimDuration: number;
  intro: string | null;
  outro: string | null;
  outroImage: string | null;
};
