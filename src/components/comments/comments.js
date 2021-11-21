import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDateFormat } from '../../utils';
import './comments.scss';

export default function Comments({ comments }) {
  comments.sort((a, b) => b.creation_date - a.creation_date);
  
  const [isShowAll, setShowAll] = useState(comments.length > 5 ? false : true);
  
  const onShowMoreClick = () => {
    setShowAll(true);
  }

  const getCommentsToShow = (count) => {
    const res = [];

    for (let i = 0; i < count; i++) {
      res.push((
        <li key={comments[i].comment_id} className="comment">
          <div
            className="comment__score"
            title="number of 'useful comment' votes received">
            {comments[i].score}
          </div>
          <div className="comment__body">
            <span
              dangerouslySetInnerHTML={{
              __html: comments[i].body
            }}/>
            <span className="comment__br">–</span>
            <Link className="comment__owner" to={`/users/${comments[i].owner.user_id}`}>{comments[i].owner.display_name}</Link>
            <span className="comment__date">
              {getDateFormat(comments[i].creation_date)}
            </span>
          </div>
        </li>
      ));
    }

    return res;
  }

  return (
    <div className="comments">
      <ul className='comments__list'>
        {isShowAll ? getCommentsToShow(comments.length) : getCommentsToShow(5)}
      </ul>
      {
        isShowAll ? null : <button onClick={onShowMoreClick}>
          show {comments.length - 5} more comments
        </button>
      }
      <div className="comments__notice">comments here</div>
    </div>
  );
}
