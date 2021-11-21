import React from "react";
import { SearchQuestionsListContainer } from '../../../containers';
import SideBar from '../../side-bar';

const SearchPage = () => {
  return (
    <section className="questions">
      <div className="container">
        <div className="page__container">
          <SideBar />
          <SearchQuestionsListContainer />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;