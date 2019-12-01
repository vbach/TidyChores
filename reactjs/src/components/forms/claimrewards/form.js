import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../app.module.css';
import container from './container';

class ClaimReward extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRewards();
    // this.props.fetchChildren();
    this.state = {
      description: '',
      claimed: false,
      claimedBy: '',
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
      fetchRewards
    } = this.props;
    // if no id don't load the item

    await fetchRewards(id);
    // update the state with the data from the updated item
    const { reward } = this.props;
    this.setState({ ...reward });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      updateReward,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    const { claimedBy, points } = this.state;
    if (id) {
      updateReward({ id, claimedBy, value });
    } 
    history.push('/parent/rewards');
  };

  render() {
    const { description, value, claimedBy } = this.state;
    const {
      reward: { id }
    } = this.props;
    return (
      <Container className='mt-5'>
        <div className='sign__up__form'>
          <Form onSubmit={this.save}>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Claim Reward</h1>
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
                <Form.Group controlId='formChild'>
                  <Form.Label>Select a child</Form.Label>

                  <Form.Control
                    as='select'
                    name='childId'
                    onChange={this.handleInputChange}
                    value={childId}
                  >
                    <option>Select a Child</option>
                    {children.map(child => (
                      <option value={child.id} key={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className='mb-5'>
              <Col xs={2}></Col>
              <Col xs={8} className='text-center'>
                <Button className={styles.submit__btn} type='submit'>
                  Claim
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
  fetchRewards: PropTypes.func.isRequired,
  updateReward: PropTypes.func.isRequired,
  reward: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
};

AddReward.defaultProps = {
  reward: [],
  children: []
};

export default container(ClaimReward);
