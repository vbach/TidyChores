import { connect } from 'react-redux';
import { signUpUser, loginUser } from '../../store/users/actions';

function mapStateToProps(state, props) {
  const { auth } = state;

  return { auth };
}

// set the actions we need in this component
const mapDispatchToProps = {
  loginUser,
  signUpUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
