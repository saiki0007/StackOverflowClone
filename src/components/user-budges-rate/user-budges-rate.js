import React from "react";
import {getShortenNumber} from "../../utils";
import './user-budges-rate.scss';

export default function UserBudgesRate({owner}) {
  return <div className="flex-content">
    <span className="reputation-score" title={`reputation score ${owner.reputation}`}>
      {getShortenNumber(owner.reputation)}
    </span>
    <span title={`${owner.badge_counts.gold} gold badges`} className="badge-block">
      <div className="user-badge1 user-badge"></div>
      <span className="badgecount">{owner.badge_counts.gold}</span>
    </span>
    <span title={`${owner.badge_counts.silver} silver badges`} className="badge-block">
      <div className="user-badge2 user-badge"></div>
      <span className="badgecount">{owner.badge_counts.silver}</span>
    </span>
    <span title={`${owner.badge_counts.bronze} bronze badges`} className="badge-block">
      <div className="user-badge3 user-badge"></div>
      <span className="badgecount">{owner.badge_counts.bronze}</span>
    </span>
  </div>
}