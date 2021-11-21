import React from 'react';

import Pagination from '../pagination';
import Sorts from '../sorts';
import './tags-list.scss';
import {Link} from "react-router-dom";

const TagsList = (p) => {
  return (
    <>
      <Sorts
        totalItems="All Tags"
        onSortChanged={p.onSortChanged}
        onOrderChanged={p.onOrderChanged}
        sorts={p.sorts}
        currentSort={p.sort}
        currentOrder={p.order}
        loading={p.loading} />
      <ul className="users__list">
        {
          p.tags.map((data) => {
            return (
              <li key={data.name}>
                <div className="tags__item">
                  <Link to={`/questions/tagged/${data.name}`}>
                    <div className="tags__item-title post-tag">
                      {data.name}
                    </div>
                  </Link>
                  <div className="tags__item-count">
                    {data.count}
                    <div>question{data.count !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className="pagination">
        <Pagination
          currentPage={p.currentPage}
          pageSize={36}
          totalItems={p.totalItems}
          setCurrentPage={p.onPageChange} />
      </div>
    </>
  );
}

export default TagsList;