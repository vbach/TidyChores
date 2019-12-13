import createReducer from '../helpers/createReducer';

import {
  SET_CURRENT_USER,
  USER_INFO_PENDING,
  USER_INFO_ERROR,
  USER_INFO_SUCCESS
} from '../actionTypes';

const isEmpty = require('is-empty');

const initialState = {
  // will hold each item with ids as keys
  userId: {},
  // an array of all the ids
  allUserIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: {}
};

function setCurrentUser(state, action) {
  return {
    ...state,
    isAuthenticated: !isEmpty(action.payload),
    user: action.payload
  };
}

function viewUser(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function userSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    userId: {
      ...state.userId,
      ...action.data.reduce(
        (users, user) => ({
          // keep the current object
          ...users,
          // add the item id as the key and an item object for loading
          [user.id]: {
            data: user,
            isLoading: false,
            // loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allUserIds: [
      ...new Set([...state.allUserIds, ...action.data.map(user => user.id)])
    ]
  };
}

function userError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

export default createReducer(initialState, {
  [SET_CURRENT_USER]: setCurrentUser,
  [USER_INFO_PENDING]: viewUser,
  [USER_INFO_SUCCESS]: userSuccess,
  [USER_INFO_ERROR]: userError
});
