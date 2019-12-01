import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRewards();
  }
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
              <div>
                {reward.claimed && (
                  <Row className={styles.rewards__table}>
                    <Col xs={8} key={reward.id} className='py-2'>
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
              <div>
                {!reward.claimed && (
                  <Row className={styles.rewards__table}>
                    <Col xs={1} key={reward.id} className='py-2'>
                      <span className={styles.points}>{reward.value}</span>
                    </Col>
                    <Col xs={9} className='my-auto py-1'>
                      {reward.description}
                    </Col>
                    <Col xs={2} className='my-auto py-1'>
                      <Link to={`/parent/rewards/edit/${reward.id}`}>
                        <i className='fas fa-edit mr-2'></i>
                      </Link>
                      <i className='fas fa-times'></i>
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
  rewards: PropTypes.array.isRequired
};

Rewards.defaultProps = {
  rewards: []
};

export default container(Rewards);
