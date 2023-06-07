export const nameFromUrl = (url: string) => {
  const name = url.split("/").slice(-1)[0].replace("-", " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
};
