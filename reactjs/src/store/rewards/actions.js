import API from '../../API';
import uuid from 'uuid';
import {
  VIEW_REWARD,
  VIEW_REWARD_SUCCESS,
  VIEW_REWARD_ERROR,
  ADD_REWARD,
  ADD_REWARD_SUCCESS,
  ADD_REWARD_ERROR
} from '../actionTypes';
// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;
export const fetchRewards = () => ({
  types: [VIEW_REWARD, VIEW_REWARD_SUCCESS, VIEW_REWARD_ERROR],
  // function used to call api
  callAPI: () => API.get('/rewards'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.rewards;
    // if children are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have a child or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const createReward = reward => {
  // create a uuid for this item so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_REWARD, ADD_REWARD_SUCCESS, ADD_REWARD_ERROR],
    callAPI: () => API.post('/rewards', { id, ...reward }),
    payload: { id }
  };
};
