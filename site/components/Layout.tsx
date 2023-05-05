import { siteConfig } from '@/config/siteConfig';
import { NextSeo } from 'next-seo';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import Nav from './Nav';
import { SiteToc } from '@/components/SiteToc';

function useTableOfContents(tableOfContents) {
  const [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);

  const getHeadings = useCallback((toc) => {
    return toc
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;

        const style = window.getComputedStyle(el);
        const scrollMt = parseFloat(style.scrollMarginTop);

        const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
        return { id, top };
      })
      .filter((el) => !!el);
  }, []);

  useEffect(() => {
    if (tableOfContents.length === 0) return;
    const headings = getHeadings(tableOfContents);
    function onScroll() {
      const top = window.scrollY + 4.5;
      let current = headings[0].id;
      headings.forEach((heading) => {
        if (top >= heading.top) {
          current = heading.id;
        }
        return current;
      });
      setCurrentSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getHeadings, tableOfContents]);

  return currentSection;
}

export default function Layout({
  children,
  title,
  tableOfContents = [],
  urlPath,
  siteMap = []
}: {
  children;
  title?: string;
  tableOfContents?;
  urlPath?: string;
  siteMap?: [];
}) {
  // const { toc } = children.props;
  const { theme, setTheme } = useTheme();

  const currentSection = useTableOfContents(tableOfContents);

  function isActive(section) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActive) > -1;
  }

  return (
    <>
      {title && <NextSeo title={title} />}
      <Nav />
      <div className="mx-auto p-6 bg-background dark:bg-background-dark">
        {children}
      </div>
      <footer className="flex items-center justify-center w-full h-24 border-t dark:border-slate-900 bg-background dark:bg-background-dark">
        <a
          className="flex items-center justify-center"
          href="https://datopian.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{' '}
          <img
            src={
              theme === 'dark'
                ? '/images/datopian-light-logotype.svg'
                : '/images/datopian-dark-logotype.svg'
            }
            alt="Datopian Logo"
            className="h-6 ml-2"
          />
        </a>
      </footer>
      {/** TABLE OF CONTENTS */}
      {tableOfContents.length > 0 && siteConfig.tableOfContents && (
        <div className="hidden xl:fixed xl:right-0 xl:top-[4.5rem] xl:block xl:w-1/5 xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6 xl:mb-16">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            <h2 className="font-display text-md font-medium text-primary dark:text-primary-dark">
              On this page
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {tableOfContents.map((section) => (
                <li key={section.id}>
                  <h3>
                    <Link
                      href={`#${section.id}`}
                      className={
                        isActive(section)
                          ? 'text-secondary'
                          : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
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
                              isActive(subSection)
                                ? 'text-sky-500'
                                : 'hover:text-slate-600 dark:hover:text-slate-300'
                            }
                          >
                            {subSection.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
      {/* LHS NAVIGATION */}
      {/* {showSidebar && ( */}
        <div className="hidden lg:block fixed z-20 w-[18rem] top-[4.6rem] right-auto bottom-0 left-[max(0px,calc(50%-44rem))] pt-8 pl-8 overflow-y-auto">
          <SiteToc currentPath={urlPath} nav={siteMap} />
        </div>
      {/* )} */}
    </>
  );
}
