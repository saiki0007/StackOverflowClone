import sofService from "../services/sof-service";

const USERS_REQUESTED = "USERS_REQUESTED";
const USERS_LOADED = "USERS_LOADED";
const USERS_ERROR = "USERS_ERROR";

const CHANGE_CURRENT_USERS_PAGE = "CHANGE_CURRENT_USERS_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_SORT = "SET_USERS_SORT";
const SET_USERS_ORDER = "SET_USERS_ORDER";

const initialState = {
    users: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalItems: 0,
    sort: "reputation",
    order: "desc"
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_REQUESTED:
            return {
                ...state,
                users: [],
                loading:true,
                error: null
            };
        case USERS_LOADED:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case USERS_ERROR:
            return {
                ...state,
                users: [],
                loading:false,
                error: action.payload
            };
        case CHANGE_CURRENT_USERS_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalItems: action.payload
            };
        case SET_USERS_SORT:
            return {
                ...state,
                sort: action.payload
            };
        case SET_USERS_ORDER:
            return {
                ...state,
                order: action.payload
            };
        default:
            return state;
    }
};

const usersLoaded = (newData) => ({ type: USERS_LOADED, payload: newData });
const usersRequested = () => ({ type: USERS_REQUESTED });
const usersError = (error) => ({ type: USERS_ERROR, payload: error });
const setTotalUsersCount = (totalItemsCount) => ({ type: SET_TOTAL_USERS_COUNT, payload: totalItemsCount });

export const setCurrentUsersPage = (newPageId) => ({ type: CHANGE_CURRENT_USERS_PAGE, payload: newPageId });
export const setUsersOrder = (order) => ({ type: SET_USERS_ORDER, payload: order });
export const setUsersSort = (sort) => ({ type: SET_USERS_SORT, payload: sort });

export const getUsers = (url) => (dispatch) => {
    dispatch(usersRequested());
    sofService.getData(url)
        .then(data => {
            dispatch(setTotalUsersCount(data.total));
            dispatch(usersLoaded(data.items));
        })
        .catch(error => dispatch(usersError(error)));
}

export default usersReducer;