import createReducer from '../helpers/createReducer';

import { SET_CURRENT_USER } from '../actionTypes';

const isEmpty = require('is-empty');

const initialState = {
  error: null,
  isAuthenticated: false,
  user: {},
  loggedIn: !!localStorage.getItem('token')
};

function setCurrentUser(state, action) {
  return {
    ...state,
    isAuthenticated: !isEmpty(action.payload),
    user: action.payload
  };
}

export default createReducer(initialState, {
  [SET_CURRENT_USER]: setCurrentUser
});
