import React, { Fragment, Component, useState } from 'react';
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
import childView from './childView';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };
  }

  handleCheckChange = e => {
    console.log('checkbox changed', e);
    this.setState = { isChecked: e.target.checked };
  };

  toggleIsChecked = () => {
    console.log('toggling is checked');
    this.setState({ isChecked: !this.state.isChecked });
    this.handleCheckChange();
  };

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
                {this.props.children.map(child => (
                  <Card key={child.id} className={styles.card}>
                    <Card.Img
                      variant="top"
                      src={child.avatar}
                      className={styles.avatar}
                      alt="Child Avatar"
                    />
                    <Card.Title>
                      <h2 className={styles.h2__parentView}>
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
                              checked={chore.type === true}
                              id={chore.id}
                              name={chore.id}
                              value={chore.id}
                              onChange={this.handleCheckChange}
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
  loggedIn: PropTypes.bool,
  children: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    chores: PropTypes.array
  })
};

View.defaultProps = {
  loggedIn: true,
  children: [
    {
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
    },
    {
      id: 2,
      name: 'Abigale',
      avatar: '../../avatars/girl_002.png',
      chores: [
        {
          id: 1,
          name: 'Mop kitchen',
          type: true
        },
        {
          id: 2,
          name: 'Pick up bedroom',
          type: true
        },
        {
          id: 3,
          name: 'Walk dog',
          type: false
        }
      ]
    },
    {
      id: 3,
      name: 'Audrey',
      avatar: '../../avatars/girl_003.png',
      chores: [
        {
          id: 1,
          name: 'Mop kitchen',
          type: false
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
  ]
};
