import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions, setCurrentQuestionsPage,
  setQuestionsPageSize, setQuestionsOrder,
  setQuestionsSort } from '../reducers/questions-page-reducer';
import { getApiUrl, mainSorts } from '../utils';
import Spinner from '../components/spinner';
import ErrorIndicator from '../components/error-indicator';
import QuestionsList from '../components/questions-list';
import RelatedTagsContainer from "./related-tags-container";
import {compose} from "redux";
import { withRouter } from "react-router-dom";

const QUESTIONS_PAGE_FILTER = "!0S2DC*iP9nl5dEmG4*.sVeSJC";

class QuestionsListContainer extends Component {
  getQuestionsContent = () => {
    const { currentPage, pageSize, getQuestions, order, sort, match, isTagged } = this.props;
    const tagged = isTagged ? match.params.tagName : '';

    getQuestions(getApiUrl("questions", {
      page: currentPage,
      pagesize: pageSize,
      order,
      sort,
      tagged,
      filter: QUESTIONS_PAGE_FILTER
    }));
  }
  componentDidMount() {
    this.getQuestionsContent();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.tagName &&
      prevProps.match.params.tagName !== this.props.match.params.tagName
    ) {
      this.getQuestionsContent();
    }
  }

  onPageChange = (pageNumber) => {
    const { getQuestions, setCurrentPage, pageSize, order, sort, match, isTagged } = this.props;
    const tagged = isTagged ? match.params.tagName : '';

    setCurrentPage(pageNumber);
    getQuestions(getApiUrl("questions", {
      page: pageNumber,
      pagesize: pageSize,
      order,
      sort,
      tagged,
      filter: QUESTIONS_PAGE_FILTER
    }));
  }

  onPageSizeChanged = (pageSize) => {
    const { setPageSize, setCurrentPage,
      getQuestions, order, sort, match, isTagged } = this.props;
    const tagged = isTagged ? match.params.tagName : '';

    setPageSize(pageSize);
    setCurrentPage(1);
    getQuestions(getApiUrl("questions", {
      page: 1,
      pagesize: pageSize,
      order,
      sort,
      tagged,
      filter: QUESTIONS_PAGE_FILTER
    }));
  }

  onSortChanged = (sort) => {
    const { setSort, setCurrentPage,
      getQuestions, order, pageSize, match, isTagged } = this.props;
    const tagged = isTagged ? match.params.tagName : '';

    setSort(sort);
    setCurrentPage(1);
    getQuestions(getApiUrl("questions", {
      page: 1,
      pagesize: pageSize,
      order,
      sort,
      tagged,
      filter: QUESTIONS_PAGE_FILTER
    }));
  }

  onOrderChanged = (order) => {
    const { setOrder, setCurrentPage,
      getQuestions, sort, pageSize, match, isTagged } = this.props;
    const tagged = isTagged ? match.params.tagName : '';

    setOrder(order);
    setCurrentPage(1);
    getQuestions(getApiUrl("questions", {
      page: 1,
      pagesize: pageSize,
      order,
      sort,
      tagged,
      filter: QUESTIONS_PAGE_FILTER
    }));
  }

  render() {
    const p = this.props;

    return <>
      <div className="page__content flex-content">
        {
          p.loading ? <Spinner /> :
            p.error ? <ErrorIndicator error={p.error}/> :
              <div className="questions__mainbar">
                <h1>
                  {
                    p.isTagged ? <>Questions tagged <span>"{p.match.params.tagName}"</span></>
                      : 'All Questions'
                  }
                </h1>
                <QuestionsList
                  {...p}
                  sorts={mainSorts}
                  onPageChange={this.onPageChange}
                  onPageSizeChanged={this.onPageSizeChanged}
                  onSortChanged={this.onSortChanged}
                  onOrderChanged={this.onOrderChanged}
                />
              </div>
        }
        <RelatedTagsContainer />
      </div>
    </>
  }
};

const mapStateToProps = ({ questionsPage }) => {
  return questionsPage;
}

const mapDispatchToProps = {
  getQuestions,
  setCurrentPage: setCurrentQuestionsPage,
  setPageSize: setQuestionsPageSize,
  setOrder: setQuestionsOrder,
  setSort: setQuestionsSort
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(QuestionsListContainer);
