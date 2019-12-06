import createReducer from '../helpers/createReducer';

import {
  REQ_CHORES_PENDING,
  REQ_CHORES_SUCCESS,
  REQ_CHORES_ERROR,
  REQ_CHORE_PENDING,
  REQ_CHORE_SUCCESS,
  REQ_CHORE_ERROR,
  ADD_CHORE_PENDING,
  ADD_CHORE_SUCCESS,
  ADD_CHORE_ERROR,
  UPDATE_CHORE_PENDING,
  UPDATE_CHORE_SUCCESS,
  UPDATE_CHORE_ERROR,
  DELETE_CHORE_PENDING,
  DELETE_CHORE_SUCCESS,
  DELETE_CHORE_ERROR
} from '../actionTypes';

const initialState = {
  // will hold each item with ids as keys
  choreId: {},
  // an array of all the ids
  allChoreIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null
};

function choresPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function choresSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    choreId: {
      ...state.choreId,
      ...action.data.reduce(
        (chores, chore) => ({
          // keep the current object
          ...chores,
          // add the item id as the key and an item object for loading
          [chore.id]: {
            data: chore,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allChoreIds: [
      ...new Set([...state.allChoreIds, ...action.data.map(chore => chore.id)])
    ]
  };
}

function choresError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

////////////////////

function chorePending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    choreId: {
      ...state.choreId,
      [action.payload.id]: {
        ...state.choreId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function choreSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    choreId: {
      ...state.choreId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allChoreIds: [...new Set([...state.allChoreIds, action.payload.id])]
  };
}

function choreError(state, action) {
  // clear loading and set error
  return {
    ...state,
    choreId: {
      ...state.choreId,
      [action.payload.id]: {
        ...state.choreId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

export default createReducer(initialState, {
  [REQ_CHORES_PENDING]: choresPending,
  [REQ_CHORES_SUCCESS]: choresSuccess,
  [REQ_CHORES_ERROR]: choresError,
  [REQ_CHORE_PENDING]: chorePending,
  [REQ_CHORE_SUCCESS]: choreSuccess,
  [REQ_CHORE_ERROR]: choreError,
  [ADD_CHORE_PENDING]: chorePending,
  [ADD_CHORE_SUCCESS]: choreSuccess,
  [ADD_CHORE_ERROR]: choreError,
  [UPDATE_CHORE_PENDING]: chorePending,
  [UPDATE_CHORE_SUCCESS]: choreSuccess,
  [UPDATE_CHORE_ERROR]: choreError,
  [DELETE_CHORE_PENDING]: chorePending,
  [DELETE_CHORE_SUCCESS]: choreSuccess,
  [DELETE_CHORE_ERROR]: choreError
});
