import React, { Component } from 'react';

import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { getApiUrl } from "../utils";

import UserInfo from '../components/user-page-info';
import Spinner from "../components/spinner";
import ErrorIndicator from "../components/error-indicator";
import sofService from "../services/sof-service";

const USER_INFO_FILTER = "!)69SEVH_ZIqf)HL0Nmch_paraucu";

class UserInfoContainer extends Component {

  state = {
    userInfo: {},
    loading: true,
    error: null
  }

  componentDidMount() {
    const { match } = this.props;

    this.getUserInfo(getApiUrl(`users/${match.params.id}`, {
      filter: USER_INFO_FILTER
    }));
  }

  getUserInfo = (url) => {
    sofService.getData(url)
      .then(data => {
        if (data.items.length === 0) {
          this.setNewState({}, false, { message: "User not found" });
        } else {
          this.setNewState(data.items[0], false, null);
        }
      }).catch(error => this.setNewState({}, false, error));
  }

  setNewState = (userInfo, loading, error) => {
    this.setState({userInfo, loading, error});
  }

  render() {
    if (this.state.loading) return <Spinner />;

    if (this.state.error) return <ErrorIndicator error={this.state.error} />;

    return <UserInfo data={this.state.userInfo} />;
  }
};

export default compose(
  withRouter
)(UserInfoContainer);
