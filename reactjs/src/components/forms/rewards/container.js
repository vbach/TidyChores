import { connect } from 'react-redux';
import {
  createReward,
  updateReward,
  fetchRewards
} from '../../../store/rewards/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    rewards: {
      rewardId: { [id]: { data: reward } = {} }
    }
  } = state;
  return { reward };
}

// set the actions we need in this component
const mapDispatchToProps = {
  createReward,
  updateReward,
  fetchRewards
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
