import React, { Fragment, Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class Loader extends Component {
  render() {
    return (
      <Fragment>
        <Container className='mt-5 pb-5'>
          <Row>
            <Col xs={12} className='text-center'>
              <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Loader;
