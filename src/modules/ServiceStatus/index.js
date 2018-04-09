import { createSelector } from 'reselect';
import Environments from '../../environments.js'
import switchcase from '../../utils/switchcase'

// Initial State
const initialState = {
    /**
     * Meta data from the 'list_all_customers' response
     */
    environment: Environments[0],
    environments: Environments
};

// Selectors
const baseSelector = state => state.serviceStatus

const getEnvironment = createSelector(
    baseSelector,
    s => s.environment
);

const getEnvironments = createSelector(
    baseSelector,
    s => s.environments
);


export const selector = {
    getEnvironment,
    getEnvironments
};

// Action Types
export const CHANGE_ENVIRONMENT = 'engage-service-status/ServiceStatus/CHANGE_ENVIRONMENT';

// Actions
const changeEnvironment = environment => ({
    type: CHANGE_ENVIRONMENT,
    environment,
});

// Thunks
export const selectEnvironment = environmentName => dispatch => {
    const environmentIndex = Environments.findIndex(env => (
        env.name === environmentName
    ));
    dispatch(changeEnvironment(Environments[environmentIndex]));
}

// Reducer
export default (state = initialState, action) =>
    switchcase({
        [CHANGE_ENVIRONMENT]: () => ({
            ...state,
            environment: action.environment,
        }),
    })(state)(action.type);
