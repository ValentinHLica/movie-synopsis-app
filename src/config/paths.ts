import { join } from "path";

const { app } = window.require("@electron/remote");

const buildPath = join(app.getAppPath(), "build");
const cliPath = join(buildPath, "cli");
const dataPath = join(buildPath, "data");
const tempPath = join(app.getPath("temp"), "movie-synopsis-creator");
const renderDir = join(tempPath, "render");

const renderPath = join(cliPath, "render.exe");

export { tempPath, dataPath, renderPath, renderDir, cliPath };
