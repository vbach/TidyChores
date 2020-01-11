import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from '../../app.module.css';
import container from './container';

class EditChild extends Component {
  constructor(props) {
    super(props);
    this.props.fetchChild();
    this.state = {
      success: '',
      error: ''
    };

    this.loadData();
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.avatar === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value. For example, { description: 'hi'}
    this.setState({
      [name]: value
    });
  };

  loadData = async () => {
    const {
      match: {
        params: { id }
      },
      fetchChild
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchChild(id);
    // update the state with the data from the updated item
    const { child } = this.props;
    this.setState({ ...child });
  };

  save = event => {
    // make sure the form doesn't submit with the browser

    event.preventDefault();
    event.target.className += ' was-validated';
    const parentId = this.props.auth.user.id;
    const {
      createChild,
      updateChild,
      match: {
        params: { id }
      }
    } = this.props;
    const { name, avatar, points } = this.state;

    if (id) {
      if (name !== '' && avatar !== '') {
        updateChild({ id, name, avatar });
        this.setState({ success: 'Success! Child has been updated.' });
      } else {
        this.setState({ error: 'Uh oh! Something went wrong.' });
      }
    } else {
      if (name !== '' && avatar !== '') {
        createChild({ parentId, name, avatar, points });
        this.setState({ success: 'Success! Child added.' });
      } else {
        this.setState({ error: 'Uh oh! Something went wrong.' });
      }
    }
  };

  render() {
    const { name, avatar, success, error } = this.state;

    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.save} noValidate>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Edit Child</h1>
                {success ? (
                  <Alert variant='success'>{this.state.success}</Alert>
                ) : (
                  ''
                )}
                {error ? (
                  <Alert variant='danger'>{this.state.error}</Alert>
                ) : (
                  ''
                )}
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className='mt-5 '>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group>
                  <Form.Label>Child's Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    id='name'
                    onChange={this.handleInputChange}
                    value={name}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a name.
                  </Form.Control.Feedback>
                </Form.Group>

                <p>Select an Avatar</p>
                <Form.Group controlId='formAvatar'>
                  <Row>
                    <Col xs={4} className='text-center'>
                      {' '}
                      <img src='/avatars/boy_001.png' alt='Boy' />
                      <Form.Check
                        type='radio'
                        name='avatar'
                        value='boy_001'
                        onChange={this.handleInputChange}
                        checked={avatar === 'boy_001'}
                        className='text-center'
                      />
                    </Col>
                    <Col xs={4} className='text-center'>
                      {' '}
                      <img src='/avatars/boy_002.png' alt='Boy' />
                      <Form.Check
                        type='radio'
                        name='avatar'
                        value='boy_002'
                        onChange={this.handleInputChange}
                        checked={avatar === 'boy_002'}
                        className='text-center'
                      />
                    </Col>
                    <Col xs={4} className='text-center'>
                      {' '}
                      <img src='/avatars/boy_003.png' alt='Boy' />
                      <Form.Check
                        type='radio'
                        name='avatar'
                        value='boy_003'
                        onChange={this.handleInputChange}
                        checked={avatar === 'boy_003'}
                        className='text-center'
                      />
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col xs={4} className='text-center'>
                      {' '}
                      <img src='/avatars/girl_002.png' alt='Girl' />
                      <Form.Check
                        type='radio'
                        name='avatar'
                        value='girl_002'
                        onChange={this.handleInputChange}
                        checked={avatar === 'girl_002'}
                        className='text-center'
                      />
                    </Col>
                    <Col xs={4} className='text-center'>
                      {' '}
                      <img src='/avatars/girl_001.png' alt='Girl' />
                      <Form.Check
                        type='radio'
                        name='avatar'
                        value='girl_001'
                        onChange={this.handleInputChange}
                        checked={avatar === 'girl_001'}
                        className='text-center'
                      />
                    </Col>
                    <Col xs={4} className='text-center'>
                      {' '}
                      <img src='/avatars/girl_003.png' alt='Girl' />
                      <Form.Check
                        type='radio'
                        name='avatar'
                        value='girl_003'
                        onChange={this.handleInputChange}
                        checked={avatar === 'girl_003'}
                        className='text-center'
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className='mb-5'>
              <Col xs={2}></Col>
              <Col xs={8} className='text-center'>
                <Button className={styles.submit__btn} type='submit'>
                  Add
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

EditChild.propTypes = {
  updateChild: PropTypes.func.isRequired,
  fetchChild: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired,
  children: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  }),
  auth: PropTypes.object.isRequired
};

EditChild.defaultProps = {
  children: {}
};

export default container(EditChild);
