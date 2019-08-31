import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';

class SignUp extends Component {
  render() {
    return (
      <Container className="mt-5">
        <h1>Sign Up for Tidy Chores</h1>
        <div className="sign__up__form">
          <Form>
            <Row className="mt-5">
              <Col xs={2}></Col>
              <Col xs={1} className={styles.align__center}>
                <span className={styles.circle}>1</span>
              </Col>
              <Col xs={7}>
                <h2 className={styles.h2__signup}>Basic Information</h2>
                <Form.Group controlId="formBasicName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="firstname"
                    name="name"
                    placeholder="First Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mt-3 pb-5">
              <Col xs={2}></Col>
              <Col xs={1}>
                <span className={styles.circle}>2</span>
              </Col>
              <Col xs={7}>
                <h2 className={styles.h2__signup}>Account Information</h2>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the Terms of Service and Privacy Policy."
                  />
                </Form.Group>
                <Link to="/parent">
                  <Button className={styles.submit__btn}>Sign Up</Button>
                </Link>
              </Col>
              <Col xs={2}></Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string
  })
};

SignUp.defaultProps = {
  user: {}
};

export default SignUp;
