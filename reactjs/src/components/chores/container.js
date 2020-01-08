import { connect } from 'react-redux';
import { fetchChore, deleteChore } from '../../store/chores/actions';
import { fetchSteps, deleteStep } from '../../store/steps/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    steps: { allStepsIds, stepId },
    chores: {
      choreId: { [id]: { data: chore } = {} }
    },

    auth
  } = state;
  return { chore, steps: allStepsIds.map(id => stepId[id].data), auth };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChore,
  deleteChore,
  fetchSteps,
  deleteStep
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
