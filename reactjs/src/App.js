import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';
import Footer from './components/layout/Footer';
import Login from './components/login/Login';
import ParentView from './components/parent/View';
import ViewAllChores from './components/parent/ViewAll';
import styles from './app.module.css';
import Form from './components/forms/Signup';
import Rewards from './components/parent/Rewards';
import NewChild from './components/forms/child/form';
import ChoreForm from './components/forms/chores/form';
import RewardForm from './components/forms/rewards/form';
import store from './store';

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Login />
          <Container className={styles.container}>
            <Router>
              <div>
                <Route path='/' component={Navbar} />
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={Form} />
              </div>

              <Switch>
                <Route path='/parent/' exact component={ParentView} />
                <Route path='/parent/viewall' exact component={ViewAllChores} />
                <Route path='/parent/rewards' exact component={Rewards} />
                <Route path='/parent/child/new' exact component={NewChild} />
                <Route
                  path='/parent/chore/edit/:id'
                  exact
                  component={ChoreForm}
                />
                <Route path='/parent/chore/add' exact component={ChoreForm} />
                <Route
                  path='/parent/rewards/add'
                  exact
                  component={RewardForm}
                />
                <Route
                  path='/parent/rewards/edit/:id'
                  exact
                  component={RewardForm}
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

App.defaultProps = {
  loggedIn: false
};
export default App;
