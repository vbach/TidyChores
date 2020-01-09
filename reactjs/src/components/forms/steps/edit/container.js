import { connect } from 'react-redux';
import {
  createStep,
  fetchStep,
  updateStep
} from '../../../../store/steps/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    steps: {
      stepId: { [id]: { data: step } = {} }
    },
    auth
  } = state;
  return { step, auth };
}

// set the actions we need in this component
const mapDispatchToProps = {
  createStep,
  fetchStep,
  updateStep
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
