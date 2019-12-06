import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import styles from './app.module.css';
import Logo from '../../logo.png';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

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
            {/* <Fragment>
              <Nav className='ml-auto'>
                <Nav.Link>
                  <Link to='/' url='/'>
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/' url='/'>
                    About
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/' url='/'>
                    Features
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/' url='/'>
                    Contact
                  </Link>
                </Nav.Link>
              </Nav>
              <Link to='/signup'>
                <Button className={styles.nav__btn}>Sign Up</Button>
              </Link>
            </Fragment> */}

            <Fragment>
              <Nav className='ml-auto'>
                <Nav.Link>
                  <Link to='/parent'>Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/parent/chores/add'>Add Chore</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/parent/child/new'>Add Child</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/parent/rewards'>Rewards</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/'>Logout</Link>
                </Nav.Link>
              </Nav>
            </Fragment>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
