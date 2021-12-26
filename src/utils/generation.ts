import { join } from "path";

import { tempPath, renderPath, cliPath } from "@config/paths";

import { copyFolderRecursiveSync, logger } from "@utils/helpers";
import { TimeStamp } from "@interface/movie";

const { execFile } = window.require("child_process");
const { writeFileSync, existsSync, mkdirSync } = window.require("fs");

type CreateVideo = (args: {
  videoPath: string;
  timeStamps: TimeStamp[];
  exportPath: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setTotalProgress: React.Dispatch<React.SetStateAction<number>>;
  voice: string;
  title: string;
  categories: string[];
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
}) => {
  try {
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
    }

    copyFolderRecursiveSync(cliPath, tempPath);

    const postPath = join(tempPath, "movie.json");

    writeFileSync(
      postPath,
      JSON.stringify({
        moviePath: videoPath,
        timeStamps,
        exportPath,
        title,
        categories,
      })
    );

    return new Promise(async (resolve) => {
      logger("Rendering Video", "action");

      const args = [`MOVIE=${postPath}`, `VOICE=${voice}`];

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
