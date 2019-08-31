import React, { Fragment, Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import styles from './app.module.css';
import Logo from '../../logo.png';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <Fragment>
        <Navbar expand="md" className="pt-4">
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} alt="Tidy Chores" className={styles.logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!this.state.loggedIn && (
              <Fragment>
                <Nav className="ml-auto">
                  <Nav.Link>
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/">About</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/">Features</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/">Contact</Link>
                  </Nav.Link>
                </Nav>
                <Link to="/signup">
                  <Button className={styles.nav__btn}>Sign Up</Button>
                </Link>
              </Fragment>
            )}
            {this.state.loggedIn && (
              <Fragment>
                <Nav className="ml-auto">
                  <Nav.Link>
                    <Link to="/parent">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/parent/:id/chore/add">Add Chore</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/parent/:id/child/new">Add Child</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/parent/rewards">Rewards</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/">Logout</Link>
                  </Nav.Link>
                </Nav>
              </Fragment>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

Navigation.propTypes = {
  loggedIn: PropTypes.string
};

Navigation.defaultProps = {
  loggedIn: false
};

export default Navigation;
