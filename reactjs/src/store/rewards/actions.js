import API from '../../API';
import uuid from 'uuid';
import {
  VIEW_REWARD,
  VIEW_REWARD_SUCCESS,
  VIEW_REWARD_ERROR,
  ADD_REWARD,
  ADD_REWARD_SUCCESS,
  ADD_REWARD_ERROR,
  SET_CURRENT_REWARDS,
  SET_CURRENT_REWARDS_SUCCESS,
  SET_CURRENT_REWARDS_ERROR,
  UPDATE_REWARD,
  UPDATE_REWARD_SUCCESS,
  UPDATE_REWARD_ERROR
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

export const fetchReward = id => ({
  types: [
    SET_CURRENT_REWARDS,
    SET_CURRENT_REWARDS_SUCCESS,
    SET_CURRENT_REWARDS_ERROR
  ],
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

export const createReward = reward => {
  // create a uuid for this item so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_REWARD, ADD_REWARD_SUCCESS, ADD_REWARD_ERROR],
    callAPI: () => API.post('/rewards', { id, ...reward }),
    payload: { id }
  };
};

// Update the reward
export const updateReward = reward => ({
  types: [UPDATE_REWARD, UPDATE_REWARD_SUCCESS, UPDATE_REWARD_ERROR],
  callAPI: () => API.put(`/rewards/${reward.id}`),
  payload: { id: reward.id }
});
