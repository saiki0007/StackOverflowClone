import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  questionsReducer,
  singleQuestionReducer,
  usersReducer,
  tagsReducer,
  searchQuestionsReducer,
  authReducer } from './reducers';

const reducers = combineReducers({
  questionsPage: questionsReducer,
  singleQuestionPage: singleQuestionReducer,
  usersPage: usersReducer,
  tagsPage: tagsReducer,
  searchQuestionsPage: searchQuestionsReducer,
  auth: authReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
