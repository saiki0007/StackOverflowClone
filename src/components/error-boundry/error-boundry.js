import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundry extends Component {
  state = {
    error: null,
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      hasError: true
    });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator error={this.state.error} />;
    }

    return this.props.children;
  }
}
