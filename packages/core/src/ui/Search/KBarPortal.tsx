import { useEffect, useState } from "react";
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
  useRegisterActions,
} from "kbar";
import { kbarActionsFromDocuments } from "./kbarActionsFromDocuments";

interface Props {
  searchDocumentsPath: string;
}

export const Portal: React.FC<Props> = ({ searchDocumentsPath }) => {
  const [searchActions, setSearchActions] = useState<Action[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(searchDocumentsPath);
      const json = await res.json();
      const actions = kbarActionsFromDocuments(json);
      setSearchActions(actions);
    };
    fetchData();
  }, [searchDocumentsPath]);

  useRegisterActions(searchActions, [searchActions]);

  return (
    <KBarPortal>
      <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
        <KBarAnimator className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center space-x-4 p-4">
              <span className="block w-5">
                <svg
                  className="text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <KBarSearch
                defaultPlaceholder="Search"
                className="h-8 w-full bg-transparent text-slate-600 placeholder-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder-slate-500"
              />
              <span className="inline-block whitespace-nowrap rounded border border-slate-400/70 px-1.5 align-middle font-medium leading-4 tracking-wide text-slate-500 [font-size:10px] dark:border-slate-600 dark:text-slate-400">
                ESC
              </span>
            </div>
            <RenderResults />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

function RenderItem(props) {
  const { item, active } = props;
  return (
    <div
      className={
        typeof item === "string"
          ? ""
          : "hover:bg-gray-200 hover:dark:bg-gray-800"
      }
    >
      {typeof item === "string" ? (
        <div className="pt-3">
          <div className="text-primary-600 block border-t border-gray-100 px-4 pt-6 pb-2 text-xs font-semibold uppercase dark:border-gray-800">
            {item}
          </div>
        </div>
      ) : (
        <div
          className={`block cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-200 ${
            active ? "bg-primary-600" : "bg-transparent"
          }`}
        >
          {item?.subtitle && (
            <div
              className={`${
                active ? "text-gray-200" : "text-gray-400 dark:text-gray-500"
              } text-xs`}
            >
              {item.subtitle}
            </div>
          )}
          <div>{item?.name}</div>
        </div>
      )}
    </div>
  );
}

function RenderResults() {
  const { results } = useMatches();

  if (results.length) {
    return <KBarResults items={results} onRender={RenderItem} />;
  }
  return (
    <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
      No results for your search...
    </div>
  );
}
