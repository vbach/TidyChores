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

class ChildView extends Component {
  render() {
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
                {this.props.child.map(child => (
                  <Card key={child.id} className={styles.card}>
                    <Card.Img
                      variant="top"
                      src={child.avatar}
                      className={styles.avatar}
                      alt="Child Avatar"
                    />
                    <Card.Title>
                      <h2 className={styles.h2__parentChildView}>
                        <Link
                          to={`/parent/child/${child.id}`}
                          component={ChildView}
                        >
                          Hi, {child.name}
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
                            <div className="custom__checkbox">
                              <input
                                type="checkbox"
                                checked={chore.type === true}
                                id={chore.id}
                                name={chore.id}
                                onChange={this.onCheck}
                              />{' '}
                            </div>

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

export default ChildView;

ChildView.propTypes = {
  loggedIn: PropTypes.bool,
  child: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    chores: PropTypes.array
  })
};

ChildView.defaultProps = {
  loggedIn: true,
  child: {
    id: 1,
    name: 'Logan',
    avatar: '/avatars/boy_001.png',
    chores: [
      {
        id: 1,
        name: 'Mop kitchen',
        type: true
      },
      {
        id: 2,
        name: 'Pick up bedroom',
        type: false
      },
      {
        id: 3,
        name: 'Walk dog',
        type: false
      }
    ]
  }
};
