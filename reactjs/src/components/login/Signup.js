import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      zipcode: '',
      error: null
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      zipcode: this.state.zipcode
    };
    if (
      this.state.name !== '' &&
      this.state.email !== '' &&
      this.state.password !== '' &&
      this.state.zipcode !== ''
    ) {
      this.props.signUpUser(newUser);
      this.props.history.push('/login');
    }

    this.setState({ error: 'Uh oh! Something went wrong!' });
  };

  render() {
    const { name, email, password, zipcode, error } = this.state;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.save} noValidate>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={6} className={styles.align__center}>
                <h1>Sign Up for Tidy Chores</h1>
                <p>
                  Already have an acccount? <Link to='/login'>Login!</Link>
                </p>
                {error ? (
                  <Alert variant='danger'>{this.state.error}</Alert>
                ) : (
                  ''
                )}
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    onChange={this.handleInputChange}
                    value={name}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    type='text'
                    name='zipcode'
                    onChange={this.handleInputChange}
                    value={zipcode}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a zipcode.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className={styles.login__btn} type='submit'>
                  Sign Up
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

SignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
};

SignUp.defaultProps = {
  user: {}
};

export default container(SignUp);
