import React from 'react';
import SideBar from "../../side-bar";
import {UsersListContainer} from "../../../containers";

const UsersPage = () => {
  return  <section className="users">
    <div className="container">
      <div className="page__container">
        <SideBar />
        <div className="page__content flex-content">
          <div className="users__mainbar">
            <UsersListContainer />
          </div>
        </div>
      </div>
    </div>
  </section>
};

export default UsersPage;
