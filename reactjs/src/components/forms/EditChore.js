import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';

const onSubmit = () => {
  console.log('onsubmit');
};

class EditChore extends Component {
  render() {
    return (
      <Container className="mt-5">
        <div className="sign__up__form">
          <Form onSubmit={onSubmit} key={this.props.chore.id}>
            <Row className="mt-5">
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Edit Chore</h1>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mt-5 ">
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group controlId="formEditChore">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="editChore"
                    defaultValue={this.props.chore.name || ''}
                  />
                </Form.Group>
                <Form.Group controlId="formPointValue">
                  <Form.Label>Point Value</Form.Label>
                  <Form.Control
                    type="text"
                    name="pointValue"
                    defaultValue={this.props.chore.pointValue || 0}
                  />
                </Form.Group>
                <Form.Group controlId="formDay">
                  <Form.Label>Select a day</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={this.props.chore.day || 'Sunday'}
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
                <Form.Group controlId="formChild">
                  <Form.Label>Select a child</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={this.props.chore.child || ''}
                  >
                    <option>Logan</option>
                    <option>Abigale</option>
                    <option>Audrey</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSteps">
                  <Form.Label>Steps</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="step"
                    defaultValue={
                      this.props.chore.steps ||
                      'Add steps to help your child complete their chore!'
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mb-5">
              <Col xs={2}></Col>
              <Col xs={8} className="text-center">
                <Link to="/parent">
                  <Button type="submit" className={styles.submit__btn}>
                    Add
                  </Button>
                </Link>
              </Col>
              <Col xs={2}></Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}

EditChore.propTypes = {
  chore: PropTypes.shape({
    name: PropTypes.string,
    pointValue: PropTypes.string,
    day: PropTypes.string,
    child: PropTypes.string,
    steps: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
};

EditChore.defaultProps = {
  chore: {
    name: 'Mop kitchen',
    pointValue: 30,
    day: 'Tuesday',
    child: 'Abigale'
  }
};

export default EditChore;
