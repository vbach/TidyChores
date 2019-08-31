import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';

class AddReward extends Component {
  render() {
    return (
      <Container className="mt-5">
        <div className="sign__up__form">
          <Form>
            <Row className="mt-5">
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Add Reward</h1>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mt-5 ">
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group controlId="formAddReward">
                  <Form.Label>Description of reward</Form.Label>
                  <Form.Control type="text" name="rewardDesc" placeholder="" />
                </Form.Group>
                <Form.Group controlId="formPointValue">
                  <Form.Label>Point Value</Form.Label>
                  <Form.Control
                    type="text"
                    name="pointValue"
                    placeholder="10"
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

AddReward.propTypes = {
  reward: PropTypes.shape({
    rewardDescription: PropTypes.string,
    pointValue: PropTypes.string
  })
};

AddReward.defaultProps = {
  reward: {}
};

export default AddReward;
