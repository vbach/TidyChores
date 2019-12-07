import { connect } from 'react-redux';
import { fetchReward, updateReward } from '../../../store/rewards/actions';
import { fetchChildren } from '../../../store/children/actions';

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
    }
  } = state;
  return { reward, children: allIds.map(id => byId[id].data) };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchReward,
  updateReward,
  fetchChildren
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
