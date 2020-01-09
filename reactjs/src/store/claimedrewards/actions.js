import API from '../../API';
import uuid from 'uuid';
import {
  REQ_CLAIMEDREWARDS_PENDING,
  REQ_CLAIMEDREWARDS_SUCCESS,
  REQ_CLAIMEDREWARDS_ERROR,
  REQ_CLAIMEDREWARD_PENDING,
  REQ_CLAIMEDREWARD_SUCCESS,
  REQ_CLAIMEDREWARD_ERROR,
  ADD_CLAIMEDREWARD_PENDING,
  ADD_CLAIMEDREWARD_SUCCESS,
  ADD_CLAIMEDREWARD_ERROR,
  UPDATE_CLAIMEDREWARD_PENDING,
  UPDATE_CLAIMEDREWARD_SUCCESS,
  UPDATE_CLAIMEDREWARD_ERROR,
  DELETE_CLAIMEDREWARD_PENDING,
  DELETE_CLAIMEDREWARD_SUCCESS,
  DELETE_CLAIMEDREWARD_ERROR
} from '../actionTypes';
// cache data for 5 minutes
const CACHE_TIME = 0;
export const fetchClaimedRewards = () => ({
  types: [
    REQ_CLAIMEDREWARDS_PENDING,
    REQ_CLAIMEDREWARDS_SUCCESS,
    REQ_CLAIMEDREWARDS_ERROR
  ],
  // function used to call api
  callAPI: () => API.get('/claimedRewards'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.rewards;
    // if rewards are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have a reward or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const fetchClaimedReward = id => ({
  types: [
    REQ_CLAIMEDREWARD_PENDING,
    REQ_CLAIMEDREWARD_SUCCESS,
    REQ_CLAIMEDREWARD_ERROR
  ],
  callAPI: () => API.get(`/claimedRewards/${id}`),
  shouldCallAPI: state => {
    const reward = state.rewards.rewardId[id] || {};
    const { loadedAt, isLoading } = reward;
    if (!reward || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

// create claimed reward
export const createClaimedReward = reward => {
  // create a uuid for this item so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [
      ADD_CLAIMEDREWARD_PENDING,
      ADD_CLAIMEDREWARD_SUCCESS,
      ADD_CLAIMEDREWARD_ERROR
    ],
    callAPI: () => API.post('/claimedRewards', { id, ...reward }),
    payload: { id }
  };
};

// Update the reward
export const updateClaimedReward = reward => ({
  types: [
    UPDATE_CLAIMEDREWARD_PENDING,
    UPDATE_CLAIMEDREWARD_SUCCESS,
    UPDATE_CLAIMEDREWARD_ERROR
  ],
  callAPI: () => API.put(`/claimedRewards/${reward.id}`, reward),
  payload: { reward: { ...reward } }
});

export const deleteClaimedReward = id => ({
  types: [
    DELETE_CLAIMEDREWARD_PENDING,
    DELETE_CLAIMEDREWARD_SUCCESS,
    DELETE_CLAIMEDREWARD_ERROR
  ],
  callAPI: () => API.delete(`/claimedRewards/${id}`),
  payload: { id }
});
