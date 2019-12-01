import createReducer from '../helpers/createReducer';

import {
  VIEW_CHORES,
  VIEW_CHORES_ERROR,
  VIEW_CHORES_SUCCESS,
  ADD_CHORE,
  ADD_CHORE_SUCCESS,
  ADD_CHORE_ERROR,
  SET_CURRENT_CHORE,
  SET_CURRENT_CHORE_ERROR,
  SET_CURRENT_CHORE_SUCCESS,
  UPDATE_CHORE,
  UPDATE_CHORE_SUCCESS,
  UPDATE_CHORE_ERROR
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

function viewChores(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function choreSuccess(state, action) {
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

function choreError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function addChore(state, action) {
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

function addChoreSuccess(state, action) {
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

function addChoreError(state, action) {
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
  [VIEW_CHORES]: viewChores,
  [VIEW_CHORES_ERROR]: choreError,
  [VIEW_CHORES_SUCCESS]: choreSuccess,
  [ADD_CHORE]: addChore,
  [ADD_CHORE_SUCCESS]: addChoreSuccess,
  [ADD_CHORE_ERROR]: addChoreError,
  [SET_CURRENT_CHORE]: viewChores,
  [SET_CURRENT_CHORE_ERROR]: choreError,
  [SET_CURRENT_CHORE_SUCCESS]: choreSuccess,
  [UPDATE_CHORE]: addChore,
  [UPDATE_CHORE_SUCCESS]: addChoreSuccess,
  [UPDATE_CHORE_ERROR]: addChoreError
});
