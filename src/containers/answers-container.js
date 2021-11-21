import React, { Component } from 'react';
import Answers from '../components/answers';

class AnswersContainer extends Component {
  state = {
    answers: this.props.answers,
    sort: 'activity',
    order: 'desc',
    currentPage: 1
  }

  componentDidMount() {
    this.setSortedAnswers(this.state.sort);
  }

  setSortedAnswers = (sort, order) => {
    
    const sortByActivity = (a, b) => {
      if (order === 'asc') {
        return a.last_activity_date - b.last_activity_date;
      }
      return b.last_activity_date - a.last_activity_date;
    }
  
    const sortByVotes = (a, b) => {
      if (order === 'asc') {
        return a.score - b.score;
      }
      return b.score - a.score;
    }
  
    const sortByCreation = (a, b) => {
      if (order === 'asc') {
        return a.creation_date - b.creation_date;
      }
      return b.creation_date - a.creation_date;
    }

    this.setState(state => {
      switch (sort) {
        case 'activity':
          return {
            ...state,
            answers: state.answers.sort(sortByActivity)
          };
        case 'votes':
          return  {
            ...state,
            answers: state.answers.sort(sortByVotes)
          };
        case 'creation':
          return  {
            ...state,
            answers: state.answers.sort(sortByCreation)
          };
        default:
          return state;
      }
    });
  }

  setCurrentPage = (currentPage) => {
    this.setState({currentPage});
  }

  onSortChanged = (sort) => {
    this.setState({sort});
    this.setSortedAnswers(sort, this.state.order);
  }

  onOrderChanged = (order) => {
    this.setState({order});
    this.setSortedAnswers(this.state.sort, order);
  }

  getAnswersByCurrentPage = () => {
    const trimStart = (this.state.currentPage - 1) * 30;
    const trimEnd = trimStart + 30;
    return this.state.answers.slice(trimStart, trimEnd);
  }

  render() {
    return <Answers
      answers={this.getAnswersByCurrentPage()}
      sort={this.state.sort}
      order={this.state.order}
      onOrderChanged={this.onOrderChanged}
      onSortChanged={this.onSortChanged}
      answersCount={this.props.answersCount}
      currentPage={this.state.currentPage}
      setCurrentPage={this.setCurrentPage}
    />;
  }
};

export default AnswersContainer;
