import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HomePage, UsersPage, TagsPage, QuestionPage, TaggedQuestionsPage, UserPage, SearchPage } from '../pages';
import {HeaderContainer} from "../../containers";

function App() {
  return (
    <>
      <HeaderContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users/" component={UsersPage} />
        <Route exact path="/tags/" component={TagsPage} />
        <Route exact path="/questions/:id" component={QuestionPage} />
        <Route exact path="/users/:id" component={UserPage} />
        <Route exact path="/questions/tagged/:tagName" component={TaggedQuestionsPage} />
        <Route exact path="/search/" component={SearchPage} />
        <Redirect from='/Stack-Overflow-Clone/' to="/" />
        {/* <Redirect to="/" /> */}
      </Switch>
      <Route exact path="/blank" />
    </>
  );
}

export default App;
