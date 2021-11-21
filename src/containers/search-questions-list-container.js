import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getSearchQuestions, setCurrentSearchQuestionsPage,
  setSearchQuestionsPageSize, setSearchQuestionsOrder,
  setSearchQuestionsSort
} from '../reducers/search-questions-page-reducer';
import {getApiUrl, mainSorts} from '../utils';
import Spinner from '../components/spinner';
import ErrorIndicator from '../components/error-indicator';
import QuestionsList from '../components/questions-list';
import RelatedTagsContainer from "./related-tags-container";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";

const SEARCH_QUESTIONS_PAGE_FILTER = "!-Kh.cYTW8GJ4M*0kN-AdEisqB*RpYJBsC";

class SearchQuestionsListContainer extends Component {
  getQuestionsContent = () => {
    const {currentPage, pageSize, getSearchQuestions: getQuestions, order, sort, inTitle} = this.props;

    getQuestions(getApiUrl("search", {
      page: currentPage,
      pagesize: pageSize,
      order,
      sort,
      intitle: inTitle,
      filter: SEARCH_QUESTIONS_PAGE_FILTER
    }));
  }

  componentDidMount() {
    if (this.props.inTitle !== '') {
      this.getQuestionsContent();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.inTitle !== '' && prevProps.inTitle !== this.props.inTitle) {
      this.getQuestionsContent();
    }
  }

  onPageChange = (pageNumber) => {
    const {getSearchQuestions: getQuestions, setCurrentPage, pageSize, order, sort, inTitle} = this.props;

    setCurrentPage(pageNumber);
    getQuestions(getApiUrl("search", {
      page: pageNumber,
      pagesize: pageSize,
      order,
      sort,
      intitle: inTitle,
      filter: SEARCH_QUESTIONS_PAGE_FILTER
    }));
  }

  onPageSizeChanged = (pageSize) => {
    const {
      setPageSize, setCurrentPage,
      getSearchQuestions: getQuestions, order, sort, inTitle
    } = this.props;

    setPageSize(pageSize);
    setCurrentPage(1);
    getQuestions(getApiUrl("search", {
      page: 1,
      pagesize: pageSize,
      order,
      sort,
      intitle: inTitle,
      filter: SEARCH_QUESTIONS_PAGE_FILTER
    }));
  }

  onSortChanged = (sort) => {
    const {
      setSort, setCurrentPage,
      getSearchQuestions: getQuestions, order, pageSize, inTitle
    } = this.props;

    setSort(sort);
    setCurrentPage(1);
    getQuestions(getApiUrl("search", {
      page: 1,
      pagesize: pageSize,
      order,
      sort,
      intitle: inTitle,
      filter: SEARCH_QUESTIONS_PAGE_FILTER
    }));
  }

  onOrderChanged = (order) => {
    const {
      setOrder, setCurrentPage,
      getSearchQuestions: getQuestions, sort, pageSize, inTitle
    } = this.props;

    setOrder(order);
    setCurrentPage(1);
    getQuestions(getApiUrl("search", {
      page: 1,
      pagesize: pageSize,
      order,
      sort,
      intitle: inTitle,
      filter: SEARCH_QUESTIONS_PAGE_FILTER
    }));
  }

  render() {
    const p = this.props;

    if (p.inTitle === '') {
      return <Redirect to="/"/>
    }

    return <>
      <div className="page__content flex-content">
        {
          p.loading || p.inTitle === '' ? <Spinner/> :
            p.error ? <ErrorIndicator error={p.error}/> :
              <div className="questions__mainbar">
                <h1>Questions with title <span>"{p.inTitle}"</span></h1>
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
        <RelatedTagsContainer/>
      </div>
    </>
  }
};

const mapStateToProps = ({searchQuestionsPage}) => {
  return searchQuestionsPage;
}

const mapDispatchToProps = {
  getSearchQuestions,
  setCurrentPage: setCurrentSearchQuestionsPage,
  setPageSize: setSearchQuestionsPageSize,
  setOrder: setSearchQuestionsOrder,
  setSort: setSearchQuestionsSort
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchQuestionsListContainer);
