import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../app.module.css';
import container from './container';

class NewChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avatar: '',
      points: '0'
    };
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

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const { createChild, history } = this.props;
    const { name, avatar, points } = this.state;
    createChild({ name, avatar, points });
    history.push('/parent');
  };

  render() {
    const { name, avatar } = this.state;

    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.save}>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Add a Child</h1>
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
                  />
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

NewChild.propTypes = {
  createChild: PropTypes.func.isRequired,
  children: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    points: PropTypes.string
  })
};

NewChild.defaultProps = {
  children: {}
};

export default container(NewChild);
