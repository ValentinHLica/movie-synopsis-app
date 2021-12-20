import { join } from "path";

import { tempPath, renderPath, cliPath } from "@config/paths";

import { copyFolderRecursiveSync, logger } from "@utils/helpers";
import { TimeStamp } from "@interface/movie";

const { execFile } = window.require("child_process");
const { writeFileSync, existsSync, mkdirSync } = window.require("fs");

/**
 * Generate single comment tree images
 * @param title Post Title
 * @param comments Comments List
 * @param path Path to export final output
 */
export const createMovie = async (
  videoPath: string,
  timeStamps: TimeStamp[],
  exportPath: string
): Promise<any> => {
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
      })
    );

    return new Promise(async (resolve) => {
      logger("Rendering Video", "action");

      const args = [`MOVIE=${postPath}`, `VOICE=ScanSoft`];

      await execFile(renderPath, args, (error: any, stdout: string) => {
        if (error) {
          logger("Video couldn't render successfully", "error");
          throw error;
        }

        logger("Video rendered successfully", "success");

        resolve(stdout);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
