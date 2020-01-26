import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from './app.module.css';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showError: false,
      messageFromServer: ''
    };
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  sendEmail = async e => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true
      });
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/users/forgotPassword',
          {
            email
          }
        );
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.sendEmail} noValidate>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={6} className={styles.align__center}>
                <h1>Forgot Password</h1>
                {showNullError && (
                  <Alert variant='danger'>
                    The email address cannot be empty.
                  </Alert>
                )}
                {showError && (
                  <Alert variant='danger'>
                    That email address isn&apos;t recognized. Please try again
                    or register for a new account.
                  </Alert>
                )}
                {messageFromServer === 'recovery email sent' && (
                  <Alert variant='success'>
                    Password Reset Email Successfully Sent!
                  </Alert>
                )}
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='email'
                    onChange={this.handleChange('email')}
                    value={email}
                  />
                </Form.Group>

                <Button className={styles.ForgotPassword__btn} type='submit'>
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

export default ForgotPassword;
