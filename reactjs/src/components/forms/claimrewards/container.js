import { connect } from 'react-redux';
import {
  fetchReward,
  updateReward,
  deleteReward
} from '../../../store/rewards/actions';
import { fetchChildren, updateChild } from '../../../store/children/actions';
import { createClaimedReward } from '../../../store/claimedrewards/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    children: { byId, allIds },
    rewards: {
      rewardId: { [id]: { data: reward } = {} }
    },
    claimedRewards,
    auth
  } = state;
  return {
    reward,
    children: allIds.map(id => byId[id].data),
    claimedRewards,
    auth
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchReward,
  deleteReward,
  fetchChildren,
  updateChild,
  createClaimedReward
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
