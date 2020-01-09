import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import styles from './app.module.css';
import container from './container';
class View extends Component {
  constructor(props) {
    super(props);
    this.props.fetchChore();
    this.props.fetchSteps();
    this.state = {
      type: false,
      isLoading: true,
      id: '',
      description: '',
      day: '',
      steps: {
        description: '',
        choreId: ''
      }
    };
    this.loadData();
  }

  componentDidMount() {
    this.props.fetchChore();
    this.props.fetchSteps();
    this.setState({
      isLoading: false
    });
  }

  loadData = async () => {
    const {
      match: {
        params: { id }
      },
      fetchChore
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchChore(id);
    // update the state with the data from the updated item
    const { chore } = this.props;
    this.setState({ ...chore });
  };

  handleChange = e => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value
    });
  };

  delete = id => {
    const { deleteStep } = this.props;
    deleteStep(id);
  };

  render() {
    const { description, isLoading, day, id } = this.state;
    const { steps } = this.props;
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <Fragment>
          <Container>
            <Row>
              <Col xs={12}>
                <h1>{description}</h1>
                <p>
                  Complete |{' '}
                  <Link to={`/parent/chores/steps/add/${id}`}>Add a Step</Link>
                </p>
              </Col>
            </Row>
            <Row className=' pb-5 justify-content-center'>
              <Col xs={12}>
                This chore has the following steps:
                <ListGroup variant='flush'>
                  {steps
                    .filter(step => step.choreId === id)
                    .map(step => (
                      <ListGroup.Item
                        className={styles.list__group__item}
                        key={step.id}
                      >
                        {step.stepDescription}
                        <span
                          className='chore__controls'
                          style={{ float: 'right' }}
                        >
                          {' '}
                          <Link to={`/parent/chores/steps/edit/${step.id}`}>
                            <i className='fas fa-edit'></i>
                          </Link>{' '}
                          <span onClick={() => this.delete(step.id)}>
                            <i className='fas fa-times'></i>
                          </span>
                        </span>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
  }
}

View.propTypes = {
  fetchChore: PropTypes.func.isRequired,
  deleteChore: PropTypes.func.isRequired,
  fetchSteps: PropTypes.func.isRequired,
  chore: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      day: PropTypes.string
    })
  ),
  steps: PropTypes.shape({
    description: PropTypes.string,
    choreId: PropTypes.string
  }),
  auth: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

View.defaultProps = {
  chore: [],
  steps: []
};
export default container(View);
