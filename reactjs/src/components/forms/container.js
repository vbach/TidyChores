import { connect } from 'react-redux';
import { createChild, fetchChildren } from '../../store/children/actions';
import { createChore, fetchChore } from '../../store/chores/actions';
function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    children: { byId, allIds },
    chores: {
      choreId,
      choreId: { [id]: { data: chore } = {} },
      allChoreIds
    }
  } = state;
  // turn the array of ids into an array of objects
  return {
    children: allIds.map(id => byId[id].data),
    chores: allChoreIds.map(id => choreId[id].data)
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  createChild,
  fetchChildren,
  createChore,
  fetchChore
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
