import { connect } from 'react-redux';
import { createReward } from '../../../store/rewards/actions';

function mapStateToProps(state, props) {}

// set the actions we need in this component
const mapDispatchToProps = {
  createReward
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
