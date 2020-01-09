import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';
import Loader from '../layout/Loader';

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.props.fetchRewards();
  }
  componentDidMount() {
    this.props.fetchRewards();
    this.setState({ isLoading: false });
  }

  delete = id => {
    const { deleteReward } = this.props;
    deleteReward(id);
  };

  render() {
    const { rewards } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    } else {
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
              {!isLoading && rewards.length === 0 ? (
                <p>There are no claimed rewards.</p>
              ) : (
                <ListGroup variant='flush' horizontal='lg'>
                  {rewards
                    .filter(reward => reward.claimed)
                    .map(reward => (
                      <ListGroup.Item
                        key={reward.id}
                        className={styles.list__group__item__rewards}
                      >
                        <span className={styles.points}></span>
                        {reward.description}
                        <span
                          style={{
                            float: 'right',
                            marginTop: '10px'
                          }}
                        >
                          Claimed by {reward.claimedBy}
                        </span>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </Col>
            <Col md={6} className='mt-3 pr-5 pl-5'>
              <h2 className={styles.inline__heading}>Available Rewards</h2>
              {'     '}
              <Link to='/parent/rewards/add'>
                <span style={{ float: 'right', margin: 'auto 0' }}>
                  <i className='fas fa-plus'></i> Add
                </span>
              </Link>
              {!isLoading && rewards.length === 0 ? (
                <p>
                  There are no available rewards. Why don't you{' '}
                  <Link to='/parent/rewards/add'>add one</Link>?
                </p>
              ) : (
                <ListGroup variant='flush' horizontal='lg'>
                  {rewards
                    .filter(reward => reward.claimed === false)
                    .map(reward => (
                      <ListGroup.Item
                        key={reward.id}
                        className={styles.list__group__item__rewards}
                      >
                        <span className={styles.points}>{reward.value}</span>{' '}
                        {reward.description}
                        <span
                          className='chore__controls'
                          style={{ float: 'right', marginTop: '10px' }}
                        >
                          <Link to={`/parent/rewards/claim/${reward.id}`}>
                            <i className='fas fa-award mr-2'></i>
                          </Link>
                          <Link to={`/parent/rewards/edit/${reward.id}`}>
                            <i className='fas fa-edit mr-2'></i>
                          </Link>
                          <span onClick={() => this.delete(reward.id)}>
                            <Link to='/parent/rewards/'>
                              <i className='fas fa-times'></i>
                            </Link>
                          </span>
                        </span>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </Col>
          </Row>
        </Container>
      );
    }
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
