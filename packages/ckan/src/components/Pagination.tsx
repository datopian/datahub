import { Dispatch, SetStateAction } from "react";
import { PackageSearchOptions } from "../interfaces";

export default function Pagination({
  options,
  setOptions,
  subsetOfPages,
  setSubsetOfPages,
  count,
}: {
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
  subsetOfPages: number;
  setSubsetOfPages: Dispatch<SetStateAction<number>>;
  count: number;
}) {
  return (
    <div className="flex gap-2 align-center">
      {subsetOfPages !== 0 && (
        <button
          className="font-semibold flex items-center gap-2"
          onClick={() => setSubsetOfPages(subsetOfPages - 5)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Prev
        </button>
      )}
      {Array.from(Array(Math.ceil(count / 5)).keys()).map((x) => (
        <button
          key={x}
          className={`${
            x == options.offset / 5 ? "bg-orange-500 text-white" : ""
          } px-2 rounded font-semibold text-zinc-900`}
          onClick={() => setOptions({ ...options, offset: x * 5 })}
          style={{
            display:
              x >= subsetOfPages && x < subsetOfPages + 5 ? "block" : "none",
          }}
        >
          {x + 1}
        </button>
      ))}
      {subsetOfPages !== Math.ceil(count / 5) && count > 25 && (
        <button
          className="font-semibold flex items-center gap-2"
          onClick={() => setSubsetOfPages(subsetOfPages + 5)}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
