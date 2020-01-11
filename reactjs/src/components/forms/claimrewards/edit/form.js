import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from '../../app.module.css';
import container from './container';

class ClaimReward extends Component {
  constructor(props) {
    super(props);
    this.loadData();
    this.props.fetchChildren();
    this.state = {
      description: '',
      claimed: true,
      claimedBy: '',
      name: '',
      points: '',
      value: '',
      childId: '',
      error: '',
      success: ''
    };
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // // find the value of the input
    const input =
      target.claimedBy === 'checkbox' ? target.checked : target.value;
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
      fetchClaimedReward
    } = this.props;
    // if no id don't load the item

    await fetchClaimedReward(id);
    // update the state with the data from the updated item
    const { reward } = this.props;
    this.setState({ ...reward });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    event.target.className += ' was-validated';

    const {
      children,
      updateClaimedReward,
      match: {
        params: { id }
      }
    } = this.props;

    const { claimedBy } = this.state;
    let claimedByName;

    for (let i = 0; i < children.length; i++) {
      if (claimedBy === children[i].id) {
        // if (value > children[i].points) {
        //   this.setState({
        //     error: 'Child does not have enough points to claim reward.'
        //   });
        //   return;
        // } else { }
        claimedByName = children[i].name;
      }
    }

    // if reward claimed delete from rewards and create in claimed rewards
    // Update child's score.
    if (id && claimedByName !== '') {
      updateClaimedReward({ id, claimedBy: claimedByName });
      this.setState({ success: 'Success! You have updated the reward!' });
    }
  };

  render() {
    const { description, claimedBy, success, error } = this.state;
    const { children } = this.props;
    return (
      <Container className='mt-5 min-vh-100'>
        <div className='sign__up__form'>
          <Row className='mt-5'>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h1>Edit Claimed Reward</h1>
              {success ? <Alert variant='success'>{success}</Alert> : ''}
              {error ? <Alert variant='warning'>{error}</Alert> : ''}
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row className='mt-3 '>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Form onSubmit={this.save} noValidate>
                Editting Claimed Reward: {description}
                <Form.Group controlId='formChild'>
                  <Form.Label>Change who reward is claimed by:</Form.Label>
                  <Form.Control
                    as='select'
                    name='claimedBy'
                    onChange={this.handleInputChange}
                    value={claimedBy}
                    required
                  >
                    <option value=''></option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please select a child.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    {error}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className={styles.submit__btn} type='submit'>
                  Claim
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

ClaimReward.propTypes = {
  fetchChildren: PropTypes.func.isRequired,
  updateChild: PropTypes.func.isRequired,
  fetchClaimedReward: PropTypes.func.isRequired,
  updateClaimedReward: PropTypes.func.isRequired,
  reward: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired
};

ClaimReward.defaultProps = {
  reward: [],
  children: []
};

export default container(ClaimReward);
