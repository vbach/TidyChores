import API from '../../API';
import uuid from 'uuid';
import {
  VIEW_CHILD,
  VIEW_CHILD_ERROR,
  VIEW_CHILD_SUCCESS,
  ADD_CHILD,
  ADD_CHILD_SUCCESS,
  ADD_CHILD_ERROR
} from '../actionTypes';
// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;
export const fetchChildren = () => ({
  types: [VIEW_CHILD, VIEW_CHILD_SUCCESS, VIEW_CHILD_ERROR],
  // function used to call api
  callAPI: () => API.get('/children'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.children;
    // if children are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have a child or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const createChild = child => {
  // create a uuid for this item so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_CHILD, ADD_CHILD_SUCCESS, ADD_CHILD_ERROR],
    callAPI: () => API.post('/children', { id, ...child }),
    payload: { id }
  };
};
