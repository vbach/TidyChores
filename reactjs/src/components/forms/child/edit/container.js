import { connect } from 'react-redux';
import {
  createChild,
  updateChild,
  fetchChild
} from '../../../../store/children/actions';
function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    children: {
      byId: { [id]: { data: child } = {} },
      success
    },
    auth
  } = state;
  // turn the array of ids into an array of objects
  return {
    child,
    success,
    auth
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  createChild,
  updateChild,
  fetchChild
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
