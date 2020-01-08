import API from '../../API';
import uuid from 'uuid';
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
// cache data for 5 minutes
const CACHE_TIME = 0;
export const fetchSteps = () => ({
  types: [REQ_STEPS_PENDING, REQ_STEPS_SUCCESS, REQ_STEPS_ERROR],
  // function used to call api
  callAPI: () => API.get('/steps'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.steps;
    // if STEPS are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have a STEP or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const createStep = step => {
  // create a uuid for this item so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_STEP_PENDING, ADD_STEP_SUCCESS, ADD_STEP_ERROR],
    callAPI: () => API.post('/steps', { id, ...step }),
    payload: { id }
  };
};

export const fetchStep = id => ({
  types: [REQ_STEP_PENDING, REQ_STEP_SUCCESS, REQ_STEP_ERROR],
  callAPI: () => API.get(`/steps/${id}`),
  shouldCallAPI: state => {
    const step = state.steps.stepId[id] || {};
    const { loadedAt, isLoading } = step;
    if (!step || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

// Update the STEP
export const updateStep = step => ({
  types: [UPDATE_STEP_PENDING, UPDATE_STEP_SUCCESS, UPDATE_STEP_ERROR],
  callAPI: () => API.put(`/steps/${step.id}`, step),
  payload: { step: { ...step } }
});

export const deleteStep = id => ({
  types: [DELETE_STEP_PENDING, DELETE_STEP_SUCCESS, DELETE_STEP_ERROR],
  callAPI: () => API.delete(`/steps/${id}`),
  payload: { id }
});
