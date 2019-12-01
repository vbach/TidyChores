import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../app.module.css';
import container from './container';

class AddReward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      claimed: false,
      claimedBy: '',
      value: ''
    };
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // // find the value of the input
    const input = target.type === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value. For example, { description: 'hi'}
    this.setState({
      [name]: input
    });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const { createReward, history } = this.props;
    const { description, value } = this.state;
    createReward({ description, value });
    history.push('/parent/rewards');
  };

  render() {
    const { description, value } = this.state;
    return (
      <Container className='mt-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.save}>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Add Reward</h1>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className='mt-5 '>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group controlId='formAddReward'>
                  <Form.Label>Description of reward</Form.Label>
                  <Form.Control
                    type='text'
                    name='description'
                    onChange={this.handleInputChange}
                    value={description}
                  />
                </Form.Group>
                <Form.Group controlId='formPointValue'>
                  <Form.Label>Point Value</Form.Label>
                  <Form.Control
                    type='text'
                    name='value'
                    onChange={this.handleInputChange}
                    value={value}
                  />
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

AddReward.propTypes = {
  reward: PropTypes.array.isRequired
};

AddReward.defaultProps = {
  reward: []
};

export default container(AddReward);
