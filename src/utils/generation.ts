import { join } from "path";

import { tempPath, renderPath, cliPath } from "@config/paths";

import { copyFolderRecursiveSync, logger } from "@utils/helpers";
import { MovieData, TimeStamp } from "@interface/movie";

const { execFile } = window.require("child_process");
const { writeFileSync, existsSync, mkdirSync } = window.require("fs");

type CreateVideo = (args: {
  videoPath: string;
  timeStamps: TimeStamp[];
  exportPath: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setTotalProgress: React.Dispatch<React.SetStateAction<number>>;
  voice: string | null;
  title: string;
  categories: string[];
  customAudio: "audio" | "video" | null;
}) => Promise<any>;

/**
 * Generate single comment tree images
 * @param title Post Title
 * @param comments Comments List
 * @param path Path to export final output
 */
export const createMovie: CreateVideo = async ({
  videoPath,
  timeStamps,
  exportPath,
  setProgress,
  setTotalProgress,
  voice,
  title,
  categories,
  customAudio,
}) => {
  try {
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
    }

    copyFolderRecursiveSync(cliPath, tempPath);

    const movieConfigPath = join(tempPath, "movie.json");

    const intro = localStorage.getItem("intro");
    const outro = localStorage.getItem("outro");
    const outroImage = localStorage.getItem("outro-image");
    const ffmpeg = localStorage.getItem("ffmpeg");
    const ffprobe = localStorage.getItem("ffprobe");
    const balcon = localStorage.getItem("balcon");

    const movieConfig: MovieData = {
      moviePath: videoPath,
      timeStamps,
      exportPath,
      title,
      categories,
      voice,
      cli: {
        ffmpeg: ffmpeg && ffmpeg !== "" ? ffmpeg : null,
        ffprobe: ffprobe && ffprobe !== "" ? ffprobe : null,
        balcon: balcon && balcon !== "" ? balcon : null,
      },
      audioTrimDuration: 0.8,
      customAudio,
      intro: intro && intro !== "" ? intro : null,
      outro: outro && outro !== "" ? outro : null,
      outroImage: outroImage && outroImage !== "" ? outroImage : null,
    };

    writeFileSync(movieConfigPath, JSON.stringify(movieConfig));

    return new Promise(async (resolve) => {
      logger("Rendering Video", "action");

      const args = [`MOVIE=${movieConfigPath}`];

      await execFile(renderPath, args, (error: any, stdout: string) => {
        if (error) {
          logger("Video couldn't render successfully", "error");
          throw error;
        }

        logger("Video rendered successfully", "success");

        resolve(stdout);
      }).stdout.on("data", (data: string) => {
        if (data.includes("process-count=")) {
          setTotalProgress((prevState) => {
            if (prevState !== 0) {
              return prevState;
            }

            return parseInt(data.split("=")[1]);
          });
        }

        if (data.includes("-generated")) {
          setProgress((prevState) => {
            return prevState + 1;
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
