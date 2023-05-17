# How to add web analytics?

- Install the following packages
```
npm install @flowershow/core
```
- Add the following to `/pages/_app.tsx`
```
import { pageview } from "@flowershow/core";
```
- Add this to the `MyApp` function inside of `_app.tsx`
```
  useEffect(() => {
      const handleRouteChange = (url) => {
        pageview(url, {YOUR GA_ID});
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
  }, [router.events]);
```
