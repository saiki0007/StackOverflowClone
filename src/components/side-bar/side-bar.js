import React from 'react';
import { NavLink } from 'react-router-dom';

import './side-bar.scss';

const SideBar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          <li>
            <NavLink
              activeClassName="sidebar__link-active"
              exact
              to="/"
              className="sidebar__nav-link home-link">Home</NavLink>
          </li>
          <ul>
            <li className="sidebar__public-item">Public</li>
            <li>
              <NavLink activeClassName="sidebar__link-active" to="/users/" className="sidebar__nav-link">Users</NavLink>
            </li>
            <li>
              <NavLink activeClassName="sidebar__link-active" to="/tags/" className="sidebar__nav-link">Tags</NavLink>
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;