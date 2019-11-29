import { connect } from 'react-redux';
import {
  createChore,
  fetchChore,
  updateChore
} from '../../../store/chores/actions';
import { fetchChildren } from '../../../store/children/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    children: { byId, allIds },
    chores: {
      choreId: { [id]: { data: chore } = {} }
    }
  } = state;
  return { chore, children: allIds.map(id => byId[id].data) };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChore,
  createChore,
  fetchChildren,
  updateChore
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
