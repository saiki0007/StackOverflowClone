import React from 'react';
import {Link} from 'react-router-dom';
import {getDateFormat, getShortenNumber} from '../../utils';
import {RelatedTagsContainer} from '../../containers';
import Comments from '../comments';
import UserInfoCard from '../user-info-card';
import ScoreController from '../score-controller';
import { AnswersContainer } from '../../containers';
import './question.scss';

export default function Question({ question }) {
  const {comments, owner} = question;

  const isClosedQuestion = () => {
    if (question.closed_details) {
      return <div className="closed-question">
        <div className="flex-content">
          <div className="closed-icon">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <path d="M16 9a2 2 0 00-2-2V6A5 5 0 004 6v1a2 2 0 00-2 2v6c0 1.1.9 2 2 2h10a2 2 0 002-2V9zm-7 5a2 2 0 110-4 2 2 0 010 4zm3.1-7H5.9V6a3.1 3.1 0 016.2 0v1z"></path>
            </svg>
          </div>
          <div className="closed-reason">
            <strong>Locked. </strong>
            <span dangerouslySetInnerHTML={{
              __html: question.closed_details.description
            }}></span>
          </div>
        </div>
        <div className="closed-date">Closed {getDateFormat(question.closed_date)}</div>
      </div>
    }
    return null;
  };

  return (
    <div className="page__content">
      <div className="question__header">
        <h1 dangerouslySetInnerHTML={{
          __html: question.title
        }} />
        <div className="activity-block">
          <div>
            <span className="activity-type">Asked</span>
            <time datatime={new Date(question.creation_date).toISOString()}>
              {getDateFormat(question.creation_date)}
            </time>
          </div>
          <div>
            <span className="activity-type">Active</span>
            <time datatime={new Date(question.last_activity_date ?? question.creation_date).toISOString()}>
              {getDateFormat(question.last_activity_date ?? question.creation_date)}
            </time>
          </div>
          <div>
            <span className="activity-type">Viewed</span>
            <time datatime={new Date(question.view_count).toISOString()}>
              {getShortenNumber(question.view_count)}
              <span>times</span>
            </time>
          </div>
        </div>
      </div>
      <div className="flex-content">
        <div className="question__mainbar">
          <div className="question__block">
            <div className="flex-content">
              <ScoreController score={question.score} closedDetails={question.closed_details} />
              <div className="grow-content">
                {isClosedQuestion()}
                <div className="content__body"
                  dangerouslySetInnerHTML={{
                  __html: question.body
                }}></div>
                <div className="question__tags">
                  {
                    question.tags.map(el => {
                      return <Link
                        key={el}
                        className="post-tag"
                        to={`/questions/tagged/${el}`}
                        title={`show questions tagged '${el}'`}>{el}</Link>
                    })
                  }
                </div>
                <UserInfoCard infoType="asked" owner={owner} date={question.creation_date}/>
                {comments ? <Comments comments={comments}/> : null}
              </div>
            </div>
            {
              question.answers ? <AnswersContainer
                  answers={question.answers}
                  answersCount={question.answer_count}
              /> : null
            }
          </div>
        </div>
        <div className="question__sidebar">
          <RelatedTagsContainer />
        </div>
      </div>
    </div>
  );
}