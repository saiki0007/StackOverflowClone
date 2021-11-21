import sofService from "../services/sof-service";

const ME_LOADED = 'ME_LOADED';
const ME_REQUESTED = 'ME_REQUESTED';
const ME_ERROR = 'ME_ERROR';

const SET_IS_AUTH = "SET_IS_AUTH";
const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

const initialState = {
  info: {},
  loading: true,
  error: null,
  isAuth: false,
  accessToken: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ME_REQUESTED:
      return {
        ...state,
        info: {},
        loading:true,
        error: null
      };
    case ME_LOADED:
      return {
        ...state,
        info: action.payload,
        loading: false,
        error: null
      };
    case ME_ERROR:
      return {
        ...state,
        info: {},
        loading:false,
        error: action.payload
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    default:
      return state;
  }
};

const meLoaded = (newData) => ({ type: ME_LOADED, payload: newData });
const meRequested = () => ({ type: ME_REQUESTED });
const meError = (error) => ({ type: ME_ERROR, payload: error });

export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, payload: isAuth });
export const setAccessToken = (token) => ({ type: SET_ACCESS_TOKEN, payload: token });

export const getOwnInfo = (url) => (dispatch) => {
  dispatch(meRequested());
  sofService.getData(url)
    .then(data => {
      dispatch(meLoaded(data.items[0]));
    })
    .catch(error => dispatch(meError(error)));
}

export default authReducer;