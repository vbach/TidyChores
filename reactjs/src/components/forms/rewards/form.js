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
      value: ''
    };
    this.loadData();
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

  loadData = async () => {
    const {
      match: {
        params: { id }
      },
      fetchReward
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchReward(id);
    // update the state with the data from the updated item
    const { reward } = this.props;
    this.setState({ ...reward });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      createReward,
      updateReward,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    const { description, value } = this.state;
    if (id) {
      updateReward({ id, description, value });
    } else {
      createReward({ description, value });
    }
    history.push('/parent/rewards');
  };

  render() {
    const { description, value } = this.state;
    const {
      reward: { id }
    } = this.props;
    return (
      <Container className='mt-5'>
        <div className='sign__up__form'>
          <Row className='mt-5'>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h1>{id ? 'Edit Reward' : 'Add Reward'}</h1>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row className='mt-5 '>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Form onSubmit={this.save}>
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
                <Button className={styles.submit__btn} type='submit'>
                  Add
                </Button>
              </Form>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row className='mb-5'>
            <Col xs={2}></Col>
            <Col xs={8} className='text-center'></Col>
            <Col xs={2}></Col>
          </Row>
        </div>
      </Container>
    );
  }
}

AddReward.propTypes = {
  createReward: PropTypes.func.isRequired,
  updateReward: PropTypes.func.isRequired,
  fetchReward: PropTypes.func.isRequired,

  reward: PropTypes.shape({
    description: PropTypes.string,
    claimed: PropTypes.bool,
    claimedBy: PropTypes.string,
    value: PropTypes.string
  })
};

AddReward.defaultProps = {
  reward: {}
};

export default container(AddReward);
