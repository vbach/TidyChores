import createReducer from '../helpers/createReducer';

import {
  VIEW_CHILD,
  VIEW_CHILD_ERROR,
  VIEW_CHILD_SUCCESS,
  ADD_CHILD,
  ADD_CHILD_SUCCESS,
  ADD_CHILD_ERROR
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
  // any errors loading all the data
  error: null
};

function viewChild(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function childSuccess(state, action) {
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

function childError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function addChild(state, action) {
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

function addChildSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allIds: [...new Set([...state.allIds, action.payload.id])]
  };
}

function addChildError(state, action) {
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
  [VIEW_CHILD]: viewChild,
  [VIEW_CHILD_SUCCESS]: childSuccess,
  [VIEW_CHILD_ERROR]: childError,
  [ADD_CHILD]: addChild,
  [ADD_CHILD_SUCCESS]: addChildSuccess,
  [ADD_CHILD_ERROR]: addChildError
});
