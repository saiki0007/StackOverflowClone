import React, {Component} from "react";
import Search from "../components/search";
import {setInTitleSearch} from "../reducers/search-questions-page-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import { withRouter } from "react-router-dom";

class SearchContainer extends Component {

  state = {
    inTitle: ''
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.setInTitle(this.state.inTitle);
    this.setState({ inTitle: '' });
    this.props.history.push('/search/')
  }

  onInputChanges = (e) => {
    this.setState({ inTitle: e.target.value })
  };

  render() {
    return <Search
      onSubmit={this.onSubmit}
      onInputChanges={this.onInputChanges}
      inTitle={this.state.inTitle} />
  }
}

const mapStateToProps = ({ searchQuestionsPage }) => {
  return {
    inTitle: searchQuestionsPage.inTitle
  }
}

const mapDispatchToProps = {
  setInTitle: setInTitleSearch
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SearchContainer);