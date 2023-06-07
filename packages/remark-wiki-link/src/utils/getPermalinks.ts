import fs from "fs";
import path from "path";

// recursively get all files in a directory
const recursiveGetFiles = (dir: string) => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));
  const dirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(dir, dirent.name));
  for (const d of dirs) {
    files.push(...recursiveGetFiles(d));
  }

  return files;
};

export const getPermalinks = (
  markdownFolder: string,
  ignorePatterns: Array<RegExp> = [],
  func: (str: any, ...args: any[]) => string = defaultPathToPermalinkFunc
) => {
  const files = recursiveGetFiles(markdownFolder);
  const filesFiltered = files.filter((file) => {
    return !ignorePatterns.some((pattern) => file.match(pattern));
  });

  return filesFiltered.map((file) => func(file, markdownFolder));
};

const defaultPathToPermalinkFunc = (
  filePath: string,
  markdownFolder: string
) => {
  const permalink = filePath
    .replace(markdownFolder, "") // make the permalink relative to the markdown folder
    .replace(/\.(mdx|md)/, "")
    .replace(/\\/g, "/") // replace windows backslash with forward slash
    .replace(/\/index$/, ""); // remove index from the end of the permalink
  return permalink.length > 0 ? permalink : "/"; // for home page
};
