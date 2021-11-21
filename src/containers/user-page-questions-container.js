import React, { Component } from 'react';

import { compose } from "redux";
import {Link, withRouter} from "react-router-dom";

import {getApiUrl, getDateFormat, mainSorts} from "../utils";

import Spinner from "../components/spinner";
import ErrorIndicator from "../components/error-indicator";
import sofService from "../services/sof-service";
import UserPageItem from "../components/user-page-item";

const QuestionItem = ({ data }) => {
  return <tr className={`user__question-item${data.is_answered ? ' user__question--answered' : ''}`}
  >
    <td>
      <table>
        <tr>
          <td>
            <div className="questions__item-type">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                <path d="M4 14l-3 3V3c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2H4zm7.75-3.97c.32-.37.55-.75.7-1.15.18-.51.28-1.11.28-1.79 0-1.29-.35-2.29-1.03-3a3.66 3.66 0 00-2.78-1.07 3.7 3.7 0 00-2.8 1.07c-.73.82-1.1 1.9-1.03 3 0 1.29.35 2.29 1.03 3a3.76 3.76 0 002.85 1.07c.62 0 1.2-.11 1.71-.34.65.44 1 .68 1.06.7.23.13.46.23.7.3l.59-1.13a5.2 5.2 0 01-1.28-.66zm-1.27-.9a5.4 5.4 0 00-1.5-.8l-.45.9c.33.12.66.29.98.5-.2.07-.42.11-.65.11-.61 0-1.12-.23-1.52-.68-.4-.46-.6-1.15-.6-2.07 0-.9.2-1.58.6-2.04a2 2 0 011.57-.67 2 2 0 011.58.67c.4.45.6 1.13.6 2.04 0 .44-.05.83-.16 1.17-.1.34-.25.63-.45.87z"></path>
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

const USER_QUESTIONS_FILTER = "!)R5KERhY9tZIwmEol_nsF-nl";

class UserPageQuestionsContainer extends Component {

  state = {
    data: [],
    loading: true,
    error: null,
    sort: 'activity',
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
    const url = getApiUrl(`users/${match.params.id}/questions`, {
      page,
      sort,
      pagesize: "10",
      filter: USER_QUESTIONS_FILTER
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
      itemName="Questions"
      View={QuestionItem}
      noData="This user has not asked any questions."
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
)(UserPageQuestionsContainer);
