import React, { Component } from 'react';

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getApiUrl } from "../utils";
import { getQuestion } from "../reducers/single-question-reducer";

import Question from '../components/question';
import Spinner from "../components/spinner";
import ErrorIndicator from "../components/error-indicator";

const QUESTION_PAGE_FILTER = "!)OUGkA6*-o4rPM6ziyHFVAh)fc2V4qGq-5H1a-(wgZvsGU.VNw)Rd(6dJtu6WbXLVUAS7H";

class QuestionContainer extends Component {

  componentDidMount() {
    const { getQuestion, match } = this.props;

    getQuestion(getApiUrl(`questions/${match.params.id}`, {
      order: 'desc',
      sort: 'activity',
      filter: QUESTION_PAGE_FILTER
    }));
  }

  render() {
    if (this.props.loading) return <Spinner />;

    if (this.props.error) return <ErrorIndicator />;

    return <Question { ...this.props } />;
  }
};

const mapStateToProps = ({ singleQuestionPage }) => {
  return singleQuestionPage;
}

const mapDispatchToProps = {
  getQuestion
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(QuestionContainer);
