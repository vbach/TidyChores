import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import { Container, Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class ViewAll extends Component {
  constructor(props) {
    super(props);
    this.props.fetchChildren();
    this.props.fetchChores();
    this.state = {
      type: false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.fetchChildren();
    this.props.fetchChores();
    this.setState({
      isLoading: false
    });
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
    const { children, chores, auth } = this.props;

    let weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][new Date().getDay()];

    if (this.state.isLoading) {
      return <Loader />;
    } else {
      return (
        <Fragment>
          <Container>
            <Row>
              <Col xs={12}>
                <h1>Manage All Chores</h1>
              </Col>
            </Row>
            <Row className='pt-5 pb-5 justify-content-center'>
              {children
                .filter(child => child.parentId === auth.user.id)
                .map(child => (
                  <Col className='pt-2' xs={12} lg={6} key={child.id}>
                    <Card className={styles.card}>
                      <Card.Title>
                        <h2 className={styles.h2__parentViewAll}>
                          {child.name}
                        </h2>
                        <span></span>
                      </Card.Title>
                      <Card.Text>
                        {chores
                          .filter(chore => chore.childId === child.id)
                          .map(chore => (
                            <Form>
                              <ListGroup letiant='flush'>
                                <ListGroup.Item
                                  className={styles.list__group__item}
                                  key={chore.id}
                                >
                                  {' '}
                                  {chore.day} - {chore.description}
                                  <span
                                    className='chore__controls'
                                    style={{ float: 'right' }}
                                  >
                                    {' '}
                                    <Link to={`/parent/chore/edit/${chore.id}`}>
                                      <i className='fas fa-edit'></i>
                                    </Link>{' '}
                                    <Link
                                      to={`/parent/chore/delete/${chore.id}`}
                                    >
                                      <i className='fas fa-times'></i>
                                    </Link>
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
}

ViewAll.propTypes = {
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
      type: PropTypes.bool,
      childId: PropTypes.string
    })
  ),
  auth: PropTypes.object.isRequired
};

ViewAll.defaultProps = {
  children: [],
  chores: []
};
export default container(ViewAll);
