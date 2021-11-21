import React from 'react';

const Order = ({ onOrderChanged, loading, currentOrder }) => {
  return (
    <div className="order">
      <button disabled={loading}
        className={`sorts__item${currentOrder === "asc" ? " is-selected" : ""}`}
        onClick={() => onOrderChanged("asc")}
      >
        Asc
      </button>
      <button disabled={loading}
        className={`sorts__item${currentOrder === "desc" ? " is-selected" : ""}`}
        onClick={() => onOrderChanged("desc")}
      >
        Desc
      </button>
    </div>
  );
}

export default Order;