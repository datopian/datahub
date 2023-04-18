import axios from "axios";

export default function loadUrlProxied(url: string) {
  // HACK: duplicate of Excel code - maybe refactor
  // if url is external may have CORS issue so we proxy it ...
  if (url.startsWith("http")) {
    const PROXY_URL = "/api/proxy";
    url = PROXY_URL + "?url=" + encodeURIComponent(url);
  }
  return axios.get(url).then((res) => res.data);
}
