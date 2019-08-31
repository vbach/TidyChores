import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ListGroup
} from 'react-bootstrap';
import styles from './app.module.css';
import Boy_001 from '../../avatars/boy_001.png';

class childView extends Component {
  render() {
    const children = [
      {
        id: 1,
        name: 'Aiden',
        avatar: '../../avatars/boy_001.png',
        points: 125,
        chores: [
          {
            id: 1,
            name: 'Mop kitchen',
            type: 'complete',
            day: 'Monday'
          },
          {
            id: 2,
            name: 'Pick up bedroom',
            type: 'incomplete',
            day: 'Monday'
          },
          {
            id: 3,
            name: 'Walk dog',
            type: 'incomplete',
            day: 'Monday'
          },
          {
            id: 4,
            name: 'Clean liter box',
            type: 'incomplete',
            day: 'Tuesday'
          },
          {
            id: 5,
            name: 'Pick up bedroom',
            type: 'incomplete',
            day: 'Tuesday'
          }
        ]
      }
    ];

    return (
      <Fragment>
        <Container>
          <Row>
            {children.map(child => (
              <Col xs={12} key={child.id}>
                <Row>
                  <Col xs={1}>
                    <img src={Boy_001} alt="" />
                  </Col>
                  <Col xs={11}>
                    <h1>{child.name}</h1>
                    <br />
                    <span className={styles.date}>
                      {child.name} has {child.points} points
                    </span>
                  </Col>
                </Row>

                <CardGroup className={styles.card__group}>
                  <Card className={styles.card}>
                    <Card.Title>
                      <h2>Chores</h2>
                    </Card.Title>
                    <Card.Text>
                      {child.chores.map(chore => (
                        <ListGroup
                          variant="flush"
                          key={chore.day}
                          className={styles.child__view__list}
                        >
                          <ListGroup.Item className={styles.list__group__item}>
                            <strong>{chore.day}</strong> {' - '}
                            <input
                              type="checkbox"
                              checked={chore.type === 'complete'}
                              id={chore.id}
                              onChange={this.onCheck}
                              className={styles.form__check__input}
                            />{' '}
                            {chore.name}{' '}
                            <span
                              className="chore__controls"
                              style={{ float: 'right' }}
                            >
                              <Link to="/parent/:id/chore/edit">
                                <i className="fas fa-edit"></i>
                              </Link>{' '}
                              <i className="fas fa-times"></i>
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    </Card.Text>
                  </Card>
                </CardGroup>
              </Col>
            ))}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

childView.propTypes = {
  children: PropTypes.array.isRequired,
  loggedIn: PropTypes.string.isRequired
};

childView.defaultProps = {
  children: [],
  loggedIn: true
};
export default childView;
