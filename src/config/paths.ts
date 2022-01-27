import { join } from "path";

const { app } = window.require("@electron/remote");

export const buildPath = join(app.getAppPath(), "build");
export const cliPath = join(buildPath, "cli");
export const dataPath = join(buildPath, "data");
export const tempPath = join(app.getPath("temp"), "movie-synopsis-creator");
export const renderDir = join(tempPath, "render");
export const tempDataDir = join(tempPath, "data");
export const renderPath = join(cliPath, "render.exe");
