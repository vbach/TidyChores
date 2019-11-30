import API from '../../API';
import uuid from 'uuid';
import {
  VIEW_CHORES,
  VIEW_CHORES_ERROR,
  VIEW_CHORES_SUCCESS,
  ADD_CHORE,
  ADD_CHORE_SUCCESS,
  ADD_CHORE_ERROR,
  UPDATE_CHORE,
  UPDATE_CHORE_SUCCESS,
  UPDATE_CHORE_ERROR,
  DELETE_CHORE,
  DELETE_CHORE_SUCCESS,
  DELETE_CHORE_ERROR,
  SET_CURRENT_CHORE,
  SET_CURRENT_CHORE_SUCCESS,
  SET_CURRENT_CHORE_ERROR
} from '../actionTypes';
// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;
export const fetchChores = () => ({
  types: [VIEW_CHORES, VIEW_CHORES_SUCCESS, VIEW_CHORES_ERROR],
  // function used to call api
  callAPI: () => API.get('/chores'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.chores;
    // if children are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have a child or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const createChore = chore => {
  // create a uuid for this chore so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_CHORE, ADD_CHORE_SUCCESS, ADD_CHORE_ERROR],
    callAPI: () => API.post('/chores', { id, ...chore }),
    payload: { id }
  };
};

// Request current chore to edit
export const fetchChore = id => ({
  types: [
    SET_CURRENT_CHORE,
    SET_CURRENT_CHORE_SUCCESS,
    SET_CURRENT_CHORE_ERROR
  ],
  callAPI: () => API.get(`/chores/${id}`),
  shouldCallAPI: state => {
    const chore = state.chores.choreId[id] || {};
    const { loadedAt, isLoading } = chore;
    if (!chore || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

// Delete a chore
export const deleteChore = id => {
  return {
    types: [DELETE_CHORE, DELETE_CHORE_SUCCESS, DELETE_CHORE_ERROR],
    callAPI: () => API.delete(`/chores/${id}`),
    payload: { id }
  };
};

// Update the chore
export const updateChore = chore => ({
  types: [UPDATE_CHORE, UPDATE_CHORE_SUCCESS, UPDATE_CHORE_ERROR],
  callAPI: () => API.put(`/chores/${chore.id}`),
  payload: { id: chore.id }
});
