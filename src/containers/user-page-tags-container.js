import React, { Component } from 'react';

import { compose } from "redux";
import {withRouter} from "react-router-dom";

import {getApiUrl, getShortenNumber, tagsSorts} from "../utils";

import Spinner from "../components/spinner";
import ErrorIndicator from "../components/error-indicator";
import sofService from "../services/sof-service";
import UserPageItem from "../components/user-page-item";

const TagsItem = ({ data }) => {
  return <tr className='user__tags-item'>
    <table>
      <tr>
        <td>
          <div className="post-tag">
            {data.name}
          </div>
        </td>
        <td>
          <div className="user__item-tags-count"><span>×</span> {getShortenNumber(data.count)}</div>
        </td>
      </tr>
    </table>
  </tr>;
}

const USER_TAGS_FILTER = "!T.aWop-Ul.l0iP1jU0";

class UserPageTagsContainer extends Component {

  state = {
    data: [],
    loading: true,
    error: null,
    sort: 'popular',
    currentPage: 1,
    totalItems: 0
  }

  componentDidMount() {
    this.getUserData(this.state.currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.getUserData(this.state.currentPage);
    }
  }

  getUserData = (page, sort = this.state.sort) => {
    const { match } = this.props;
    const url = getApiUrl(`users/${match.params.id}/tags`, {
      page,
      sort,
      pagesize: "40",
      filter: USER_TAGS_FILTER
    });

    sofService.getData(url)
      .then(data => {
        this.setState({totalItems: data.total});
        this._setNewState(data.items, false, null);
      }).catch(error => this._setNewState({}, false, error));
  }

  onSortChanged = (sort) => {
    this.setState({sort, currentPage: 1, loading: true, error: null});
    this.getUserData(1, sort);
  }

  setCurrentPage = (currentPage) => {
    this.setState({currentPage, loading: true, error: null});
  }

  _setNewState = (data, loading, error) => {
    this.setState({data, loading, error});
  }

  render() {
    if (this.state.loading) return <Spinner />;

    if (this.state.error) return <ErrorIndicator error={this.state.error} />;

    return <div className="user-page-tags-wrapper">
      <UserPageItem
        data={this.state.data}
        totalItems={this.state.totalItems}
        currentPage={this.state.currentPage}
        setCurrentPage={this.setCurrentPage}
        loading={this.state.loading}
        itemName="Tags"
        View={TagsItem}
        noData="This user has not any tags."
        sorts={{
          onSortChanged: this.onSortChanged,
          types: tagsSorts,
          currentSort: this.state.sort
        }}
      />
    </div>
  }
};

export default compose(
  withRouter
)(UserPageTagsContainer);
