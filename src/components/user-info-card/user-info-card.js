import React from 'react';
import {Link} from 'react-router-dom';
import {getDateFormat} from '../../utils';
import UserBudgesRate from "../user-budges-rate";
import UnknownUserIcon from './unknown-user.png';
import './user-info-card.scss';

export default function UserInfoCard({ infoType, owner, date }) {
  
  if (!owner.badge_counts) {
    return (
      <div className="question__user-info">
        <div className="question__user-action-time">
          {infoType}
          <span className="relativetime">{getDateFormat(date)}</span>
        </div>
        <div className="flex-content">
          <div className="question__user-avatar">
            <img src={UnknownUserIcon} alt="Unknown User" width="32" height="32"/>
          </div>
          <div className="question__user-details">
            {owner.display_name}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="question__user-info">
      <div className="question__user-action-time">
        {infoType}
        <span className="relativetime">{getDateFormat(date)}</span>
      </div>
      <div className="flex-content">
        <div className="question__user-avatar">
          <Link to={`/users/${owner.user_id}`}>
            <img src={owner.profile_image} alt={owner.display_name} width="32" height="32"/>
          </Link>
        </div>
        <div className="question__user-details">
          <Link to={`/users/${owner.user_id}`}>{owner.display_name}</Link>
          <UserBudgesRate owner={owner} />
        </div>
      </div>
    </div>
  );
}
