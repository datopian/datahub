import { useCallback, useEffect, useState } from "react";

// TODO types
export const useTableOfContents = (tableOfContents) => {
  const [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);

  const getHeadings = useCallback((toc) => {
    return toc
      .flatMap((node) => [
        node.id,
        ...node.children.flatMap((child) => [
          child.id,
          ...child.children.map((subChild) => subChild.id),
        ]),
      ])
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
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [getHeadings, tableOfContents]);

  return currentSection;
};
