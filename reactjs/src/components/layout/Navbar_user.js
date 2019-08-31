import React, { Fragment, Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import styles from './app.module.css';
import Logo from '../../logo.png';

class Navbar_user extends Component {
  render() {
    return (
      <Fragment>
        <Navbar expand="md" className="pt-4">
          <Navbar.Brand>
            <img src={Logo} alt="Tidy Chores" className={styles.logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/">Add Child</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/">Add Chore</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/">Rewards</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/">Logout</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default Navbar_user;

Navbar_user.propTypes = {
  loggedIn: PropTypes.string
};
