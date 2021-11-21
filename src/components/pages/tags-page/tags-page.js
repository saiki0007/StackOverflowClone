import React from 'react';
import SideBar from "../../side-bar";
import {TagsListContainer} from "../../../containers";

const TagsPage = () => {
  return  <section className="tags">
    <div className="container">
      <div className="page__container">
        <SideBar />
        <div className="page__content flex-content">
          <div className="tags__mainbar">
            <TagsListContainer />
          </div>
        </div>
      </div>
    </div>
  </section>
};

export default TagsPage;