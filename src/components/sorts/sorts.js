import React from 'react';
import Order from '../order';
import './sorts.scss';

const Sorts = (p) => {
  function createSortsList() {
    return p.sorts.map(sort => {
      return <button
        disabled={p.loading}
        key={sort.field}
        className={`sorts__item${p.currentSort === sort.field ? " is-selected" : ""}`}
        onClick={() => p.onSortChanged(sort.field)}
        >
          {sort.label}  
        </button>
    });
  }

  return (
    <div className="sorts-header">
      <div className="total-items">{p.totalItems}</div>
      <div className="sorts">
        <div className="sorts__block">
          {createSortsList()}
        </div>
        {
          p.currentOrder ? <Order
            onOrderChanged={p.onOrderChanged}
            currentOrder={p.currentOrder}
            loading={p.loading} /> : null
        }
      </div>
    </div>
  );
}

export default Sorts;