import { createSelector } from 'reselect';
import { Environments, Services } from '../../config.js';
import switchcase from '../../utils/switchcase';
import axios from 'axios';

console.log('Services', Services)

// Initial State
const initialState = {
    /**
     * currently selected environment
     */
    environment: Environments[0],
    /**
     * all environments
     */
    environments: Environments,
    /**
     * all services
     */
    services: Services,
    /**
     * status data
     */
    statuses: {}
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

const getServices = createSelector(
    baseSelector,
    s => s.services
);

const getStatuses = createSelector(
    baseSelector,
    s => s.statuses
);


export const selector = {
    getEnvironment,
    getEnvironments,
    getServices,
    getStatuses
};

// Action Types
export const CHANGE_ENVIRONMENT = 'engage-service-status/ServiceStatus/CHANGE_ENVIRONMENT';
export const UPDATE_STATUS = 'engage-service-status/ServiceStatus/UPDATE_STATUS';

// Actions
const changeEnvironment = environment => ({
    type: CHANGE_ENVIRONMENT,
    environment,
});

const updateStatus = ({status, serviceName}) => ({
    type: UPDATE_STATUS,
    serviceName,
    status
});

// Thunks
export const selectEnvironment = environmentName => dispatch => {
    const environmentIndex = Environments.findIndex(env => (
        env.name === environmentName
    ));
    dispatch(changeEnvironment(Environments[environmentIndex]));
}

export const fetchAllStatuses = () =>
    async (dispatch, getState) => {
        const state = getState();
        const environment = getEnvironment(state);
        const services = getServices(state);

        services.forEach(async (service) => {
            try{
                const status = await fetchServiceStatus({ environment, services }) 
                dispatch(updateStatus({ status, serviceName: service.name }))
            } catch (e) {
                console.warn(`Couldnt fetch service status ${service.name}`,e);
            }
        })        
    }

// Helpers 
const fetchServiceStatus = ({environment, service}) => {
    return axios.get(`https://pivotus.${environment}.engage.pivotus.io/api/${service}/status`)
}

// Reducer
export default (state = initialState, action) =>
    switchcase({
        [CHANGE_ENVIRONMENT]: () => ({
            ...state,
            environment: action.environment,
        }),
        [UPDATE_STATUS]: () => ({
            ...state,
            statuses: {
                ...state.statuses,
                [action.serviceName]: action.status,
            }
        })
    })(state)(action.type);
