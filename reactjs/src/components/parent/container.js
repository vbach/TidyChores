import { connect } from 'react-redux';
import { fetchChildren } from '../../store/children/actions';
import { fetchChores, deleteChore } from '../../store/chores/actions';
import { fetchRewards, deleteReward } from '../../store/rewards/actions';
import { fetchUserInfo } from '../../store/users/actions';

function mapStateToProps(state) {
  const {
    children: { byId, allIds },
    chores: { choreId, allChoreIds },
    rewards: { rewardId, allRewardsIds },
    auth
  } = state;

  // turn the array of ids into an array of objects
  return {
    children: allIds.map(id => byId[id].data),
    chores: allChoreIds.map(id => choreId[id].data),
    rewards: allRewardsIds.map(id => rewardId[id].data),
    auth
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChildren,
  fetchChores,
  fetchRewards,
  deleteReward,
  deleteChore
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
