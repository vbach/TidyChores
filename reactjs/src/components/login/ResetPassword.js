import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RRPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showError: false,
      messageFromServer: ''
    };
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  resetPassword = async e => {
    e.preventDefault();
  };

  render() {
    const {
      password,
      messageFromServer,
      showNullError,
      showError
    } = this.state;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.resetPassword} noValidate>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={6} className={styles.align__center}>
                <h1>Reset Password</h1>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='password'
                    onChange={this.handleChange('password')}
                    value={password}
                  />
                </Form.Group>
                {showNullError && (
                  <div>
                    <p>The password cannot be empty.</p>
                  </div>
                )}
                {showError && (
                  <div>
                    <p>Passwords must be at least 6 charaacters.</p>
                  </div>
                )}
                <Button className={styles.ResetPassword__btn} type='submit'>
                  Submit
                </Button>
              </Col>
              <Col xs={2}></Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}

export default ResetPassword;
