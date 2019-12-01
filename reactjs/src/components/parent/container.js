import { connect } from 'react-redux';
import { fetchChildren } from '../../store/children/actions';
import { fetchChores, deleteChore } from '../../store/chores/actions';
import { fetchRewards } from '../../store/rewards/actions';

function mapStateToProps(state) {
  const {
    children: { byId, allIds },
    chores: { choreId, allChoreIds },
    rewards: { rewardId, allRewardsIds }
  } = state;
  // turn the array of ids into an array of objects
  return {
    children: allIds.map(id => byId[id].data),
    chores: allChoreIds.map(id => choreId[id].data),
    rewards: allRewardsIds.map(id => rewardId[id].data)
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChildren,
  fetchChores,
  deleteChore,
  fetchRewards
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
