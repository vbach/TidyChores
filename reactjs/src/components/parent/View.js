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
  Form,
  Button
} from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class View extends Component {
  constructor(props) {
    super(props);
    this.props.fetchChildren();
    this.props.fetchChores();
    this.state = {
      checked: false
    };
  }

  componentDidMount() {
    this.props.fetchChildren();
    this.props.fetchChores();
  }

  handleChange = event => {
    this.setState({ checked: !this.state.checked });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
  };

  delete = id => {
    const { deleteChore } = this.props;
    deleteChore(id);
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

    const submitBtn = this.state.checked ? (
      <div>
        <Button
          type='submit'
          style={{ float: 'right' }}
          className={styles.update__button__home}
        >
          Update
        </Button>
      </div>
    ) : null;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col xs={12}>
              <h1>
                Welcome, <span className={styles.userName}>Monica</span>!
              </h1>
              <br />
              <span className={styles.date}>
                Today is {weekday} -{' '}
                <Link to='/parent/viewall' url='/parent/viewwall'>
                  view all upcoming chores
                </Link>
              </span>
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
                    <ListGroup variant='flush'>
                      {chores
                        .filter(
                          chore =>
                            chore.childId === child.id &&
                            chore.day === weekday.toLowerCase()
                        )
                        .map(chore => (
                          <ListGroup.Item
                            className={styles.list__group__item}
                            key={chore.id}
                          >
                            <Form onClick={this.save}>
                              <span onClick={this.handleChange}>
                                <input
                                  type='checkbox'
                                  checked={this.state.checked}
                                  onChange={this.handleChange}
                                />
                                <span></span>
                              </span>{' '}
                              {chore.description}
                              <span
                                className='chore__controls'
                                style={{ float: 'right' }}
                              >
                                {' '}
                                <Link to={`/parent/chores/edit/${chore.id}`}>
                                  <i className='fas fa-edit'></i>
                                </Link>{' '}
                                <span onClick={() => this.delete(chore.id)}>
                                  <Link to='/parent'>
                                    <i className='fas fa-times'></i>
                                  </Link>
                                </span>
                                {/* {submitBtn} */}
                              </span>
                              {/* </span> */}
                            </Form>{' '}
                            {/* </span> */}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
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
  children: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  ),
  chores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      childId: PropTypes.string
    })
  )
};

View.defaultProps = {
  children: [],
  chores: []
};
export default container(View);
