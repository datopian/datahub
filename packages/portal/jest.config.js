module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
    setupFiles: ["<rootDir>/tests/setupTests.js"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  };