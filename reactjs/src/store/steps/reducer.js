import createReducer from '../helpers/createReducer';

import {
  REQ_STEPS_PENDING,
  REQ_STEPS_SUCCESS,
  REQ_STEPS_ERROR,
  REQ_STEP_PENDING,
  REQ_STEP_SUCCESS,
  REQ_STEP_ERROR,
  ADD_STEP_PENDING,
  ADD_STEP_SUCCESS,
  ADD_STEP_ERROR,
  UPDATE_STEP_PENDING,
  UPDATE_STEP_SUCCESS,
  UPDATE_STEP_ERROR,
  DELETE_STEP_PENDING,
  DELETE_STEP_SUCCESS,
  DELETE_STEP_ERROR
} from '../actionTypes';

const initialState = {
  // will hold each item with ids as keys
  stepId: {},
  // an array of all the ids
  allStepsIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null
};

function stepsPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function stepsSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    stepId: {
      ...state.stepId,
      ...action.data.reduce(
        (steps, step) => ({
          // keep the current object
          ...steps,
          // add the item id as the key and an item object for loading
          [step.id]: {
            data: step,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allStepsIds: [
      ...new Set([...state.allStepsIds, ...action.data.map(step => step.id)])
    ]
  };
}

function stepsError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

////////////////////

function stepPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    stepId: {
      ...state.stepId,
      [action.payload.id]: {
        ...state.stepId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function stepSuccess(state, action) {
  // clear loading and error, update cache time, add STEPS
  return {
    ...state,
    stepId: {
      ...state.stepId,
      [action.payload.id]: {
        isLoading: true,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allStepsIds: [...new Set([...state.allStepsIds, action.payload.id])]
  };
}

function stepError(state, action) {
  // clear loading and set error
  return {
    ...state,
    stepId: {
      ...state.stepId,
      [action.payload.id]: {
        ...state.stepId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

export default createReducer(initialState, {
  [REQ_STEPS_PENDING]: stepsPending,
  [REQ_STEPS_SUCCESS]: stepsSuccess,
  [REQ_STEPS_ERROR]: stepsError,
  [REQ_STEP_PENDING]: stepPending,
  [REQ_STEP_SUCCESS]: stepSuccess,
  [REQ_STEP_ERROR]: stepError,
  [ADD_STEP_PENDING]: stepPending,
  [ADD_STEP_SUCCESS]: stepSuccess,
  [ADD_STEP_ERROR]: stepError,
  [UPDATE_STEP_PENDING]: stepPending,
  [UPDATE_STEP_SUCCESS]: stepSuccess,
  [UPDATE_STEP_ERROR]: stepError,
  [DELETE_STEP_PENDING]: stepPending,
  [DELETE_STEP_SUCCESS]: stepSuccess,
  [DELETE_STEP_ERROR]: stepError
});
