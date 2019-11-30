import { connect } from 'react-redux';
import { fetchChildren } from '../../store/children/actions';
import { fetchChores, deleteChore } from '../../store/chores/actions';

function mapStateToProps(state) {
  const {
    children: { byId, allIds },
    chores: { choreId, allChoreIds }
  } = state;
  // turn the array of ids into an array of objects
  return {
    children: allIds.map(id => byId[id].data),
    chores: allChoreIds.map(id => choreId[id].data)
  };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchChildren, fetchChores, deleteChore };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
