export const EditThisPage = ({ url }: { url: string }) => {
  return (
    <div className="mb-10 prose dark:prose-invert p-6 mx-auto">
      <a
        className="flex no-underline font-semibold justify-center"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Edit this page
        <span className="mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      </a>
    </div>
  );
};
