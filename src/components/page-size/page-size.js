import React from 'react';

export default function PageSize({ onPageSizeChanged, pageSize }) {
  
  function pageSizeBtns() {
    return [15, 30, 50].map(size => {
      return <span key={size} onClick={() => onPageSizeChanged(size)}
        className={size === pageSize ? "is-selected" : ""}>{size}</span>
    });
  }

  return (
    <div className="page-size">
      {pageSizeBtns()}
      <div className="per-page">per page</div>
    </div>
  );
}
