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
                <p>Select an Avatar</p>
                <Form.Group controlId="formAvatar">
                  <Row>
                    <Col xs={4} className="text-center">
                      {' '}
                      <img src="/avatars/boy_001.png" alt="Boy" />
                      <Form.Check
                        type="radio"
                        name="boy_001"
                        value="boy_001"
                        className="text-center"
                      />
                    </Col>
                    <Col xs={4} className="text-center">
                      {' '}
                      <img src="/avatars/boy_002.png" alt="Boy" />
                      <Form.Check
                        type="radio"
                        name="boy_002"
                        value="boy_002"
                        className="text-center"
                      />
                    </Col>
                    <Col xs={4} className="text-center">
                      {' '}
                      <img src="/avatars/boy_003.png" alt="Boy" />
                      <Form.Check
                        type="radio"
                        name="boy_003"
                        value="boy_003"
                        className="text-center"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={4} className="text-center">
                      {' '}
                      <img src="/avatars/girl_002.png" alt="Girl" />
                      <Form.Check
                        type="radio"
                        name="girl_002"
                        value="girl_002"
                        className="text-center"
                      />
                    </Col>
                    <Col xs={4} className="text-center">
                      {' '}
                      <img src="/avatars/girl_001.png" alt="Girl" />
                      <Form.Check
                        type="radio"
                        name="girl_001"
                        value="girl_001"
                        className="text-center"
                      />
                    </Col>
                    <Col xs={4} className="text-center">
                      {' '}
                      <img src="/avatars/girl_003.png" alt="Girl" />
                      <Form.Check
                        type="radio"
                        name="girl_003"
                        value="girl_003"
                        className="text-center"
                      />
                    </Col>
                  </Row>
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
