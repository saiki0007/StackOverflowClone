import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getTags, setCurrentTagsPage, setTagsOrder, setTagsSort} from '../reducers/tags-page-reducer';
import {getApiUrl, tagsSorts} from '../utils';
import Spinner from '../components/spinner';
import ErrorIndicator from '../components/error-indicator';
import TagsList from "../components/tags-list";

const TAGS_PAGE_FILTER = "!*MM6j(K1BHzJszD4";

class TagsListContainer extends Component {
  componentDidMount() {
    const {currentPage, getTags, order, sort} = this.props;

    getTags(getApiUrl("tags", {
      page: currentPage,
      pagesize: 36,
      order,
      sort,
      filter: TAGS_PAGE_FILTER
    }));
  }

  onPageChange = (pageNumber) => {
    const {getTags, setCurrentTagsPage, order, sort} = this.props;

    setCurrentTagsPage(pageNumber);
    getTags(getApiUrl("tags", {
      page: pageNumber,
      pagesize: 36,
      order,
      sort,
      filter: TAGS_PAGE_FILTER
    }));
  }

  onSortChanged = (sort) => {
    const {
      setTagsSort, setCurrentTagsPage,
      getTags, order
    } = this.props;

    setTagsSort(sort);
    setCurrentTagsPage(1);
    getTags(getApiUrl("tags", {
      page: 1,
      pagesize: 36,
      order,
      sort,
      filter: TAGS_PAGE_FILTER
    }));
  }

  onOrderChanged = (order) => {
    const {
      setTagsOrder, setCurrentTagsPage,
      getTags, sort
    } = this.props;

    setTagsOrder(order);
    setCurrentTagsPage(1);
    getTags(getApiUrl("tags", {
      page: 1,
      pagesize: 36,
      order,
      sort,
      filter: TAGS_PAGE_FILTER
    }));
  }

  render() {
    const p = this.props;
    console.log(this.props);
    return <>
      <div className="flex-content">
        {
          p.loading ? <Spinner/> :
            p.error ? <ErrorIndicator error={p.error}/> :
              <div className="tags__mainbar">
                <TagsList
                  {...p}
                  sorts={tagsSorts}
                  onPageChange={this.onPageChange}
                  onSortChanged={this.onSortChanged}
                  onOrderChanged={this.onOrderChanged}
                />
              </div>
        }
      </div>
    </>
  }
};

const mapStateToProps = ({tagsPage}) => {
  return tagsPage;
}

const mapDispatchToProps = {
  getTags,
  setCurrentTagsPage,
  setTagsOrder,
  setTagsSort
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(TagsListContainer);
