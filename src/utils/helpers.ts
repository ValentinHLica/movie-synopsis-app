import { tempDataDir } from "@config/paths";

const {
  mkdirSync,
  existsSync,
  readdirSync,
  rmdirSync,
  unlinkSync,
  lstatSync,
  writeFileSync,
  readFileSync,
  // statSync,
} = window.require("fs");
const { join, basename } = window.require("path");
const { execSync } = window.require("child_process");

/**
 * Logger handler for action, success, error
 * @param {string} message Message to display to consol
 * @param {string} type Message type
 */

type LogType = "success" | "action" | "error";

export const logger = (message: string, type: LogType) => {
  const selectedColor = {
    success: "10b981",
    action: "3b82f6",
    error: "ef4444",
    fallback: "6b7280",
  };

  console.log(`%c${message}`, `color: #${selectedColor[type]}`);
};

/**
 * Create Random String
 * @param {number} size
 * @returns
 */
export const createRandomString = (size: number) =>
  (Math.random() + 1).toString(36).substring(size || 7);

/**
 * List all files and folders inside folder
 * @param path Folder path
 * @returns List of files and folders inside folder
 */
export const getFolders = (path: string | null): string[] => {
  const files: string[] = readdirSync(path) ?? [];

  const filesList = [];

  for (const file of files) {
    const index = parseInt(file.split("-")[0], 10);
    filesList[index] = file;
  }

  return filesList;
};

/**
 * Roundup number to 1k, 1M ...
 * @param number Number to Roundup
 * @returns Rounded number
 */
export const roundUp = (number: number): string => {
  const newStr = ("" + number)
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g) as string[];

  return `${newStr[newStr.length - 1].split("").reverse().join("")}${
    " kmgtpe"[newStr.length - 1]
  }`;
};

/**
 * Convert sentence to time
 * @param sentence Sentence to convert number
 */
export const countWords = (sentence: string): number => {
  const words = sentence.split(" ");
  return parseFloat((words.length / 170).toFixed(1).replace(".0", ""));
};

/**
 * Delete Folder with its contents
 * @param path Folder path
 */
export const deleteFolder = (path: string) => {
  if (existsSync(path)) {
    readdirSync(path).forEach((file: string) => {
      const curPath = join(path, file);
      if (lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
};

// Copy files
const copyFileSync = (source: string, target: string) => {
  let targetFile = target;

  if (existsSync(target)) {
    if (lstatSync(target).isDirectory()) {
      targetFile = join(target, basename(source));
    }
  }

  writeFileSync(targetFile, readFileSync(source));
};

// Copy dir
export const copyFolderRecursiveSync = (source: string, target: string) => {
  var files = [];

  // Check if folder needs to be created or integrated
  var targetFolder = join(target, basename(source));
  if (!existsSync(targetFolder)) {
    mkdirSync(targetFolder);
  }

  // Copy
  if (lstatSync(source).isDirectory()) {
    files = readdirSync(source);
    files.forEach(function (file: string) {
      var curSource = join(source, file);
      if (lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};

/**
 * Generate array of sentences from Script
 * @param {string} text Script text
 */
export const splitText = (text: string): string[] => {
  // Decode html code to text
  const words = text
    .replace(/\r?\n|\r/g, " ")
    .split(" ")
    .filter((text) => text.trim() !== "");

  if (words.length === 1) {
    return words;
  }

  const sentences: string[] = [];
  let sentence: string[] = [];

  for (const word of words) {
    sentence.push(word);

    const chars = [",", ".", "!", "?"];

    const mergedText = sentence.join(" ");

    let mush: boolean = false;

    for (const char of chars) {
      if (word.includes(char)) {
        mush = true;
      }
    }

    if (mush || mergedText.length > 75) {
      sentences.push(mergedText);
      sentence = [];
    }
  }

  if (sentence.length !== 0) {
    sentences.push(sentence.join(" "));
  }

  return sentences.map((c) => c.trim());
};

type GetVoices = (args: {
  customAudio: boolean;
  balcon: string | null;
  bal4web: string | null;
}) => Promise<string[]>;

/**
 * Get List of voices
 * @returns List of voices
 */
export const getVoices: GetVoices = ({ customAudio, balcon, bal4web }) => {
  return new Promise((resolve) => {
    if (!customAudio) {
      const voices = execSync(
        `${existsSync(balcon) ? `"${balcon}"` : "balcon"} -l`
      ).toString() as string;

      const listOfVoice = voices
        .trim()
        .split("\n")
        .map((v) => v.trim())
        .filter((v) => v !== "SAPI 5:");

      resolve(listOfVoice);
    } else {
      const voices = execSync(
        `${existsSync(bal4web) ? `"${bal4web}"` : "bal4web"} -s m -m`
      ).toString() as string;

      const listOfVoice = voices
        .trim()
        .split("\n")
        .map((v) => v.trim())
        .filter((v) => v !== "* Microsoft Azure *" && v.includes("en-US"))[0]
        .split(" en-US ")[1]
        .slice(1, -1)
        .split(", ");

      resolve(listOfVoice);
    }
  });
};

type ListenVoice = (args: {
  text: string | undefined;
  customAudio: boolean;
}) => Promise<string | null>;

/**
 * Listen to selected voice
 */
export const listenVoice: ListenVoice = ({ text, customAudio }) => {
  const balcon = localStorage.getItem("balcon");
  const bal4web = localStorage.getItem("bal4web");

  return new Promise((resolve) => {
    const voice = localStorage.getItem("voice");

    if (!customAudio) {
      execSync(
        `${
          existsSync(balcon) ? `"${balcon}"` : "balcon"
        } -n ${voice} -t ${text}`
      );
    } else {
      const audioPath = join(tempDataDir, `${createRandomString(3)}-audio.wav`);

      if (existsSync(audioPath)) {
        unlinkSync(audioPath);
      }

      execSync(
        `${
          existsSync(bal4web) ? `"${bal4web}"` : "bal4web"
        } -s m -l en-US -n ${voice} -t "${text}" -w "${audioPath}"`
      );

      resolve(audioPath);
    }
  });
};
