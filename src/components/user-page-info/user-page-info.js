import React from "react";
import { numberWithCommas, getDateFormat } from "../../utils";
import './user-page-info.scss';

export default function UserPageInfo({ data }) {
  return <>
    <div className="user__info-block flex-content">
      <div className="user__info-avatar-block">
        <div className="user__info__avatar">
          <img src={data.profile_image} alt={data.display_name} width="128" height="128" />
        </div>
        <div className="user__info-reputation">
          <div>{numberWithCommas(data.reputation)}</div>
          <span>reputation</span>
        </div>
        <div className="user__info-budges">
          <span title={`${data.badge_counts.gold} gold badges`} className="badge-block">
            <div className="user-badge1 user-badge"></div>
            <span className="badgecount">{data.badge_counts.gold}</span>
          </span>
          <span title={`${data.badge_counts.silver} silver badges`} className="badge-block">
            <div className="user-badge2 user-badge"></div>
            <span className="badgecount">{data.badge_counts.silver}</span>
          </span>
          <span title={`${data.badge_counts.bronze} bronze badges`} className="badge-block">
            <div className="user-badge3 user-badge"></div>
            <span className="badgecount">{data.badge_counts.bronze}</span>
          </span>
        </div>
      </div>
      <div className="user__info-about-block">
        <div className="user__info-name">
          {data.display_name}
        </div>
        <div className="user__info-about"
          dangerouslySetInnerHTML={{
            __html: data.about_me
        }}/>
      </div>
      <div className="user__info-details-block">
        <div className="user__info-posts flex-content">
          <div className="user__info-count-block">
            <div className="user__info-number">{numberWithCommas(data.answer_count)}</div>
            <div className="user__info-label">answer{data.answer_count !== 1 ? 's' : ''}</div>
          </div>
          <div className="user__info-count-block">
            <div className="user__info-number">{numberWithCommas(data.question_count)}</div>
            <div className="user__info-label">question{data.answer_count !== 1 ? 's' : ''}</div>
          </div>
        </div>
        {
          data.location ? <div className="user__info-item">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <path d="M2 6.38C2 9.91 8.1 17.7 8.1 17.7c.22.29.58.29.8 0 0 0 6.1-7.8 6.1-11.32A6.44 6.44 0 008.5 0 6.44 6.44 0 002 6.38zm9.25.12a2.75 2.75 0 11-5.5 0 2.75 2.75 0 015.5 0z"></path>
            </svg>
            <span dangerouslySetInnerHTML={{
              __html: data.location
            }} />
          </div> : null
        }
        <div className="user__info-item">
          <svg aria-hidden="true" width="19" height="18" viewBox="0 0 19 18">
            <path d="M3 9a8 8 0 113.73 6.77L8.2 14.3A6 6 0 105 9l3.01-.01-4 4-4-4h3L3 9zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5z"></path>
          </svg>
          <span>Member from {getDateFormat(data.creation_date)}</span>
        </div>
        <div className="user__info-item">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
            <path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 002 2z"></path>
          </svg>
          <span>{numberWithCommas(data.view_count)} profile view{data.view_count !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  </>;
}
