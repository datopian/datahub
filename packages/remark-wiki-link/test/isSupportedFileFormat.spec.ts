import {
  isSupportedFileFormat,
  supportedFileFormats,
} from "../src/lib/isSupportedFileFormat";

describe("isSupportedFileFormat", () => {
  test("should return [false, null] for a path with no file extension", () => {
    const filePath = "/content/some/markdown/page";
    expect(isSupportedFileFormat(filePath)).toStrictEqual([false, null]);
  });

  test("should return [true, <extension>] for a path with supported file extension", () => {
    supportedFileFormats.forEach((fileFormat) => {
      const filePath = `image.${fileFormat}`;
      expect(isSupportedFileFormat(filePath)).toStrictEqual([true, fileFormat]);
    });
  });

  test("should return [false, <extension>] for a path with unsupported file extension", () => {
    const filePath = "image.xyz";
    expect(isSupportedFileFormat(filePath)).toStrictEqual([false, "xyz"]);
  });
});
