import React from 'react';

import UsersItem from '../users-item';
import Pagination from '../pagination';
import Sorts from '../sorts';
import './users-list.scss';

const UsersList = (p) => {
  return (
    <>
      <Sorts
        totalItems="Users"
        onSortChanged={p.onSortChanged}
        onOrderChanged={p.onOrderChanged}
        sorts={p.sorts}
        currentSort={p.sort}
        currentOrder={p.order}
        loading={p.loading} />
      <ul className="users__list">
        {
          p.users.map((data) => {
            return (
              <li key={data.user_id}>
                <UsersItem data={data} />
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

export default UsersList;