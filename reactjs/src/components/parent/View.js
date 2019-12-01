import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ListGroup,
  Form
} from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class View extends Component {
  constructor(props) {
    super(props);
    this.props.fetchChildren();
    this.props.fetchChores();
    this.props.deleteChore();
    this.state = {
      type: false
    };
  }

  handleChange = e => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { children, chores } = this.props;

    let weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][new Date().getDay()];

    return (
      <Fragment>
        <Container>
          <Row>
            <Col xs={12}>
              <h1>
                Welcome, <span className={styles.userName}>Monica</span>!
              </h1>
              <br />
              <span className={styles.date}>Today is {weekday}</span>
            </Col>
          </Row>
          <Row className='pt-5 pb-5 justify-content-center'>
            {children.map(child => (
              <Col className='pt-2' xs={12} lg={6} key={child.id}>
                <Card className={styles.card}>
                  <Card.Img
                    letiant='top'
                    src={`/avatars/${child.avatar}.png`}
                    className={styles.avatar}
                    alt='Child Avatar'
                  />
                  <Card.Title>
                    <h2 className={styles.h2__parentView}>{child.name}</h2>
                    <span>
                      {child.name} has {child.points} points!
                    </span>
                  </Card.Title>
                  <Card.Text>
                    {chores
                      .filter(
                        chore =>
                          chore.childId === child.id && chore.day === weekday
                      )
                      .map(chore => (
                        <Form>
                          <ListGroup letiant='flush'>
                            <ListGroup.Item
                              className={styles.list__group__item}
                              key={chore.id}
                            >
                              <span className={styles.custom__check__container}>
                                {' '}
                                {chore.description}
                                <input
                                  type='checkbox'
                                  key={chore.id}
                                  name='type'
                                  value={chore.type}
                                  onClick={this.handleChange}
                                />
                                <span
                                  className={styles.custom__check__mark}
                                ></span>
                                <span
                                  className='chore__controls'
                                  style={{ float: 'right' }}
                                >
                                  {' '}
                                  <Link to={`/parent/chore/edit/${chore.id}`}>
                                    <i className='fas fa-edit'></i>
                                  </Link>{' '}
                                  <Link to={`/parent/chore/delete/${chore.id}`}>
                                    <i className='fas fa-times'></i>
                                  </Link>
                                </span>
                              </span>
                            </ListGroup.Item>
                          </ListGroup>
                        </Form>
                      ))}
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

View.propTypes = {
  fetchChildren: PropTypes.func.isRequired,
  fetchChores: PropTypes.func.isRequired,
  deleteChore: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  ),
  chores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.bool,
      childId: PropTypes.string
    })
  )
};

View.defaultProps = {
  children: [],
  chores: []
};
export default container(View);
