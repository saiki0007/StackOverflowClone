import React from 'react';
import './pagination.scss';

const Pagination = ({ totalItems, pageSize,
    currentPage, setCurrentPage }) => {
  const maxPages = 4;
  const pageCount = Math.ceil(totalItems / pageSize);

  function showPrevBtn() {
    if (currentPage === 1) return null;
    return <span key="prev-btn-pag" onClick={() => setCurrentPage(currentPage - 1)}>Prev</span>
  }

  function showNextBtn() {
    if (currentPage === pageCount) return null;
    return <span key="next-btn-pag" onClick={() => setCurrentPage(currentPage + 1)}>Next</span>
  }

  function getMaxMinPosition(pageCount) {
    let maxLeft = (currentPage - Math.floor(maxPages / 2));
    let maxRight = (currentPage + Math.floor(maxPages / 2));

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxPages;
    }

    if (maxRight > pageCount) {
      maxLeft = pageCount - (maxPages - 1);
      maxRight = pageCount;

      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }

    return {
      maxLeft,
      maxRight
    };
  }

  function pageButtons() {
    const pages = [];

    const { maxLeft, maxRight } = getMaxMinPosition(pageCount);

    pages.push(showPrevBtn());

    if (currentPage !== 1 && maxLeft !== 1) {
      pages.push((<span key={1} onClick={() => setCurrentPage(1)}>1</span>));
      if (maxLeft > 2) {
        pages.push((<span key="left-ellipsis" className="pag-ellipsis">...</span>));
      }
    }

    for (let i = maxLeft; i <= maxRight; i++) {
      pages.push((
        <span
          key={i}
          className={currentPage === i ? "is-selected" : ""}
          onClick={() => setCurrentPage(i)}>
          {i}
        </span>
      ));
    }

    if (currentPage !== pageCount && maxRight !== pageCount) {
      if (maxLeft < pageCount - 1) {
        pages.push((<span key="right-ellipsis" className="pag-ellipsis">...</span>));
      }
      pages.push((
        <span key={pageCount} onClick={() => setCurrentPage(pageCount)}>{pageCount}</span>
      ));
    }

    pages.push(showNextBtn());

    return pages;
  }
  
  return <>
    {
      totalItems > 0 && pageCount > 1 ? <div className="pagination-list">
        {pageButtons()}
      </div> : null
    }
  </>
};

export default Pagination;