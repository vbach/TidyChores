import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Login from './components/login/Login';
import SignUp from './components/login/Signup';
import ParentView from './components/parent/View';
import ViewAllChores from './components/parent/ViewAll';
import styles from './app.module.css';
import Rewards from './components/parent/Rewards';
import NewChild from './components/forms/child/form';
import ChoreForm from './components/forms/chores/form';
import RewardForm from './components/forms/rewards/form';
import ClaimForm from './components/forms/claimrewards/form';
import PrivateRoute from './components/privateRoute';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './store/helpers/setAuthToken';
import { setCurrentUser, logoutUser } from './store/users/actions';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Header />

          <Container className={styles.container}>
            <Router>
              <Navbar />

              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={SignUp} />
                <Route
                  path='/forgotpassword'
                  exact
                  component={ForgotPassword}
                />
                <Route path='/resetpassword/' exact component={ResetPassword} />
                <PrivateRoute path='/parent/' exact component={ParentView} />

                <PrivateRoute
                  path='/parent/viewall'
                  exact
                  component={ViewAllChores}
                />
                <PrivateRoute
                  path='/parent/rewards'
                  exact
                  component={Rewards}
                />
                <PrivateRoute
                  path='/parent/child/new'
                  exact
                  component={NewChild}
                />
                <PrivateRoute
                  path='/parent/chores/edit/:id'
                  exact
                  component={ChoreForm}
                />
                <PrivateRoute
                  path='/parent/chores/add'
                  exact
                  component={ChoreForm}
                />
                <PrivateRoute
                  path='/parent/rewards/edit/:id'
                  exact
                  component={RewardForm}
                />
                <PrivateRoute
                  path='/parent/rewards/add/'
                  exact
                  component={RewardForm}
                />
                <PrivateRoute
                  path='/parent/rewards/claim/:id'
                  exact
                  component={ClaimForm}
                />
              </Switch>
            </Router>
          </Container>
          <Footer />
        </Provider>
      </div>
    );
  }
}

App.defaultProps = {};
export default App;
