// TODO dark and light theme

import { useEffect, useState, useRef, RefObject } from "react";

const twitterWidgetJs = "https://platform.twitter.com/widgets.js";
enum TweetState {
  LOADING,
  LOADED,
  FAILED,
}

interface TweetConfig {
  theme: string;
}

declare global {
  interface Window {
    twttr: {
      widgets: {
        createTweet: (
          id: string,
          ref: RefObject<HTMLDivElement>,
          options: TweetConfig
        ) => Promise<any>; // TODO type
        load: (ref: RefObject<HTMLDivElement>) => void;
      };
    };
  }
}

export default function TwitterEmbed({ url, ...props }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tweetState, setTweetState] = useState<TweetState>(TweetState.LOADING);

  const tweetId = url.split("status/").pop();

  useEffect(() => {
    const renderTweet = () => {
      window.twttr.widgets
        .createTweet(tweetId, ref.current as any, {
          theme: "dark",
        })
        .then((el) => {
          if (el) {
            setTweetState(TweetState.LOADED);
          } else {
            setTweetState(TweetState.FAILED);
          }
        });
      return window.twttr.widgets.load(ref.current as any);
    };

    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = twitterWidgetJs;
      script.async = true;
      script.onload = () => renderTweet();
      document.head.appendChild(script);
    } else {
      renderTweet();
    }
  }, [tweetId]);

  return (
    <>
      {tweetState === TweetState.LOADING && (
        <div className="relative my-4 w-full sm:max-w-xl bg-neutral-900 drop-shadow-md rounded-lg">
          <div className="absolute flex flex-col flex-wrap break-all items-center justify-center bg-slate-700/60 w-full h-full px-4 py-2 rounded-lg top-0 left-0 z-10">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 absolute right-4 top-4"
            >
              <title>Twitter</title>
              <path
                fill="#1DA1F2"
                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
              />
            </svg>
            <div className="text-gray-300 font-bold my-2 italic">
              {"Loading tweet..."}
            </div>
          </div>
          <div className="p-3 space-y-4 animate-pulse">
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10 rounded-full bg-slate-700" />
              <div className="w-1/3 h-4 bg-slate-700"></div>
            </div>
            <div className="space-y-2">
              <div className="w-2/3 h-3 bg-slate-700"></div>
              <div className="w-2/3 h-3 bg-slate-700"></div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/4 h-3 bg-slate-700"></div>
              <div className="w-1/4 h-3 bg-slate-700"></div>
              <div className="w-1/4 h-3 bg-slate-700"></div>
            </div>
          </div>
        </div>
      )}
      <div className="twitter-tweet" ref={ref} />
    </>
  );
}
