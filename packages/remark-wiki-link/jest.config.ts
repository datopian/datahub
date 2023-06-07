import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  displayName: "remark-wiki-link",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!remark-parse)"],
};

export default jestConfig;
