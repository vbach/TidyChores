import createReducer from '../helpers/createReducer';

import {
  REQ_CHILDREN_PENDING,
  REQ_CHILDREN_SUCCESS,
  REQ_CHILDREN_ERROR,
  REQ_CHILD_PENDING,
  REQ_CHILD_SUCCESS,
  REQ_CHILD_ERROR,
  ADD_CHILD_PENDING,
  ADD_CHILD_SUCCESS,
  ADD_CHILD_ERROR,
  UPDATE_CHILD_PENDING,
  UPDATE_CHILD_SUCCESS,
  UPDATE_CHILD_ERROR,
  DELETE_CHILD_PENDING,
  DELETE_CHILD_SUCCESS,
  DELETE_CHILD_ERROR
} from '../actionTypes';

const initialState = {
  // will hold each item with ids as keys
  byId: {},
  // an array of all the ids
  allIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // success message
  success: '',
  // any errors loading all the data
  error: null
};

function childrenPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function childrenSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (children, child) => ({
          // keep the current object
          ...children,
          // add the item id as the key and an item object for loading
          [child.id]: {
            data: child,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [
      ...new Set([...state.allIds, ...action.data.map(child => child.id)])
    ]
  };
}

function childrenError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

////////////////

function childPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function childSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data,
        success: 'Success! New child added!'
      }
    },
    allIds: [...new Set([...state.allIds, action.payload.id])]
  };
}

function childError(state, action) {
  // clear loading and set error
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

export default createReducer(initialState, {
  [REQ_CHILDREN_PENDING]: childrenPending,
  [REQ_CHILDREN_SUCCESS]: childrenSuccess,
  [REQ_CHILDREN_ERROR]: childrenError,
  [REQ_CHILD_PENDING]: childPending,
  [REQ_CHILD_SUCCESS]: childSuccess,
  [REQ_CHILD_ERROR]: childError,
  [ADD_CHILD_PENDING]: childPending,
  [ADD_CHILD_SUCCESS]: childSuccess,
  [ADD_CHILD_ERROR]: childError,
  [UPDATE_CHILD_PENDING]: childPending,
  [UPDATE_CHILD_SUCCESS]: childSuccess,
  [UPDATE_CHILD_ERROR]: childError,
  [DELETE_CHILD_PENDING]: childPending,
  [DELETE_CHILD_SUCCESS]: childSuccess,
  [DELETE_CHILD_ERROR]: childError
});
