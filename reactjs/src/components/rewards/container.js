import { connect } from 'react-redux';
import { fetchChildren } from '../../store/children/actions';
import { fetchRewards, deleteReward } from '../../store/rewards/actions';
import {
  fetchClaimedRewards,
  deleteClaimedReward
} from '../../store/claimedrewards/actions';

function mapStateToProps(state) {
  const {
    children: { byId, allIds, isLoading },
    rewards: { rewardId, allRewardsIds },
    claimedRewards: { claimedRewardId, allClaimedRewardsIds },
    auth
  } = state;

  // turn the array of ids into an array of objects
  return {
    children: allIds.map(id => byId[id].data),
    isLoading,
    rewards: allRewardsIds.map(id => rewardId[id].data),
    claimedRewards: allClaimedRewardsIds.map(id => claimedRewardId[id].data),
    auth
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChildren,
  fetchRewards,
  deleteReward,
  fetchClaimedRewards,
  deleteClaimedReward
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
