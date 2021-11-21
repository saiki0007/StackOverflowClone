import React from 'react';

import './users-item.scss';
import UserBudgesRate from "../user-budges-rate";
import {Link} from "react-router-dom";
import './users-item.scss';

const UsersItem = ({data}) => {
  return <div className="users__item">
    <div className="users__item-preview">
      <div className="users__preview-avatar">
        <Link to={`./${data.user_id}`}>
          <img src={data.profile_image} width="48" height="48" alt={data.display_name} />
        </Link>
      </div>
      <div className="users__preview-details">
        <div className="users__preview-name">
          <Link to={`./${data.user_id}`}
            dangerouslySetInnerHTML={{
              __html: data.display_name
            }} />
        </div>
        <div className="users__preview-location"
          dangerouslySetInnerHTML={{
          __html: data.location
        }} />
        <div className="users__preview-reputation">{data.reputation}</div>
      </div>
    </div>
    <div className="users__item-full">
      <div className="users__full-header">
        <div className="users__full-avatar">
          <Link to={`./${data.user_id}`}>
            <img src={data.profile_image} width="64" height="64" alt={data.display_name} />
          </Link>
        </div>
        <div className="users__full-header-details">
          <div className="users__full-header-name">
            <Link to={`./${data.user_id}`}
              dangerouslySetInnerHTML={{
              __html: data.display_name
            }} />
          </div>
          <div className="users__full-header-rate">
            <UserBudgesRate owner={data}/>
          </div>
          <div className="users__full-header-location">{data.location}</div>
          <div className="users__full-header-website">
            <a href={data.website_url} target="_blank" rel="noopener noreferrer">
              <p>{data.website_url}</p>
            </a>
          </div>
        </div>
      </div>
      <div className="users__full-body">
        <div className="users__full-body-desc"
             dangerouslySetInnerHTML={{
          __html: data.about_me
        }} />
      </div>
    </div>

  </div>
};

export default UsersItem;