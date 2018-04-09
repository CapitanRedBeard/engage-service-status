import { combineReducers } from 'redux'
import serviceStatus from './modules/ServiceStatus';

const reducers = {
    serviceStatus: serviceStatus,
};

export default combineReducers(reducers);
