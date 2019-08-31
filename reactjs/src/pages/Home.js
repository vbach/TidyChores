import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './app.module.css';
import MainMast from '../main-mast.png';
import starIcon from '../icons/clean.png';
import brushIcon from '../icons/001-brush.png';
import bubblesIcon from '../icons/002-bubbles.png';
import washingMachineIcon from '../icons/003-washing-machine.png';
import broomIcon from '../icons/005-broom.png';
import glassIcon from '../icons/006-glass.png';

class Home extends Component {
  render() {
    return (
      <Container>
        <Row className="pt-5">
          <Col md={7} className="text-center">
            <img src={MainMast} alt="" />
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
            <img src={starIcon} alt="" className={styles.icons} />
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
          </Col>
          <Col className="my-auto text-center">
            <img
              src={brushIcon}
              alt="Clean stars icon"
              className={styles.icons}
            />
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
          </Col>
          <Col className="my-auto text-center">
            <img src={washingMachineIcon} alt="" className={styles.icons} />
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col className="my-auto text-center">
            <img src={broomIcon} alt="" className={styles.icons} />
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
          </Col>
          <Col className="my-auto text-center">
            <img src={bubblesIcon} alt="" className={styles.icons} />
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
          </Col>
          <Col className="my-auto text-center">
            <img src={glassIcon} alt="" className={styles.icons} />
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
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
            <img src="https://via.placeholder.com/150" />
            <p class="testimonial__text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo.
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
