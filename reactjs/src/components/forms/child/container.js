import { connect } from 'react-redux';
import { createChild, fetchChildren } from '../../../store/children/actions';
function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
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
  // const {
  //   match: {
  //     params: { id }
  //   }
  // } = props;
  // const {
  //   children: {
  //     childId: { [id]: { data: child } = {} }
  //   },
  //   auth
  // } = state;
  // return { child, auth };
}

// set the actions we need in this component
const mapDispatchToProps = {
  createChild,
  fetchChildren
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
