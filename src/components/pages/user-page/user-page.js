import React from 'react';
import { UserInfoContainer } from '../../../containers';
import SideBar from '../../side-bar';
import {
  UserPageReputationContainer,
  UserPageQuestionsContainer,
  UserPageAnswersContainer,
  UserPagePrivilegesContainer
} from "../../../containers";
import UserPageTagsContainer from "../../../containers/user-page-tags-container";

const UserPage = () => {
  return (
    <section className="user">
      <div className="container">
        <div className="page__container">
          <SideBar />
          <div className="page__content content__body">
            <UserInfoContainer />
            <ul className="user__items-container">
              <li><UserPageReputationContainer /></li>
              <li><UserPageQuestionsContainer /></li>
              <li><UserPageAnswersContainer /></li>
              <li><UserPagePrivilegesContainer /></li>
              <li><UserPageTagsContainer /></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
