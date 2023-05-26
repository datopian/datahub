import Link from "next/link.js";

export interface TocSection {
  id: string;
  title: string;
  level: string;
  children?: any;
}

interface Props {
  tableOfContents: TocSection[];
  currentSection: string;
}

export const TableOfContents: React.FC<Props> = ({
  tableOfContents,
  currentSection,
}) => {
  function isActiveSection(section) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActiveSection) > -1;
  }

  return (
    <nav aria-labelledby="on-this-page-title">
      <h2 className="font-display text-md font-medium text-slate-900 dark:text-white">
        On this page
      </h2>
      <ol className="mt-4 space-y-3 text-sm">
        {tableOfContents.map((section) => (
          <li key={section.id}>
            <h3>
              <Link
                href={`#${section.id}`}
                className={
                  isActiveSection(section)
                    ? "text-secondary dark:text-secondary-dark"
                    : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }
              >
                {section.title}
              </Link>
            </h3>
            {section.children && section.children.length > 0 && (
              <ol className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                {section.children.map((subSection) => (
                  <li key={subSection.id}>
                    <Link
                      href={`#${subSection.id}`}
                      className={
                        isActiveSection(subSection)
                          ? "text-secondary dark:text-secondary-dark"
                          : "hover:text-slate-600 dark:hover:text-slate-300"
                      }
                    >
                      {subSection.title}
                    </Link>
                    {subSection.children && subSection.children.length > 0 && (
                      <ol className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                        {subSection.children.map((thirdSection) => (
                          <li key={thirdSection.id}>
                            <Link
                              href={`#${thirdSection.id}`}
                              className={
                                isActiveSection(thirdSection)
                                  ? "text-secondary dark:text-secondary-dark"
                                  : "hover:text-slate-600 dark:hover:text-slate-300"
                              }
                            >
                              {thirdSection.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
