import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRewards();
  }

  delete = id => {
    const { deleteReward } = this.props;
    deleteReward(id);
  };

  render() {
    const { rewards } = this.props;
    return (
      <Container className='mt-5 min-vh-100'>
        <h1>Rewards</h1>

        <br />
        <span className={styles.date}>
          You can view, add, and help your child claim a reward.
        </span>
        <Row className='mt-3 pb-5'>
          <Col md={6} className='mt-3 pl-5 pr-5'>
            <h2 className={styles.inline__heading}>Claimed Rewards</h2>
            {rewards.map(reward => (
              <div key={reward.id}>
                {reward.claimed && (
                  <Row className={styles.rewards__table}>
                    <Col xs={8} className='py-2'>
                      <span className={styles.points}></span>
                      {'  '}
                      {reward.description}
                    </Col>
                    <Col xs={4} className='my-auto'>
                      Claimed by {reward.claimedBy}
                    </Col>
                  </Row>
                )}
              </div>
            ))}
          </Col>
          <Col md={6} className='mt-3 pr-5 pl-5'>
            <h2 className={styles.inline__heading}>Available Rewards</h2>{' '}
            <span style={{ float: 'right' }}>
              <Link to='/parent/rewards/add'>
                <i className='fas fa-plus'></i> Add
              </Link>
            </span>
            {rewards.map(reward => (
              <div key={reward.id}>
                {!reward.claimed && (
                  <Row className={styles.rewards__table}>
                    <Col xs={1} className='py-2'>
                      <span className={styles.points}>{reward.value}</span>
                    </Col>
                    <Col xs={9} className='my-auto py-1'>
                      {reward.description}
                    </Col>
                    <Col xs={2} className='my-auto py-1'>
                      <Link to={`/parent/rewards/edit/${reward.id}`}>
                        <i className='fas fa-edit mr-2'></i>
                      </Link>
                      <span onClick={() => this.delete(reward.id)}>
                        <Link to='/parent/rewards/'>
                          <i className='fas fa-times'></i>
                        </Link>
                      </span>
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
  fetchRewards: PropTypes.func.isRequired,
  deleteReward: PropTypes.func.isRequired,
  rewards: PropTypes.array.isRequired
};

Rewards.defaultProps = {
  rewards: []
};

export default container(Rewards);
