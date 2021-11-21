import React from 'react';
import { mainSorts } from '../../utils';
import Sorts from '../sorts';
import Pagination from '../pagination';
import ScoreController from '../score-controller';
import UserInfoCard from '../user-info-card';
import Comments from '../comments';
import './answers.scss';

export default function Answers(props) {
  const getAnswersList = () => {
    return props.answers.map(el => {
      return <li key={el.answer_id} className="answers__item">
        <div className="flex-content">
          <ScoreController score={el.score} isAccepted={el.is_accepted} />
          <div className="grow-content">
            <div className="content__body"
              dangerouslySetInnerHTML={{
              __html: el.body
            }}></div>
            <UserInfoCard infoType="answered" owner={el.owner} date={el.creation_date}/>
            {el.comments ? <Comments comments={el.comments} /> : null}
          </div>
        </div>
      </li>
    })
  }

  return (
    <div className="answers">
      <div className="answers__header">
        <Sorts
          totalItems={`${props.answersCount} Answers`}
          onSortChanged={props.onSortChanged}
          onOrderChanged={props.onOrderChanged}
          sorts={mainSorts}
          currentSort={props.sort}
          currentOrder={props.order}
          loading={false} />
      </div>
        {
            props.answersCount > 30 ? <div className="pagination">
                <Pagination
                    totalItems={props.answersCount}
                    pageSize="30"
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}/>
            </div> : null
        }
      <ul>
        {getAnswersList()}
      </ul>
    </div>
  );
}
