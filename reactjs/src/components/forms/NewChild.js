import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './app.module.css';

class NewChild extends Component {
  render() {
    return (
      <Container className="mt-5">
        <div className="sign__up__form">
          <Form>
            <Row className="mt-5">
              <Col xs={2}></Col>
              <Col xs={8}>
                <h1>Add a Child</h1>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row className="mt-5 ">
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Group controlId="formChildName">
                  <Form.Label>Child's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="childName"
                    placeholder="First Name"
                  />
                </Form.Group>
                <Form.Group controlId="formAvatar">
                  <Form.Label>Select an Avatar</Form.Label>
                  <Form.Control type="radio" name="avatar" />
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

NewChild.propTypes = {
  child: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  })
};

NewChild.defaultProps = {
  child: {}
};

export default NewChild;
