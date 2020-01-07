import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Loader from '../layout/Loader';
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
      // checked: false,
      chores: [
        {
          name: '',
          type: false,
          description: '',
          childId: ''
        }
      ],
      weather: '',
      auth: {},
      isLoading: true,
      message: null
    };
  }

  componentDidMount() {
    this.props.fetchChildren();
    this.props.fetchChores();
    let zipcode = this.props.auth.user.zipcode;

    if (zipcode) {
      let api = 'e038624658d3122cd8d6d465b87695c5';
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=${api}`
      )
        .then(results => {
          return results.json();
        })
        .then(data => {
          let temp = data.main.temp;
          let farTemp = Math.trunc((temp - 273.15) * 1.8 + 32);
          this.setState({ weather: farTemp, isLoading: false });
        })
        .catch(console.log);
    } else {
      this.setState({ isLoading: false, message: 'Unable to load weather.' });
    }
  }

  randomEvent = temp => {
    const niceWeather = [
      'go to the zoo.',
      'go to the park.',
      'go swimming.',
      'have a dance party.'
    ];

    const badWeather = [
      'watch a movie.',
      'bake cookies.',
      'take a nap.',
      'play a board game.'
    ];

    if (temp > 65) {
      let random = Math.floor(Math.random() * niceWeather.length);
      return niceWeather[random].toString();
    } else {
      let random = Math.floor(Math.random() * badWeather.length);
      return badWeather[random].toString();
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
    const { children, chores, auth } = this.props;
    const { isLoading } = this.state;

    let weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][new Date().getDay()];

    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <Fragment>
          <Container>
            <Row>
              <Col xs={12}>
                <h1>
                  Welcome,{' '}
                  <span className={styles.userName}>{auth.user.name}</span>!
                </h1>
                <br />
                <span className={styles.date}>
                  Today is {weekday} -{' '}
                  <Link to='/parent/viewall' url='/parent/viewwall'>
                    view all upcoming chores
                  </Link>
                  {this.state.message ? (
                    <p>{this.state.message}</p>
                  ) : (
                    <p>
                      It is currently {this.state.weather} degrees outside.
                      Today is a good day to{' '}
                      {this.randomEvent(this.state.weather)}
                    </p>
                  )}
                </span>
              </Col>
            </Row>
            {!isLoading && children.length === 0 ? (
              <Row className='pt-5 pb-5 justify-content-center'>
                <Col xs={12}>
                  <p className='text-center'>
                    You currently do not have any children added. It's easy to{' '}
                    <Link to='/parent/add/new'>add a child!</Link>
                  </p>
                </Col>
              </Row>
            ) : (
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
                            .map((chore, i) => (
                              <ListGroup.Item
                                className={styles.list__group__item}
                                key={chore.id}
                              >
                                <Form>
                                  <span onClick={this.handleChange}>
                                    <input
                                      name='type'
                                      type='checkbox'
                                      checked={chore.type}
                                      onChange={this.handleChange}
                                      value={chore.type}
                                    />
                                    <span></span>
                                  </span>{' '}
                                  {chore.description}
                                  <span
                                    className='chore__controls'
                                    style={{ float: 'right' }}
                                  >
                                    {' '}
                                    <Link
                                      to={`/parent/chores/edit/${chore.id}`}
                                    >
                                      <i className='fas fa-edit'></i>
                                    </Link>{' '}
                                    <span onClick={() => this.delete(chore.id)}>
                                      <i className='fas fa-times'></i>
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
            )}
          </Container>
        </Fragment>
      );
    }
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
      description: PropTypes.string,
      childId: PropTypes.string
    })
  ),
  auth: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

View.defaultProps = {
  children: [],
  chores: []
};
export default withRouter(container(View));
