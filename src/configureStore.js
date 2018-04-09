import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middleware = [thunk]

middleware.push(logger)

// Note: this API requires redux@>=3.1.0
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store