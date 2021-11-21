import React, { Component } from 'react';

import { compose } from "redux";
import {withRouter} from "react-router-dom";

import { getApiUrl } from "../utils";

import Spinner from "../components/spinner";
import ErrorIndicator from "../components/error-indicator";
import sofService from "../services/sof-service";
import UserPageItem from "../components/user-page-item";

const ReputationItem = ({ data }) => {
  return <tr>
    <td>
      <div className={`reputation__item-mount ${data.reputation_change > 0 ? 'green-rep-amount' : 'red-rep-amount'}`}>
        {data.reputation_change > 0 ? '+' : ''}{data.reputation_change !== 0 ? data.reputation_change : ''}
      </div>
    </td>
    <td>
      <div className="reputation__item-type">
        {data.vote_type.replace(/_/, '')}
      </div>
    </td>
    <td>
      <div className="reputation__item-title" dangerouslySetInnerHTML={{
        __html: data.title
      }} />
    </td>
  </tr>;
}

const USER_REPUTATION_FILTER = "!0YkVxhHO7dkTlewxZ5-jzSDVC";

class UserPageReputationContainer extends Component {

  state = {
    data: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalItems: 0
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.getUserData();
    }
  }

  getUserData = () => {
    const { match } = this.props;
    const url = getApiUrl(`users/${match.params.id}/reputation`, {
      page: this.state.currentPage,
      pagesize: "10",
      filter: USER_REPUTATION_FILTER
    });

    sofService.getData(url)
      .then(data => {
        this.setState({totalItems: data.total});
        this.setNewState(data.items, false, null);
      }).catch(error => this.setNewState({}, false, error));
  }

  setNewState = (data, loading, error) => {
    this.setState({data, loading, error});
  }

  setCurrentPage = (currentPage) => {
    this.setState({currentPage, loading: true, error: null});
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
      itemName="Reputation"
      View={ReputationItem}
      noData="This user has not any reputation history."
    />;
  }
};

export default compose(
  withRouter
)(UserPageReputationContainer);
