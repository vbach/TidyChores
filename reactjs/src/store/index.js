// get all the functions we need from redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
// middleware for making actions asynchronous
import thunkMiddleware from 'redux-thunk';
// will log to console all the actions that are run
import { createLogger } from 'redux-logger';
// middleware to help with api calls
import callAPI from './helpers/callAPIMiddleware';
// pull our reducers
import children from './children/reducer';
import chores from './chores/reducer';
import rewards from './rewards/reducer';
import users from './users/reducers';
// combine multiple reducers into one
const rootReducer = combineReducers({ children, chores, rewards, auth: users });

// set up middleware
const middleware = applyMiddleware(thunkMiddleware, callAPI, createLogger());
// create a redux store using the combined reducer and middleware functions
const store = createStore(rootReducer, middleware);

export default store;
