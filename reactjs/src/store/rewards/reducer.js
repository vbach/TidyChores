import createReducer from '../helpers/createReducer';

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

function rewardsPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function rewardsSuccess(state, action) {
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

function rewardsError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

////////////////////

function rewardPending(state, action) {
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

function rewardSuccess(state, action) {
  // clear loading and error, update cache time, add rewards
  return {
    ...state,
    rewardId: {
      ...state.rewardId,
      [action.payload.id]: {
        isLoading: true,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allRewardsIds: [...new Set([...state.allRewardsIds, action.payload.id])]
  };
}

function rewardError(state, action) {
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
  [REQ_REWARDS_PENDING]: rewardsPending,
  [REQ_REWARDS_SUCCESS]: rewardsSuccess,
  [REQ_REWARDS_ERROR]: rewardsError,
  [REQ_REWARD_PENDING]: rewardPending,
  [REQ_REWARD_SUCCESS]: rewardSuccess,
  [REQ_REWARD_ERROR]: rewardError,
  [ADD_REWARD_PENDING]: rewardPending,
  [ADD_REWARD_SUCCESS]: rewardSuccess,
  [ADD_REWARD_ERROR]: rewardError,
  [UPDATE_REWARD_PENDING]: rewardPending,
  [UPDATE_REWARD_SUCCESS]: rewardSuccess,
  [UPDATE_REWARD_ERROR]: rewardError,
  [DELETE_REWARD_PENDING]: rewardPending,
  [DELETE_REWARD_SUCCESS]: rewardSuccess,
  [DELETE_REWARD_ERROR]: rewardError
});
