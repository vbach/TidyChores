import { connect } from 'react-redux';
import {
  signUpUser,
  loginUser,
  forgotPassword
} from '../../store/users/actions';

function mapStateToProps(state) {
  const { auth, error } = state;

  return { auth, error };
}

// set the actions we need in this component
const mapDispatchToProps = {
  loginUser,
  signUpUser,
  forgotPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
