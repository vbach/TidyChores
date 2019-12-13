import { connect } from 'react-redux';
import {
  fetchReward,
  createReward,
  updateReward
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
    },
    auth
  } = state;
  return { reward, auth };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchReward,
  createReward,
  updateReward
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
