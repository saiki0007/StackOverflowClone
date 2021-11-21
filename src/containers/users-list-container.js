import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getUsers, setCurrentUsersPage, setUsersOrder, setUsersSort} from '../reducers/users-page-reducer';
import {getApiUrl} from '../utils';
import {usersSorts} from '../utils';
import Spinner from '../components/spinner';
import ErrorIndicator from '../components/error-indicator';
import UsersList from "../components/users-list";

const USERS_PAGE_FILTER = "!0YzAa5QZ(HbrSvDuC54E9ZtEY";

class UsersListContainer extends Component {
  componentDidMount() {
    const {currentPage, getUsers, order, sort} = this.props;

    getUsers(getApiUrl("users", {
      page: currentPage,
      pagesize: 36,
      order,
      sort,
      filter: USERS_PAGE_FILTER
    }));
  }

  onPageChange = (pageNumber) => {
    const {getUsers, setCurrentUsersPage, order, sort} = this.props;

    setCurrentUsersPage(pageNumber);
    getUsers(getApiUrl("users", {
      page: pageNumber,
      pagesize: 36,
      order,
      sort,
      filter: USERS_PAGE_FILTER
    }));
  }

  onSortChanged = (sort) => {
    const {
      setUsersSort, setCurrentUsersPage,
      getUsers, order
    } = this.props;

    setUsersSort(sort);
    setCurrentUsersPage(1);
    getUsers(getApiUrl("users", {
      page: 1,
      pagesize: 36,
      order,
      sort,
      filter: USERS_PAGE_FILTER
    }));
  }

  onOrderChanged = (order) => {
    const {
      setUsersOrder, setCurrentUsersPage,
      getUsers, sort
    } = this.props;

    setUsersOrder(order);
    setCurrentUsersPage(1);
    getUsers(getApiUrl("users", {
      page: 1,
      pagesize: 36,
      order,
      sort,
      filter: USERS_PAGE_FILTER
    }));
  }

  render() {
    const p = this.props;

    return <>
      <div className="flex-content">
        {
          p.loading ? <Spinner/> :
            p.error ? <ErrorIndicator error={p.error}/> :
              <div className="users__mainbar">
                <UsersList
                  {...p}
                  sorts={usersSorts}
                  onPageChange={this.onPageChange}
                  onSortChanged={this.onSortChanged}
                  onOrderChanged={this.onOrderChanged}
                />
              </div>
        }
      </div>

    </>
  }
};

const mapStateToProps = ({usersPage}) => {
  return usersPage;
}

const mapDispatchToProps = {
  getUsers,
  setCurrentUsersPage,
  setUsersOrder,
  setUsersSort
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(UsersListContainer);
