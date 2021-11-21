import React, { Component } from 'react';
import RelatedTags from '../components/related-tags';
import { withSofService } from '../components/hoc';

class RelatedTagsContainer extends Component {
  state = {
    relatedTags: [],
    loading: true,
    isShowAll: false
  }

  componentDidMount() {
    this.props.sofService.getData('tags?page=1&pagesize=25&order=desc&sort=popular&site=stackoverflow&filter=!-.G.68pqislT')
      .then(data => {
        this.setState({
          relatedTags: data.items,
          loading: false
        });
      })
  }

  onMoreBtnClick = () => {
    this.setState({ isShowAll: true });
  }

  render() {
    return <RelatedTags {...this.state} onMoreBtnClick={this.onMoreBtnClick} />
  }
}

export default withSofService()(RelatedTagsContainer);
