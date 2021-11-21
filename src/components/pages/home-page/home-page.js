import React from 'react';
import { QuestionsListContainer } from '../../../containers';
import SideBar from '../../side-bar';

import './home-page.scss';

const HomePage = () => {
  return (
    <section className="questions">
      <div className="container">
        <div className="page__container">
          <SideBar />
          <QuestionsListContainer />
        </div>
      </div>
    </section>
  );
};

export default HomePage;