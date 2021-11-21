import React from 'react';

import QuestionsItem from '../questions-item';
import Pagination from '../pagination';
import PageSize from '../page-size';
import Sorts from '../sorts';
import { numberWithCommas } from '../../utils';

import './questions-list.scss';

const QuestionsList = (p) => {
  return (
    <>
      <Sorts
        totalItems={`${numberWithCommas(p.totalItems)} questions`}
        onSortChanged={p.onSortChanged}
        onOrderChanged={p.onOrderChanged}
        sorts={p.sorts}
        currentSort={p.sort}
        currentOrder={p.order}
        loading={p.loading}/>
      <ul className="questions__list">
        {
          p.questions.map((question) => {
            return (
              <li key={question.question_id}>
                <QuestionsItem data={question} />
              </li>
            )
          })
        }
      </ul>
      <div className="pagination">
        <Pagination
          currentPage={p.currentPage}
          pageSize={p.pageSize}
          totalItems={p.totalItems}
          setCurrentPage={p.onPageChange} />
        <PageSize
          pageSize={p.pageSize}
          onPageSizeChanged={p.onPageSizeChanged} />
      </div>
      
    </>
  );
}

export default QuestionsList;