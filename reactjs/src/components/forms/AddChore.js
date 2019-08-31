import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';

class AddChore extends Component {
  render() {
    return (
      <Container className="mt-5">
        <div className="sign__up__form">
          <Form>
            <Row className="mt-5">
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Add Chore</h1>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mt-5 ">
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group controlId="formAddChore">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="AddChore"
                    placeholder="Mop Dining Room"
                  />
                </Form.Group>
                <Form.Group controlId="formPointValue">
                  <Form.Label>Point Value</Form.Label>
                  <Form.Control
                    type="text"
                    name="pointValue"
                    placeholder="10"
                  />
                </Form.Group>
                <Form.Group controlId="formDay">
                  <Form.Label>Select a day</Form.Label>
                  <Form.Control as="select">
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
                  <Form.Control as="select">
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
                    placeholder="Fill mop bucket with water"
                  />
                </Form.Group>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mb-5">
              <Col xs={2}></Col>
              <Col xs={8} className="text-center">
                <Link to="/parent">
                  <Button className={styles.submit__btn}>Add</Button>
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

AddChore.propTypes = {
  chore: PropTypes.shape({
    name: PropTypes.string,
    pointValue: PropTypes.string,
    day: PropTypes.string,
    child: PropTypes.string,
    steps: PropTypes.string
  })
};

AddChore.defaultProps = {
  chore: {}
};

export default AddChore;
