import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import styles from './app.module.css';
import Logo from '../../logo.png';
import { logoutUser } from '../../store/users/actions';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Fragment>
        <Navbar expand='md' className='pt-4'>
          <Navbar.Brand>
            <Link to='/'>
              <img src={Logo} alt='Tidy Chores' className={styles.logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {this.props.auth.isAuthenticated ? (
              <Fragment>
                <Nav className='ml-auto' defaultActiveKey='/home'>
                  <Nav.Item>
                    <Nav.Link href='/parent'>Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='/parent/chores/add'>Add Chore</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='/parent/child/new'>Add Child</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='/parent/rewards'>Rewards</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Button
                      onClick={this.onLogoutClick}
                      className={styles.nav__btn}
                    >
                      Logout
                    </Button>
                  </Nav.Item>
                </Nav>
              </Fragment>
            ) : (
              <Fragment>
                <Nav className='ml-auto pb-3'>
                  <Nav.Link href='/signup' className={styles.nav__btn}>
                    Sign Up
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
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);
