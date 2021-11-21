import sofService from "../services/sof-service";

const TAGS_REQUESTED = "TAGS_REQUESTED";
const TAGS_LOADED = "TAGS_LOADED";
const TAGS_ERROR = "TAGS_ERROR";

const CHANGE_CURRENT_TAGS_PAGE = "CHANGE_CURRENT_TAGS_PAGE";
const SET_TOTAL_TAGS_COUNT = "SET_TOTAL_TAGS_COUNT";
const SET_TAGS_SORT = "SET_TAGS_SORT";
const SET_TAGS_ORDER = "SET_TAGS_ORDER";

const initialState = {
    tags: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalItems: 0,
    sort: "popular",
    order: "desc"
};

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAGS_REQUESTED:
            return {
                ...state,
                tags: [],
                loading:true,
                error: null
            };
        case TAGS_LOADED:
            return {
                ...state,
                tags: action.payload,
                loading: false,
                error: null
            };
        case TAGS_ERROR:
            return {
                ...state,
                tags: [],
                loading:false,
                error: action.payload
            };
        case CHANGE_CURRENT_TAGS_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case SET_TOTAL_TAGS_COUNT:
            return {
                ...state,
                totalItems: action.payload
            };
        case SET_TAGS_SORT:
            return {
                ...state,
                sort: action.payload
            };
        case SET_TAGS_ORDER:
            return {
                ...state,
                order: action.payload
            };
        default:
            return state;
    }
};

const tagsLoaded = (newData) => ({ type: TAGS_LOADED, payload: newData });
const tagsRequested = () => ({ type: TAGS_REQUESTED });
const tagsError = (error) => ({ type: TAGS_ERROR, payload: error });
const setTotalUsersCount = (totalItemsCount) => ({ type: SET_TOTAL_TAGS_COUNT, payload: totalItemsCount });

export const setCurrentTagsPage = (newPageId) => ({ type: CHANGE_CURRENT_TAGS_PAGE, payload: newPageId });
export const setTagsOrder = (order) => ({ type: SET_TAGS_ORDER, payload: order });
export const setTagsSort = (sort) => ({ type: SET_TAGS_SORT, payload: sort });

export const getTags = (url) => (dispatch) => {
    dispatch(tagsRequested());
    sofService.getData(url)
        .then(data => {
            dispatch(setTotalUsersCount(data.total));
            dispatch(tagsLoaded(data.items));
        })
        .catch(error => dispatch(tagsError(error)));
}

export default tagsReducer;