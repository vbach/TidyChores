import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import FourOhFour from './pages/404';
import Container from 'react-bootstrap/Container';
import Footer from './components/layout/Footer';
import Login from './components/login/Login';
import ParentView from './components/parent/View';
import ChildView from './components/parent/childView';
import styles from './app.module.css';
import Form from './components/forms/Signup';
import Rewards from './components/parent/Rewards';
import NewChild from './components/forms/NewChild';
import EditChore from './components/forms/EditChore';
import AddChore from './components/forms/AddChore';
import AddReward from './components/forms/AddReward';
import EditReward from './components/forms/EditReward';
import UserChildView from './components/child/ChildView';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <Container className={styles.container}>
          <Router>
            <div>
              <Route path="/" component={Navbar} />
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Form} />
            </div>

            <Switch>
              <Route path="/parent" exact component={ParentView} />
              <Route path="/parent/child/:id" exact component={ChildView} />
              <Route path="/parent/rewards" exact component={Rewards} />
              <Route path="/parent/:id/child/new" exact component={NewChild} />
              <Route
                path="/parent/:id/chore/edit"
                exact
                component={EditChore}
              />
              <Route path="/parent/:id/chore/add" exact component={AddChore} />
              <Route
                path="/parent/:id/rewards/add"
                exact
                component={AddReward}
              />
              <Route
                path="/parent/:id/rewards/edit"
                exact
                component={EditReward}
              />
              <Route path="/child/:id" exact component={UserChildView} />
              <Route component={FourOhFour} />
            </Switch>
          </Router>
        </Container>
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
  loggedIn: false
};
export default App;
