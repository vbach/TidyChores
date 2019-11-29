import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../app.module.css';
import container from './container';

class AddChore extends Component {
  constructor(props) {
    super(props);
    this.props.fetchChildren();
    this.props.fetchChore();
    this.state = {
      description: '',
      points: '',
      day: 'Sunday',
      childId: '',
      steps: ''
    };
    this.loadData();
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
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      createChore,
      updateChore,
      match: {
        params: { id }
      }
    } = this.props;
    const { description, points, day, childId, steps } = this.state;
    if (id) {
      updateChore({ id, description, points, day, childId, steps });
    } else {
      createChore({ description, points, day, childId, steps });
    }
  };
  loadData = async () => {
    const {
      match: {
        params: { id }
      },
      fetchChore
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchChore(id);
    // update the state with the data from the updated item
    const { chore } = this.props;
    this.setState({ ...chore });
  };
  render() {
    const { children } = this.props;
    const { description, points, day, childId, steps } = this.state;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form '>
          <Form onSubmit={this.save}>
            <Row className='mt-5'>
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Add Chore</h1>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className='mt-5 '>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group controlId='formAddChore'>
                  <Form.Label>Description</Form.Label>
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
                    name='points'
                    onChange={this.handleInputChange}
                    value={points}
                  />
                </Form.Group>
                <Form.Group controlId='formDay'>
                  <Form.Label>Select a day</Form.Label>
                  <Form.Control
                    as='select'
                    name='day'
                    onChange={this.handleInputChange}
                    value={day}
                  >
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='formChild'>
                  <Form.Label>Select a child</Form.Label>

                  <Form.Control
                    as='select'
                    name='childId'
                    onChange={this.handleInputChange}
                    value={childId}
                  >
                    {children.map(child => (
                      <option value={child.id} key={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='formSteps'>
                  <Form.Label>Steps</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    name='step'
                    placeholder='Fill mop bucket with water'
                  />
                </Form.Group>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className='mb-5'>
              <Col xs={2}></Col>
              <Col xs={8} className='text-center'>
                <Button className={styles.submit__btn} type='submit'>
                  Submit
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

AddChore.propTypes = {
  fetchChildren: PropTypes.func.isRequired,
  createChore: PropTypes.func.isRequired,
  fetchChore: PropTypes.func.isRequired,
  updateChore: PropTypes.func.isRequired,
  chore: PropTypes.shape({
    description: PropTypes.string,
    points: PropTypes.string,
    day: PropTypes.string,
    childId: PropTypes.string,
    steps: PropTypes.string
  }),
  children: PropTypes.shape({
    name: PropTypes.string
  })
};

AddChore.defaultProps = {
  chore: {}
};

export default container(AddChore);
