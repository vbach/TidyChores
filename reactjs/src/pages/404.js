import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import MainMast from '../main-mast.png';
import { Container, Row, Col } from 'react-bootstrap';

class FourOhFour extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col xs={6} className="my-auto pr-2">
              <img
                src={MainMast}
                alt="Tidy Chores check list"
                className="mr-3"
              />
            </Col>
            <Col xs={6} className="my-auto">
              <h1>{this.props.error}</h1>
              <br />
              <span>
                Click <Link to="/">here</Link> to go back home!
              </span>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default FourOhFour;

FourOhFour.defaultProps = {
  error: 'Oh no! You lost your way!!'
};
