import React, {Component} from "react";
import Header from "../components/header";
import {connect} from "react-redux";
import {getOwnInfo, setAccessToken, setIsAuth} from "../reducers/auth-reducer";
import {getApiUrl} from "../utils";

const ME_INFO_FILTER = '!)scTwHvyN.pdU5mDtp19';

class HeaderContainer extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.accessToken !== this.props.accessToken) {
      this.getMe();
    }
  }

  getMe = () => {
    const { accessToken, getOwnInfo } = this.props;
    getOwnInfo(getApiUrl(`me`, {
      key: window.authScope.accessKey,
      access_token: accessToken,
      filter: ME_INFO_FILTER
    }));
  }

  onLogInClick = () => {
    const { setIsAuth, setAccessToken } = this.props;
    window.authScope.SE.authenticate({
      success: function(data) {
        setIsAuth(true);
        setAccessToken(data.accessToken);
      },
      error: function(data) {
        alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage);
      }
    });
  }
  
  render() {
    return <Header
      onLogInClick={this.onLogInClick}
      isAuth={this.props.isAuth}
      meInfo={this.props.info}
      loading={this.props.loading}
      error={this.props.error}
    />
  }
}

const mapStateToProps = ({ auth }) => {
  return auth;
}

const mapDispatchToProps = {
  getOwnInfo,
  setIsAuth,
  setAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);