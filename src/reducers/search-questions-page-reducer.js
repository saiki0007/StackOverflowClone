import sofService from '../services/sof-service';

const SEARCH_QUESTIONS_LOADED = 'SEARCH_QUESTIONS_LOADED';
const SEARCH_QUESTIONS_REQUESTED = 'SEARCH_QUESTIONS_REQUESTED';
const SEARCH_QUESTIONS_ERROR = 'SEARCH_QUESTIONS_ERROR';
const CHANGE_CURRENT_SEARCH_QUESTIONS_PAGE = 'CHANGE_CURRENT_SEARCH_QUESTIONS_PAGE';
const CHANGE_SEARCH_QUESTIONS_PAGE_SIZE = 'CHANGE_SEARCH_QUESTIONS_PAGE_SIZE';

const SET_TOTAL_SEARCH_QUESTIONS_COUNT = 'SET_TOTAL_SEARCH_QUESTIONS_COUNT';
const SET_SEARCH_QUESTIONS_ORDER = 'SET_SEARCH_QUESTIONS_ORDER';
const SET_SEARCH_QUESTIONS_SORT = 'SET_SEARCH_QUESTIONS_SORT';
const SET_IN_TITLE_SEARCH = 'SET_IN_TITLE_SEARCH';

const initialState = {
  questions: [],
  loading: true,
  error: null,
  currentPage: 1,
  pageSize: 15,
  totalItems: 0,
  sort: "activity",
  order: "desc",
  inTitle: ''
};

const searchQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QUESTIONS_REQUESTED:
      return {
        ...state,
        questions: [],
        loading:true,
        error: null
      };
    case SEARCH_QUESTIONS_LOADED:
      return {
        ...state,
        questions: action.payload,
        loading: false,
        error: null
      };
    case SEARCH_QUESTIONS_ERROR:
      return {
        ...state,
        questions: [],
        loading:false,
        error: action.payload
      };
    case CHANGE_SEARCH_QUESTIONS_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload
      };
    case CHANGE_CURRENT_SEARCH_QUESTIONS_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_TOTAL_SEARCH_QUESTIONS_COUNT:
      return {
        ...state,
        totalItems: action.payload
      };
    case SET_SEARCH_QUESTIONS_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case SET_SEARCH_QUESTIONS_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case SET_IN_TITLE_SEARCH:
      return {
        ...state,
        inTitle: action.payload
      };
    default:
      return state;
  }
};

const searchQuestionsLoaded = (newData) => ({ type: SEARCH_QUESTIONS_LOADED, payload: newData });
const searchQuestionsRequested = () => ({ type: SEARCH_QUESTIONS_REQUESTED });
const searchQuestionsError = (error) => ({ type: SEARCH_QUESTIONS_ERROR, payload: error });
const setTotalSearchQuestionsCount = (totalItemsCount) => ({ type: SET_TOTAL_SEARCH_QUESTIONS_COUNT, payload: totalItemsCount });

export const setCurrentSearchQuestionsPage = (newPageId) => ({ type: CHANGE_CURRENT_SEARCH_QUESTIONS_PAGE, payload: newPageId });
export const setSearchQuestionsPageSize = (pageSize) => ({ type: CHANGE_SEARCH_QUESTIONS_PAGE_SIZE, payload: pageSize });
export const setSearchQuestionsOrder = (order) => ({ type: SET_SEARCH_QUESTIONS_ORDER, payload: order });
export const setSearchQuestionsSort = (sort) => ({ type: SET_SEARCH_QUESTIONS_SORT, payload: sort });
export const setInTitleSearch = (inTitle) => ({ type: SET_IN_TITLE_SEARCH, payload: inTitle });

export const getSearchQuestions = (url) => (dispatch) => {
  dispatch(searchQuestionsRequested());
  sofService.getData(url)
    .then(data => {
      dispatch(setTotalSearchQuestionsCount(data.total));
      dispatch(searchQuestionsLoaded(data.items));
    })
    .catch(error => dispatch(searchQuestionsError(error)));
}

export default searchQuestionsReducer;