import { connect } from 'react-redux';
import { fetchChildren, updateChild } from '../../../../store/children/actions';
import {
  fetchClaimedReward,
  updateClaimedReward
} from '../../../../store/claimedrewards/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    children: { byId, allIds },
    claimedRewards: {
      claimedRewardId: { [id]: { data: reward } = {} }
    },
    auth
  } = state;
  return {
    reward,
    children: allIds.map(id => byId[id].data),
    auth
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChildren,
  updateChild,
  fetchClaimedReward,
  updateClaimedReward
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
