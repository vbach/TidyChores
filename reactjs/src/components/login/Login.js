import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RRPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/parent');
    }
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.childId === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value. For example, { description: 'hi'}
    this.setState({
      [name]: value
    });
  };

  save = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
    const { history } = this.props;
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
    history.push(`/parent`);
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.save} noValidate>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={6} className={styles.align__center}>
                <h1>Login</h1>
                <p>
                  Don't have an account? <Link to='/signup'>Sign up!</Link>
                </p>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='email'
                    onChange={this.handleInputChange}
                    value={email}
                  />
                  <Form.Text className='text-muted'>
                    Hint: Your username is the email you signed up with.
                  </Form.Text>
                  <Form.Control.Feedback type='invalid'>
                    Invalid username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    name='password'
                    onChange={this.handleInputChange}
                    value={password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className={styles.login__btn} type='submit'>
                  Login
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

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  history: RRPropTypes.history.isRequired
};

export default container(Login);
