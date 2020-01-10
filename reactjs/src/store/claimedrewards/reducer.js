import createReducer from '../helpers/createReducer';

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

const initialState = {
  // will hold each item with ids as keys
  claimedRewardId: {},
  // an array of all the ids
  allClaimedRewardsIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null
};

function claimedRewardsPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function claimedRewardsSuccess(state, action) {
  // clear loading and error, update cache time, add items
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    claimedRewardId: {
      ...state.claimedRewardId,
      ...action.data.reduce(
        (claimedRewards, claimedReward) => ({
          // keep the current object
          ...claimedRewards,
          // add the item id as the key and an item object for loading
          [claimedReward.id]: {
            data: claimedReward,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allClaimedRewardsIds: [
      ...new Set([
        ...state.allClaimedRewardsIds,
        ...action.data.map(claimedReward => claimedReward.id)
      ])
    ]
  };
}

function claimedRewardsError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

////////////////////

function claimedRewardPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    claimedRewardId: {
      ...state.claimedRewardId,
      [action.payload.id]: {
        ...state.claimedRewardId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function claimedRewardSuccess(state, action) {
  // clear loading and error, update cache time, add rewards
  return {
    ...state,
    claimedRewardId: {
      ...state.claimedRewardId,
      [action.payload.id]: {
        isLoading: true,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allClaimedRewardsIds: [
      ...new Set([...state.allClaimedRewardsIds, action.payload.id])
    ]
  };
}

function claimedRewardError(state, action) {
  // clear loading and set error
  return {
    ...state,
    claimedRewardId: {
      ...state.claimedRewardId,
      [action.payload.id]: {
        ...state.claimedRewardId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

export default createReducer(initialState, {
  [REQ_CLAIMEDREWARDS_PENDING]: claimedRewardsPending,
  [REQ_CLAIMEDREWARDS_SUCCESS]: claimedRewardsSuccess,
  [REQ_CLAIMEDREWARDS_ERROR]: claimedRewardsError,
  [REQ_CLAIMEDREWARD_PENDING]: claimedRewardPending,
  [REQ_CLAIMEDREWARD_SUCCESS]: claimedRewardSuccess,
  [REQ_CLAIMEDREWARD_ERROR]: claimedRewardError,
  [ADD_CLAIMEDREWARD_PENDING]: claimedRewardPending,
  [ADD_CLAIMEDREWARD_SUCCESS]: claimedRewardSuccess,
  [ADD_CLAIMEDREWARD_ERROR]: claimedRewardError,
  [UPDATE_CLAIMEDREWARD_PENDING]: claimedRewardPending,
  [UPDATE_CLAIMEDREWARD_SUCCESS]: claimedRewardSuccess,
  [UPDATE_CLAIMEDREWARD_ERROR]: claimedRewardError,
  [DELETE_CLAIMEDREWARD_PENDING]: claimedRewardPending,
  [DELETE_CLAIMEDREWARD_SUCCESS]: claimedRewardSuccess,
  [DELETE_CLAIMEDREWARD_ERROR]: claimedRewardError
});
