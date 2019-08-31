import React, { Fragment, Component } from 'react';
import { Container } from 'react-bootstrap';
import styles from './app.module.css';

class Navigation extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid className={styles.footer}></Container>
      </Fragment>
    );
  }
}

export default Navigation;
