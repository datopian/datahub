import { SearchIcon } from "../Icons";

// TODO types
export const SearchField: React.FC<any> = (props) => {
  const { modifierKey, onOpen, mobile } = props;
  return (
    <button
      type="button"
      className={`
      group flex h-6 w-6 items-center justify-center 
      ${
        mobile
          ? "sm:hidden justify-start min-w-full flex-none rounded-lg px-4 py-5 my-6 text-sm ring-1 ring-slate-200 dark:bg-slate-800/75 dark:ring-inset dark:ring-white/5"
          : "hidden sm:flex sm:justify-start md:h-auto md:w-auto xl:w-full max-w-[380px] shrink xl:rounded-lg xl:py-2.5 xl:pl-4 xl:pr-3.5 md:text-sm xl:ring-1 xl:ring-slate-200 xl:hover:ring-slate-300 dark:xl:bg-slate-800/75 dark:xl:ring-inset dark:xl:ring-white/5 dark:xl:hover:bg-slate-700/40 dark:xl:hover:ring-slate-500"
      }
    `}
      onClick={onOpen}
    >
      <SearchIcon className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400" />
      <span
        className={`
        text-slate-500 dark:text-slate-400
        ${
          mobile
            ? "w-full not-sr-only text-left ml-2"
            : "hidden xl:block sr-only md:not-sr-only md:ml-2"
        }
      `}
      >
        Search
      </span>
      {modifierKey && (
        <kbd
          className={`
          ${
            mobile
              ? "hidden"
              : "ml-auto font-medium text-slate-400 dark:text-slate-500 hidden xl:block"
          }
        `}
        >
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      )}
    </button>
  );
};
