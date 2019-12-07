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
    this.state = {
      id: '',
      description: '',
      points: '',
      day: '',
      type: 'false',
      childId: ''
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

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    event.target.className += ' was-validated';
    const {
      createChore,
      updateChore,
      history,
      match: {
        params: { id }
      }
    } = this.props;

    const { description, points, day, type, childId } = this.state;
    if (id) {
      updateChore({ id, description, points, day, type, childId });
    } else {
      createChore({ description, points, day, childId });
    }
  };

  render() {
    const { description, points, day, childId } = this.state;
    const {
      children,
      chore: { id }
    } = this.props;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form '>
          <Row className='mt-5'>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h1>{id ? 'Edit Chore' : 'Add Chore'}</h1>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row className='mt-5 '>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Form onSubmit={this.save} noValidate>
                <Form.Group controlId='formAddChore'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    name='description'
                    onChange={this.handleInputChange}
                    value={description}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a description.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formPointValue'>
                  <Form.Label>Point Value</Form.Label>
                  <Form.Control
                    type='text'
                    name='points'
                    onChange={this.handleInputChange}
                    value={points}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a point value.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formDay'>
                  <Form.Label>Select a day</Form.Label>
                  <Form.Control
                    as='select'
                    name='day'
                    onChange={this.handleInputChange}
                    value={day}
                    required
                  >
                    <option value=''></option>
                    <option value='sunday'>Sunday</option>
                    <option value='monday'>Monday</option>
                    <option value='tuesday'>Tuesday</option>
                    <option value='wednesday'>Wednesday</option>
                    <option value='thursday'>Thursday</option>
                    <option value='friday'>Friday</option>
                    <option value='saturday'>Saturday</option>
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please choose a day.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formChild'>
                  <Form.Label>Select a child</Form.Label>

                  <Form.Control
                    as='select'
                    name='childId'
                    onChange={this.handleInputChange}
                    value={childId}
                    required
                  >
                    <option value=''>Select a child</option>
                    {children.map(child => (
                      <option value={child.id} key={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please select a child
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className={styles.submit__btn} type='submit'>
                  {id ? 'Edit' : 'Add'}
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

AddChore.propTypes = {
  createChore: PropTypes.func.isRequired,
  updateChore: PropTypes.func.isRequired,
  fetchChildren: PropTypes.func.isRequired,
  fetchChore: PropTypes.func.isRequired,
  // chore: PropTypes.array.isRequired,
  chore: PropTypes.shape({
    description: PropTypes.string,
    points: PropTypes.string,
    day: PropTypes.oneOf([
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]),
    type: PropTypes.string,
    childId: PropTypes.string
  }),
  children: PropTypes.array.isRequired
};

AddChore.defaultProps = {
  chore: [],
  children: []
};

export default container(AddChore);
