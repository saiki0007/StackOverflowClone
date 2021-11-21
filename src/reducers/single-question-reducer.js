import sofService from "../services/sof-service";

const QUESTION_LOADED = 'QUESTION_LOADED';
const QUESTION_REQUESTED = 'QUESTION_REQUESTED';
const QUESTION_ERROR = 'QUESTION_ERROR';

const initialState = {
  question: {},
  loading: true,
  error: null,
};

const singleQuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_REQUESTED:
      return {
        ...state,
        question: {},
        loading:true,
        error: null
      };
    case QUESTION_LOADED:
      return {
        ...state,
        question: action.payload,
        loading: false,
        error: null
      };
    case QUESTION_ERROR:
      return {
        ...state,
        question: {},
        loading:false,
        error: action.payload
      };
    default:
      return state;
  }
};

const questionLoaded = (newData) => ({ type: QUESTION_LOADED, payload: newData });
const questionRequested = () => ({ type: QUESTION_REQUESTED });
const questionError = (error) => ({ type: QUESTION_ERROR, payload: error });

export const getQuestion = (url) => (dispatch) => {
  dispatch(questionRequested());
  sofService.getData(url)
      .then(data => {
        dispatch(questionLoaded(data.items[0]));
      })
      .catch(error => dispatch(questionError(error)));
};

export default singleQuestionReducer;