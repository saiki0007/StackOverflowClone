import React from "react";
import SideBar from "../../side-bar";
import {QuestionsListContainer} from "../../../containers";

export default function TaggedQuestionsPage() {
  return (
    <section className="questions">
      <div className="container">
        <div className="page__container">
          <SideBar />
          <QuestionsListContainer isTagged={true} />
        </div>
      </div>
    </section>
  );
};