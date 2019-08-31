import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './app.module.css';

class Rewards extends Component {
  render() {
    return (
      <Container className="mt-5 min-vh-100">
        <h1>Rewards</h1>

        <br />
        <span className={styles.date}>
          You can add rewards and view all claimed and available rewards as
          well.
        </span>
        <Row className="mt-3 pb-5">
          <Col md={6} className="mt-3 pl-5 pr-5">
            <h2 className={styles.inline__heading}>Claimed Rewards</h2>
            {this.props.rewards.map(reward => (
              <div>
                {reward.claimed && (
                  <Row className={styles.rewards__table}>
                    <Col xs={8} key={reward.id} className="py-2">
                      <span className={styles.points}>
                        {reward.rewardDescription}
                      </span>
                    </Col>
                    <Col xs={4} className="my-auto">
                      {reward.claimedBy}
                    </Col>
                  </Row>
                )}
              </div>
            ))}
          </Col>
          <Col md={6} className="mt-3 pr-5 pl-5">
            <h2 className={styles.inline__heading}>Available Rewards</h2>{' '}
            <span style={{ float: 'right' }}>
              <Link to="/parent/:id/rewards/add">
                <i className="fas fa-plus"></i> Add
              </Link>
            </span>
            {this.props.rewards.map(reward => (
              <div>
                {!reward.claimed && (
                  <Row className={styles.rewards__table}>
                    <Col xs={1} key={reward.id} className="py-2">
                      <span className={styles.points}>{reward.points}</span>
                    </Col>
                    <Col xs={9} className="my-auto py-1">
                      {reward.rewardDescription}
                    </Col>
                    <Col xs={2} className="my-auto py-1">
                      <Link to="/parent/:id/rewards/edit">
                        <i className="fas fa-edit mr-2"></i>
                      </Link>
                      <i className="fas fa-times"></i>
                    </Col>
                  </Row>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

Rewards.propTypes = {
  loggedIn: PropTypes.string.isRequired,
  rewards: PropTypes.array.isRequired
};

Rewards.defaultProps = {
  loggedIn: false,
  rewards: [
    {
      id: 1,
      rewardDescription: '2 movie tickets',
      claimed: true,
      points: 50,
      claimedBy: 'Logan'
    },
    {
      id: 2,
      rewardDescription: 'No chore day',
      claimed: false,
      points: 50,
      claimedBy: null
    },
    {
      id: 3,
      rewardDescription: 'Go to the zoo',
      claimed: false,
      points: 50,
      claimedBy: null
    },
    {
      id: 4,
      rewardDescription: 'Day adventure with mom',
      claimed: true,
      points: 50,
      claimedBy: 'Abigale'
    }
  ]
};

export default Rewards;
