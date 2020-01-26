import API from '../../API';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../helpers/setAuthToken';
import {
  SIGNUP_USER_PENDING,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_PENDING,
  SET_CURRENT_USER,
  USER_INFO_PENDING,
  USER_INFO_ERROR,
  USER_INFO_SUCCESS,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../actionTypes';
const CACHE_TIME = 1000 * 60 * 5;
export const signUpUser = (userData, history) => {
  return dispatch => {
    dispatch({ type: SIGNUP_USER_PENDING });
    API.post('/users/signup', userData)
      .then(res => {
        dispatch({ type: SIGNUP_USER_SUCCESS });
      })
      .then(res => {
        let email = userData.email;
        let password = userData.password;
        let credentials = { email, password };
        API.post('/users/login', credentials).then(res => {
          const { token } = res.data;
          localStorage.setItem('jwtToken', token);
          setAuthToken(token);
          const decoded = jwtDecode(token);
          dispatch(
            { type: SET_CURRENT_USER, LOGIN_SUCCESS },
            setCurrentUser(decoded)
          );
        });
      })
      .catch(err =>
        dispatch({
          type: SIGNUP_USER_ERROR
        })
      );
  };
};

export const loginUser = credentials => {
  return dispatch => {
    dispatch({ type: LOGIN_PENDING });

    API.post('/users/login', credentials).then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);

      dispatch(setCurrentUser({ decoded }), {
        type: SET_CURRENT_USER,
        LOGIN_SUCCESS
      });
    });
  };
};

export const forgotPassword = email => ({
  types: [
    FORGOT_PASSWORD_PENDING,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR
  ],
  // function used to call api
  callAPI: () => API.post('/users/forgotPassword', email)
});

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const fetchUserInfo = () => ({
  types: [USER_INFO_PENDING, USER_INFO_SUCCESS, USER_INFO_ERROR],
  // function used to call api
  callAPI: () => API.get('/users'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.users;
    // if user is currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have a child or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
