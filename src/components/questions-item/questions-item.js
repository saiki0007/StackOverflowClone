import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { decode } from 'he';
import { getShortenNumber, getDateFormat } from '../../utils';

import './questions-item.scss';

const QuestionsItem = ({ data }) => {

  function isAnswered(isAnswered, answerCount) {
    let activeClases = 'status';

    if (isAnswered) {
      activeClases += ' answered-accepted';
    }
    if (answerCount > 0) {
      activeClases += ' answered';
    }
    return activeClases;
  }

  return (
    <Fragment>
      <div className="stats-container">
        <div className="votes">
          <div className="mini-counts"><span>{data.score}</span></div>
          <div>vote{data.score !== 1 ? 's' : ''}</div>
        </div>
        <div className={isAnswered(data.is_answered, data.answer_count)}>
          <div className="mini-counts"><span>{data.answer_count}</span></div>
          <div>answer{data.answer_count !== 1 ? 's' : ''}</div>
        </div>
        <div className="views">
          <div className="mini-counts">
            <span>
              {getShortenNumber(data.view_count)}
            </span>
          </div>
          <div>view{data.view_count !== 1 ? 's' : ''}</div>
        </div>
      </div>
      <div className="summary">
          <h3>
            <Link to={`/questions/${data.question_id}`} className="question-hyperlink">
              {decode(data.title)}
            </Link>
          </h3>
          <div className="tags">
            {
              data.tags.map(tag => 
                <Link
                  key={tag}
                  to={`/questions/tagged/${tag}`}
                  className="post-tag"
                  title={`show questions tagged '${tag}'`}
                  rel="tag"
                >{tag}</Link>
              )
            }
          </div>
          <div className="started">
            <Link to={`/questions/${data.question_id}`} className="started-link">
              <span className="relativetime">
                asked&nbsp;
                {getDateFormat(data.creation_date)}
              </span>
            </Link>
            <Link to={`/users/${data.owner.user_id}`}>
              {data.owner.display_name} 
            </Link>
            <span className="reputation-score" title="reputation score">
              {` ${data.owner.reputation}`}
            </span>
        </div>
      </div>
    </Fragment>
  );
};

export default QuestionsItem;