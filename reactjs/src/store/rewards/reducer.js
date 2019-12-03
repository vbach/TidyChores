import createReducer from '../helpers/createReducer';

import {
  VIEW_REWARD,
  VIEW_REWARD_SUCCESS,
  VIEW_REWARD_ERROR,
  SET_CURRENT_REWARDS,
  SET_CURRENT_REWARDS_SUCCESS,
  SET_CURRENT_REWARDS_ERROR,
  ADD_REWARD,
  ADD_REWARD_SUCCESS,
  ADD_REWARD_ERROR,
  UPDATE_REWARD,
  UPDATE_REWARD_SUCCESS,
  UPDATE_REWARD_ERROR
} from '../actionTypes';

const initialState = {
  // will hold each item with ids as keys
  rewardId: {},
  // an array of all the ids
  allRewardsIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null
};

function viewRewards(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function rewardSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    rewardId: {
      ...state.rewardId,
      ...action.data.reduce(
        (rewards, reward) => ({
          // keep the current object
          ...rewards,
          // add the item id as the key and an item object for loading
          [reward.id]: {
            data: reward,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allRewardsIds: [
      ...new Set([
        ...state.allRewardsIds,
        ...action.data.map(reward => reward.id)
      ])
    ]
  };
}

function rewardError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function addReward(state, action) {
  // set loading state and clear error
  return {
    ...state,
    rewardId: {
      ...state.rewardId,
      [action.payload.id]: {
        ...state.rewardId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function addRewardSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    rewardId: {
      ...state.rewardId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allRewardsIds: [...new Set([...state.allRewardsIds, action.payload.id])]
  };
}

function addRewardError(state, action) {
  // clear loading and set error
  return {
    ...state,
    rewardId: {
      ...state.rewardId,
      [action.payload.id]: {
        ...state.rewardId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

export default createReducer(initialState, {
  [VIEW_REWARD]: viewRewards,
  [VIEW_REWARD_SUCCESS]: rewardSuccess,
  [VIEW_REWARD_ERROR]: rewardError,
  [ADD_REWARD]: addReward,
  [ADD_REWARD_SUCCESS]: addRewardSuccess,
  [ADD_REWARD_ERROR]: addRewardError,
  [SET_CURRENT_REWARDS]: addReward,
  [SET_CURRENT_REWARDS_SUCCESS]: addRewardSuccess,
  [SET_CURRENT_REWARDS_ERROR]: addRewardError,
  [UPDATE_REWARD]: addReward,
  [UPDATE_REWARD_SUCCESS]: addRewardSuccess,
  [UPDATE_REWARD_ERROR]: addRewardError
});
