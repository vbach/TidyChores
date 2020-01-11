import { connect } from 'react-redux';
import {
  createChild,
  fetchChildren,
  fetchChild
} from '../../../store/children/actions';
function mapStateToProps(state) {
  const {
    children: { byId, allIds, success },
    auth
  } = state;
  // turn the array of ids into an array of objects
  return {
    children: allIds.map(id => byId[id].data),
    success,
    auth
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  createChild,
  fetchChild,
  fetchChildren
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
