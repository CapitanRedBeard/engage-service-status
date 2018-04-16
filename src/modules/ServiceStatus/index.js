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
     * Example struct: {
     *
     *   Auth: {
     *       code: 200,
     *       description: "OK",
     *       build: {
     *         artifact: "engage-user-service",
     *         version: "0.3.0-SNAPSHOT",
     *         buildNumber: "0dd42d5bc9-20180407_202946"
     *       }
     *   }}
     */
    statuses: {
        Test: {
            code: 301,
            description: "Bad stuff",
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
export const CLEAR_STATUSES = 'engage-service-status/ServiceStatus/CLEAR_STATUSES';

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

const clearStatuses = () => ({
    type: CLEAR_STATUSES,
})

// Thunks
export const selectEnvironment = environmentName => dispatch => {
    const environmentIndex = Environments.findIndex(env => (
        env.name === environmentName
    ));
    dispatch(changeEnvironment(Environments[environmentIndex]));
    dispatch(fetchAllStatuses());
}

export const fetchAllStatuses = () =>
    async (dispatch, getState) => {

        // dispatch(clearStatuses())

        const state = getState();
        const environment = getEnvironment(state);
        const services = getServices(state);
        services.forEach(async (service) => {
            try{
                const status = await fetchServiceStatus({ 
                    environmentRoute: environment.route,
                    serviceRoute: service.route}) 
                dispatch(updateStatus({ status: status.data, serviceName: service.name }))
            } catch (e) {
                console.warn(`Couldnt fetch service status ${service.name}`,e);
            }
        })        
    }

// Helpers 
const fetchServiceStatus = ({environmentRoute, serviceRoute}) => {
    return axios.get(`${environmentRoute}/${serviceRoute}/status`)
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
            },
        }),
        [CLEAR_STATUSES]: () => ({
            ...state,
            statuses: {},
        })
    })(state)(action.type);
