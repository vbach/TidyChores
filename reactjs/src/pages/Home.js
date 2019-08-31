import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './app.module.css';
import MainMast from '../main-mast.png';
class Home extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Row className="pt-5">
            <Col md={7} className="text-center">
              <img src={MainMast} alt="Tidy Chores" />
            </Col>
            <Col md={5} className="my-auto">
              <h1>Chores made easy!</h1>
              <p>
                Tidy Chores makes tracking chores easy! Eliminate the stress of
                tracking who did what and sign up for Tidy Chores!
              </p>
            </Col>
          </Row>
          <div className="pt-5 pb-5">
            <hr></hr>
          </div>

          <Row className="pt-5">
            <Col className="my-auto text-center">
              <img
                src="/icons/006-glass.png"
                alt=" "
                className={styles.icons}
              />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
            <Col className="my-auto text-center">
              <img
                src="/icons/005-broom.png"
                alt="Clean stars icon"
                className={styles.icons}
              />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
            <Col className="my-auto text-center">
              <img
                src="/icons/003-washing-machine.png"
                alt=" "
                className={styles.icons}
              />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
          </Row>
          <Row className="pt-5">
            <Col className="my-auto text-center">
              <img
                src="/icons/002-bubbles.png"
                className={styles.icons}
                alt=" "
              />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
            <Col className="my-auto text-center">
              <img
                src="/icons/001-brush.png"
                className={styles.icons}
                alt=" "
              />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
            <Col className="my-auto text-center">
              <img src="/icons/clean.png" className={styles.icons} alt=" " />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
          </Row>
          <Row className={styles.divider}></Row>
          <Row className={styles.testimonials}>
            <Col></Col>
            <Col xs={6} className="text-center">
              <div className=" pb-5">
                <hr></hr>
              </div>
              <h2>What people are saying</h2>
              <img src="https://via.placeholder.com/150" alt=" " />
              <p class="testimonial__text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo.
              </p>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Home;
