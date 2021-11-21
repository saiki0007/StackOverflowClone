import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import StackLogo from './logo-stackoverflow.svg';
import { SearchContainer } from "../../containers";
import SideBar from "../side-bar";

const Header = ({ onLogInClick, isAuth, meInfo, loading, error }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const onShowSearch = () => {
    setShowSearch((state) => !state);
  }

  const onShowMenu = () => {
    setShowMenu((state) => !state);
  }

  return (
    <header className="header">
      <div className="container header__container">
        <button className="header__menu-btn" onClick={onShowMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="20" height="20" viewBox="0 0 384 384">
            <rect x="0" y="277.333" width="384" height="42.667"/>
            <rect x="0" y="170.667" width="384" height="42.667"/>
            <rect x="0" y="64" width="384" height="42.667"/>
          </svg>
        </button>
        <div className="header__row">
          <Link to="/" className="header__logo">
            <img src={StackLogo} alt="Stack Overflow logo" />
          </Link>
          <div className="header__full-search-block">
            <SearchContainer />
            <div className={`header__mobile-search-btn${showSearch ? ' active-search-mobile' : ''}`}>
              <button onClick={onShowSearch}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M18 16.5l-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 112 7a5 5 0 0110 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          {
            !isAuth ? <button className="btn header__login-btn" onClick={onLogInClick}>
              Log in
            </button> : loading ? <div>Loading...</div> : error ? <div>error</div> :
              <Link to={`/users/${meInfo.user_id}`} className="my-info">
                <div>
                  <div className="my-avatar">
                    <img src={meInfo.profile_image} width="24" height="24" alt="I am"/>
                  </div>
                  <div className="my-reputation">
                    {meInfo.reputation}
                  </div>
                </div>
              </Link>
          }
        </div>
      </div>
      <div className={`header__mobile-search-block${showSearch ? ' active-search-mobile' : ''}`}>
        <SearchContainer />
      </div>
      <div className={`sidebar__mobile${showMenu ? ' active-menu-mobile' : ''}`}>
        <div className="sidebar__mobile-overlay" onClick={onShowMenu}/>
        <SideBar />
      </div>
    </header>
  );
};

export default Header;