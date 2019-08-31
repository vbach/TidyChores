import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './app.module.css';

class Login extends Component {
  render() {
    return (
      <Container fluid className={styles.loginBar}>
        <Container>
          <Row>
            <Col xs={12}>
              <Form inline>
                <Form.Group className=" mt-1 mb-1 ml-auto" controlId="login">
                  <Form.Control
                    required
                    type="text"
                    placeholder="user@email.com"
                    defaultValue="user@email.com"
                  />
                  <Form.Control
                    required
                    type="password"
                    placeholder="password"
                    defaultValue="password"
                  />
                  <Button href="/parent" className={styles.login__btn}>
                    GO
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

Login.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};

Login.defaultProps = {
  loggedIn: false
};

export default Login;
