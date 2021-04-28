import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
import {useTranslation} from "react-i18next"

const PdfViewer = (props) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const { t } = useTranslation();

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#previous"><span className="arrow-left"></span> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#previous"><span className="arrow-left"></span> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={() => setPage(page + 1)}><a href="#next">Next <span className="arrow-right"></span></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#next">Next <span className="arrow-right"></span></a></li>;
    }
    return (
      <nav aria-label="Navigate pages: Previous/Next">
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  const canvasEl = useRef(null);

  const [loading, numPages] = usePdf({
    file: props.file,
    page,
    canvasEl
  });

  useEffect(() => {
    setPages(numPages);
  }, [numPages]);

  return (
    <div>
      {loading && <span>{t('Loading...')}</span>}
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
  );
}

export default PdfViewer;
