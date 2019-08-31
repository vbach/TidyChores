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
import childView from './childView';

class View extends Component {
  onCheck = e => {};

  render() {
    const children = [
      {
        id: 1,
        name: 'Logan',
        avatar: '../../avatars/boy_001.png',
        chores: [
          {
            id: 1,
            name: 'Mop kitchen',
            type: 'complete'
          },
          {
            id: 2,
            name: 'Pick up bedroom',
            type: 'incomplete'
          },
          {
            id: 3,
            name: 'Walk dog',
            type: 'incomplete'
          }
        ]
      },
      {
        id: 2,
        name: 'Abigale',
        chores: [
          {
            id: 1,
            name: 'Mop kitchen',
            type: 'complete'
          },
          {
            id: 2,
            name: 'Pick up bedroom',
            type: 'complete'
          },
          {
            id: 3,
            name: 'Walk dog',
            type: 'incomplete'
          }
        ]
      },
      {
        id: 3,
        name: 'Audrey',
        chores: [
          {
            id: 1,
            name: 'Mop kitchen',
            type: 'incomplete'
          },
          {
            id: 2,
            name: 'Pick up bedroom',
            type: 'incomplete'
          },
          {
            id: 3,
            name: 'Walk dog',
            type: 'incomplete'
          }
        ]
      }
    ];
    return (
      <Fragment>
        <Container>
          <Row>
            <Col xs={12}>
              <h1>
                Welcome, <span className={styles.userName}>Monica</span>!
              </h1>
              <br />
              <span className={styles.date}>Today is Monday</span>
            </Col>
          </Row>
          <Row className="pt-5 pb-5">
            <Col>
              <CardGroup className={styles.card__group}>
                {children.map(child => (
                  <Card key={child.id} className={styles.card}>
                    <Card.Img
                      variant="top"
                      src={Boy_001}
                      className={styles.avatar}
                      alt="Child Avatar"
                    />
                    <Card.Title>
                      <h2>
                        <Link
                          to={`/parent/child/${child.id}`}
                          component={childView}
                        >
                          {child.name}
                        </Link>
                      </h2>
                    </Card.Title>
                    <Card.Text>
                      <ListGroup variant="flush">
                        {child.chores.map(chore => (
                          <ListGroup.Item
                            className={styles.list__group__item}
                            key={chore.id}
                          >
                            <input
                              type="checkbox"
                              checked={chore.type === 'complete'}
                              id={chore.id}
                              onChange={this.onCheck}
                              className={styles.form__check__input}
                            />{' '}
                            {chore.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Text>
                  </Card>
                ))}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default View;

View.propTypes = {
  loggedIn: PropTypes.bool
};

View.defaultProps = {
  loggedIn: true,
  children: []
};
