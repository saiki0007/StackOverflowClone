import React, { Component } from 'react';

import { compose } from "redux";
import {Link, withRouter} from "react-router-dom";

import {getApiUrl, getDateFormat, mainSorts} from "../utils";

import Spinner from "../components/spinner";
import ErrorIndicator from "../components/error-indicator";
import sofService from "../services/sof-service";
import UserPageItem from "../components/user-page-item";

const AnswerItem = ({ data }) => {
  return <tr className={`user__question-item${data.is_accepted ? ' user__question--answered' : ''}`}
  >
    <td>
      <table>
        <tr>
          <td>
            <div className="questions__item-type">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14 14H3a2 2 0 01-2-2V3c0-1.1.9-2 2-2h12a2 2 0 012 2v14l-3-3zm-1.02-3L9.82 3H8.14l-3.06 8h1.68l.65-1.79h3.15l.69 1.79h1.73zm-2.93-3.12H7.9l1.06-2.92 1.09 2.92z"></path>
              </svg>
            </div>
          </td>
          <td>
            <div className={`questions__item-score`}>
              {data.score}
            </div>
          </td>
          <td>
            <Link to={`/questions/${data.question_id}`}>
              <div className="questions__item-title" dangerouslySetInnerHTML={{
                __html: data.title
              }} />
            </Link>
          </td>
        </tr>
      </table>
    </td>
    <td>
      <div className="questions__item-date">
        {getDateFormat(data.creation_date)}
      </div>
    </td>
  </tr>;
}

const USER_ANSWERS_FILTER = "!LfC50JbWTERXPa0ePHV1n7";

class UserPageAnswersContainer extends Component {

  state = {
    data: [],
    loading: true,
    error: null,
    sort: 'votes',
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
    const url = getApiUrl(`users/${match.params.id}/answers`, {
      page,
      sort,
      pagesize: "10",
      filter: USER_ANSWERS_FILTER
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

    return <UserPageItem
      data={this.state.data}
      totalItems={this.state.totalItems}
      currentPage={this.state.currentPage}
      setCurrentPage={this.setCurrentPage}
      loading={this.state.loading}
      itemName="Answers"
      View={AnswerItem}
      noData="This user has not any answers."
      sorts={{
        onSortChanged: this.onSortChanged,
        types: mainSorts,
        currentSort: this.state.sort
      }}
    />;
  }
};

export default compose(
  withRouter
)(UserPageAnswersContainer);
