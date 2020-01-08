import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import styles from '../app.module.css';
import container from './container';

class AddStep extends Component {
  constructor(props) {
    super(props);
    this.props.fetchStep();
    this.state = {
      stepDescription: '',
      choreId: this.props.match.params.id,
      success: '',
      error: ''
    };
    // this.loadData();
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.choreId === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value. For example, { stepDescription: 'hi'}
    this.setState({
      [name]: value
    });
  };

  // loadData = async () => {
  //   const {
  //     match: {
  //       params: { id }
  //     },
  //     fetchStep
  //   } = this.props;
  //   // if no id don't load the item
  //   if (!id) return;
  //   await fetchStep(id);
  //   // update the state with the data from the updated item
  //   const { step } = this.props;
  //   this.setState({ ...step });
  // };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    event.target.className += ' was-validated';
    const {
      createStep,
      updateStep,
      match: {
        params: { id }
      }
    } = this.props;
    const { stepDescription, choreId } = this.state;

    // if (id) {
    //   updateStep({ id, stepDescription, choreId });
    //   this.setState({ success: 'Success! Step updated!' });
    // } else {
    if (stepDescription !== '' && choreId !== '') {
      createStep({ stepDescription, choreId });
      this.setState({
        success: 'Success! You have created a step, go ahead and add another!'
      });
      // }
    }
  };

  render() {
    const { stepDescription, success } = this.state;
    const {
      step: { id }
    } = this.props;
    return (
      <Container className='mt-5 pb-5'>
        <div className='sign__up__form '>
          <Row className='mt-5'>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h1>{id ? 'Edit Step' : 'Add Step'}</h1>
              {success ? <Alert variant='success'>{success}</Alert> : ''}
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row className='mt-5 '>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Form onSubmit={this.save} noValidate>
                <Form.Group controlId='formAddStep'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    name='stepDescription'
                    onChange={this.handleInputChange}
                    value={stepDescription}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter a Description.
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

AddStep.propTypes = {
  createStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
  fetchStep: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  step: PropTypes.shape({
    stepDescription: PropTypes.string,
    choreId: PropTypes.string
  })
};

AddStep.defaultProps = {
  step: {}
};

export default container(AddStep);
