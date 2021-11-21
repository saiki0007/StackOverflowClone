import sofService from '../services/sof-service';

const QUESTIONS_LOADED = 'QUESTIONS_LOADED';
const QUESTIONS_REQUESTED = 'QUESTIONS_REQUESTED';
const QUESTIONS_ERROR = 'QUESTIONS_ERROR';
const CHANGE_CURRENT_QUESTIONS_PAGE = 'CHANGE_CURRENT_QUESTIONS_PAGE';
const CHANGE_QUESTIONS_PAGE_SIZE = 'CHANGE_QUESTIONS_PAGE_SIZE';

const SET_TOTAL_QUESTIONS_COUNT = 'SET_TOTAL_QUESTIONS_COUNT';
const SET_QUESTIONS_ORDER = 'SET_QUESTIONS_ORDER';
const SET_QUESTIONS_SORT = 'SET_QUESTIONS_SORT';

const initialState = {
  questions: [],
  loading: true,
  error: null,
  currentPage: 1,
  pageSize: 15,
  totalItems: 0,
  sort: "activity",
  order: "desc"
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONS_REQUESTED:
      return {
        ...state,
        questions: [],
        loading:true,
        error: null
      };
    case QUESTIONS_LOADED:
      return {
        ...state,
        questions: action.payload,
        loading: false,
        error: null
      };
    case QUESTIONS_ERROR:
      return {
        ...state,
        questions: [],
        loading:false,
        error: action.payload
      };
    case CHANGE_QUESTIONS_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload
      };
    case CHANGE_CURRENT_QUESTIONS_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_TOTAL_QUESTIONS_COUNT:
      return {
        ...state,
        totalItems: action.payload
      };
    case SET_QUESTIONS_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case SET_QUESTIONS_ORDER:
      return {
        ...state,
        order: action.payload
      };
    default:
      return state;
  }
};

const questionsLoaded = (newData) => ({ type: QUESTIONS_LOADED, payload: newData });
const questionsRequested = () => ({ type: QUESTIONS_REQUESTED });
const questionsError = (error) => ({ type: QUESTIONS_ERROR, payload: error });
const setTotalQuestionsCount = (totalItemsCount) => ({ type: SET_TOTAL_QUESTIONS_COUNT, payload: totalItemsCount });

export const setCurrentQuestionsPage = (newPageId) => ({ type: CHANGE_CURRENT_QUESTIONS_PAGE, payload: newPageId });
export const setQuestionsPageSize = (pageSize) => ({ type: CHANGE_QUESTIONS_PAGE_SIZE, payload: pageSize });
export const setQuestionsOrder = (order) => ({ type: SET_QUESTIONS_ORDER, payload: order });
export const setQuestionsSort = (sort) => ({ type: SET_QUESTIONS_SORT, payload: sort });

export const getQuestions = (url) => (dispatch) => {
  dispatch(questionsRequested());
  sofService.getData(url)
    .then(data => {
      dispatch(setTotalQuestionsCount(data.total));
      dispatch(questionsLoaded(data.items));
    })
    .catch(error => dispatch(questionsError(error)));
}

export default questionsReducer;