import React from "react";
import Sorts from "../sorts";
import Pagination from "../pagination";
import {numberWithCommas} from "../../utils";
import './user-page-item.scss';

export default function UserPageItem(props) {
  const { View, sorts } = props;

  return <>
    <div className="user__content-item">
      <div className="user__content-item-header">
        <div className="user__content-item-title flex-content">
          <div>{props.itemName}</div>
          <span>({props.totalItems ? numberWithCommas(props.totalItems) : 0})</span>
        </div>
        {
          sorts ? <Sorts
            totalItems=""
            onSortChanged={sorts.onSortChanged}
            onOrderChanged={sorts.onOrderChanged}
            sorts={sorts.types}
            currentSort={sorts.currentSort}
            currentOrder={sorts.order}
            loading={props.loading} /> : null
        }
      </div>
      <div className="user__content-item-body">
        <div className="user__content-items-list">
          <table className="user__content-table">
            <tbody>
            {
              props.data.length > 0 ? props.data.map((item, i) => {
                return <View key={i} data={item} />
              }) : <div>{props.noData}</div>
            }
            </tbody>
          </table>
        </div>
        {
          props.totalItems > 10 ? <div className="pagination">
            <Pagination
              totalItems={props.totalItems}
              pageSize="10"
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}/>
          </div> : null
        }
      </div>
    </div>
  </>
}