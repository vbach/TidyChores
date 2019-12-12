import createReducer from '../helpers/createReducer';

import {
  SIGNUP_USER_PENDING,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_PENDING,
  LOGIN_ERROR,
  SET_CURRENT_USER
} from '../actionTypes';

const isEmpty = require('is-empty');

const initialState = {
  // // will hold each item with ids as keys
  // byId: {},
  // // an array of all the ids
  // allIds: [],
  // // needed for cache state
  // loadedAt: 0,
  // // tracking if the state is loading
  // isLoading: false,
  // // any errors loading all the data
  error: null,

  isAuthenticated: false,
  // currentUser: null,
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

// function loginPending(state, action) {
//   // set loading state and clear error
//   return {
//     ...state,
//     isAuthenticated: true,
//     isAuthenticating: true
//   };
// }

// function loginSuccess(state, action) {
//   // set loading state and clear error
//   return {
//     isAuthenticating: false,
//     isAuthenticated: true,
//     currentUser: action.user,
//     error: null
//   };
// }

// function loginError(state, action) {
//   // set loading state and clear error
//   return {
//     ...state,
//     isAuthenticated: false,
//     isAuthenticating: false,
//     error: action.err
//   };
// }

///////
// function signUpPending(state, action) {
//   // set loading state and clear error
//   return {
//     ...state,
//     isLoading: true,
//     error: null
//   };
// }

// function signUpSuccess(state, action) {
//   // clear loading and error, update cache time, add items
//   return {
//     ...state,
//     isLoading: false,
//     error: null,
//     loadedAt: Date.now(),
//     byId: {
//       ...state.byId,
//       ...action.data.reduce(
//         (users, user) => ({
//           // keep the current object
//           ...users,
//           // add the item id as the key and an item object for loading
//           [user.id]: {
//             data: user,
//             isLoading: false,
//             loadedAt: Date.now(),
//             error: null
//           }
//         }),
//         {}
//       )
//     },
//     allIds: [...new Set([...state.allIds, ...action.data.map(user => user.id)])]
//   };
// }

// function signUpError(state, action) {
//   return {
//     ...state,
//     isLoading: false,
//     error: action.err
//   };
// }

export default createReducer(initialState, {
  // [SIGNUP_USER_PENDING]: signUpPending,
  // [SIGNUP_USER_SUCCESS]: signUpSuccess,
  // [SIGNUP_USER_ERROR]: signUpError,
  // [LOGIN_PENDING]: loginPending,
  // [LOGIN_SUCCESS]: loginSuccess,
  // [LOGIN_ERROR]: loginError
  [SET_CURRENT_USER]: setCurrentUser
});
