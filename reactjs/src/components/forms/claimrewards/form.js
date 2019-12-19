import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from '../app.module.css';
import container from './container';

class ClaimReward extends Component {
  constructor(props) {
    super(props);
    this.props.fetchReward();
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
    this.loadData();
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
      fetchReward
    } = this.props;
    // if no id don't load the item

    await fetchReward(id);
    // update the state with the data from the updated item
    const { reward } = this.props;
    this.setState({ ...reward });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    event.target.className += ' was-validated';

    const {
      updateReward,
      updateChild,
      children,
      match: {
        params: { id }
      }
    } = this.props;

    // Need to set up foreign key restraint to children.
    // Need to pull child points and deduct reward value.
    const { claimedBy, value } = this.state;
    let newPoints;
    let claimedByName;

    for (let i = 0; i < children.length; i++) {
      if (claimedBy === children[i].id) {
        newPoints = children[i].points - value;
        claimedByName = children[i].name;
      }
    }

    let claimed = true;
    if (id && claimedByName !== '') {
      updateReward({ id, claimedBy: claimedByName, claimed });
      updateChild({ id: claimedBy, points: newPoints });
      this.setState({ success: "Success! You've claimed a reward!" });
    }
  };

  render() {
    const { description, claimedBy, success } = this.state;
    const { children, error } = this.props;
    return (
      <Container className='mt-5 min-vh-100'>
        <div className='sign__up__form'>
          <Row className='mt-5'>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h1>Claim Reward</h1>
              {success ? <Alert variant='success'>{success}</Alert> : ''}
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row className='mt-5 '>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Form onSubmit={this.save} noValidate>
                Claiming reward: {description}
                <Form.Group controlId='formChild'>
                  <Form.Label>Select a child</Form.Label>
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
  fetchReward: PropTypes.func.isRequired,
  updateReward: PropTypes.func.isRequired,
  fetchChildren: PropTypes.func.isRequired,
  updateChild: PropTypes.func.isRequired,
  reward: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired
};

ClaimReward.defaultProps = {
  reward: [],
  children: []
};

export default container(ClaimReward);
