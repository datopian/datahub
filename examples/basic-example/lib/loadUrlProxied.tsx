export default async function loadUrlProxied(url: string) {
  // HACK: duplicate of Excel code - maybe refactor
  // if url is external may have CORS issue so we proxy it ...
  if (url.startsWith("http")) {
    const PROXY_URL = "/api/proxy";
    url = PROXY_URL + "?url=" + encodeURIComponent(url);
  }
  const response = await fetch(url)
  const data = await response.text()
  return data
}
