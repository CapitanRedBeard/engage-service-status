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
    statuses: {
        Auth: { 
            code: 200, 
            description: "OK",
            build: {
                artifact: "engage-user-service",
                version: "0.3.0-SNAPSHOT",
                buildNumber: "0dd42d5bc9-20180407_202946"
            }
        }
    }
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
                console.log('Fetching', `https://pivotus.${environment.route}.engage.pivotus.io/api/${service.route}/status`)
                const status = await fetchServiceStatus({ 
                    environmentRoute: environment.route,
                    serviceRoute: service.route}) 
                dispatch(updateStatus({ status, serviceName: service.name }))
            } catch (e) {
                console.warn(`Couldnt fetch service status ${service.name}`,e);
            }
        })        
    }

// Helpers 
const fetchServiceStatus = ({environmentRoute, serviceRoute}) => {
    return axios.get(`https://pivotus.${environmentRoute}.engage.pivotus.io/api/${serviceRoute}/status`)
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
