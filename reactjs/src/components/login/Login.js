import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { email, password } = this.state;

    return (
      <Fragment>
        {this.props.auth.isAuthenticated ? null : (
          <Container fluid className={styles.loginBar}>
            <Container>
              <Row>
                <Col xs={12}>
                  <Form inline onSubmit={this.save}>
                    <Form.Group
                      className=' mt-1 mb-1 ml-auto'
                      controlId='login'
                    >
                      <Form.Control
                        required
                        type='text'
                        name='email'
                        onChange={this.handleInputChange}
                        value={email}
                      />
                      <Form.Control
                        required
                        type='password'
                        name='password'
                        onChange={this.handleInputChange}
                        value={password}
                      />
                      <Button className={styles.login__btn} type='submit'>
                        GO
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Container>
        )}
      </Fragment>
    );
  }
}

Login.propTypes = {
  // user: PropTypes.shape({
  //   username: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired
  // }),
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

Login.defaultProps = {
  loggedIn: false
};

export default container(Login);
