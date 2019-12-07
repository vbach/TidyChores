import API from '../../API';
import uuid from 'uuid';
import {
  REQ_REWARDS_PENDING,
  REQ_REWARDS_SUCCESS,
  REQ_REWARDS_ERROR,
  REQ_REWARD_PENDING,
  REQ_REWARD_SUCCESS,
  REQ_REWARD_ERROR,
  ADD_REWARD_PENDING,
  ADD_REWARD_SUCCESS,
  ADD_REWARD_ERROR,
  UPDATE_REWARD_PENDING,
  UPDATE_REWARD_SUCCESS,
  UPDATE_REWARD_ERROR,
  DELETE_REWARD_PENDING,
  DELETE_REWARD_SUCCESS,
  DELETE_REWARD_ERROR
} from '../actionTypes';
// cache data for 5 minutes
const CACHE_TIME = 0;
export const fetchRewards = () => ({
  types: [REQ_REWARDS_PENDING, REQ_REWARDS_SUCCESS, REQ_REWARDS_ERROR],
  // function used to call api
  callAPI: () => API.get('/rewards'),
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

export const createReward = reward => {
  // create a uuid for this item so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_REWARD_PENDING, ADD_REWARD_SUCCESS, ADD_REWARD_ERROR],
    callAPI: () => API.post('/rewards', { id, ...reward }),
    payload: { id }
  };
};

export const fetchReward = id => ({
  types: [REQ_REWARD_PENDING, REQ_REWARD_SUCCESS, REQ_REWARD_ERROR],
  callAPI: () => API.get(`/rewards/${id}`),
  shouldCallAPI: state => {
    const reward = state.rewards.rewardId[id] || {};
    const { loadedAt, isLoading } = reward;
    if (!reward || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

// Update the reward
export const updateReward = reward => ({
  types: [UPDATE_REWARD_PENDING, UPDATE_REWARD_SUCCESS, UPDATE_REWARD_ERROR],
  callAPI: () => API.put(`/rewards/${reward.id}`, reward),
  payload: { reward: { ...reward } }
});

export const deleteReward = id => ({
  types: [DELETE_REWARD_PENDING, DELETE_REWARD_SUCCESS, DELETE_REWARD_ERROR],
  callAPI: () => API.delete(`/rewards/${id}`),
  payload: { id }
});
