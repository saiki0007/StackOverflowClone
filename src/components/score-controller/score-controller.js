import React from 'react';
import './score-controller.scss';
import {onDownVote, onUpVote} from "../../utils";

export default function ScoreController({ score, isAccepted, closedDetails }) {

  if (closedDetails) {
    return (
        <div className="question__votecell">
          <div>
            <div className="vote-count">{score}</div>
            <div className="vote-label">votes</div>
          </div>
        </div>
    );
  }

  return (
    <div className="question__votecell">
      <div>
        <button
          className="vote-up-btn vote-btn"
          onClick={onUpVote}>
          <svg
            aria-hidden="true"
            className="svg-icon iconArrowUpLg"
            width="36"
            height="36"
            viewBox="0 0 36 36">
            <path d="M2 26h32L18 10 2 26z"></path>
          </svg>
        </button>
        <div className="vote-count">{score}</div>
        <button
          className="vote-down-btn vote-btn"
          onClick={onDownVote}>
          <svg
            aria-hidden="true"
            className="svg-icon iconArrowDownLg"
            width="36"
            height="36"
            viewBox="0 0 36 36">
            <path d="M2 10h32L18 26 2 10z"></path>
          </svg>
        </button>
        {
          isAccepted ? <div className="answer__accepted">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <path d="M6 14l8 8L30 6v8L14 30l-8-8v-8z"></path>
            </svg>
          </div> : null
        }
      </div>
    </div>
  );
}
