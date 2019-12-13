import API from '../../API';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../helpers/setAuthToken';
import {
  SIGNUP_USER_PENDING,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_PENDING,
  SET_CURRENT_USER
} from '../actionTypes';

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
          dispatch({ type: LOGIN_SUCCESS }, setCurrentUser(decoded));
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
      dispatch({ type: LOGIN_SUCCESS }, setCurrentUser(decoded));
    });
  };
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
