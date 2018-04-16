import { createSelector } from 'reselect';
import { Environments, Services } from '../../config.js';
import switchcase from '../../utils/switchcase';
import axios from 'axios';

// Enum
export const OverallStatusesEnums = {
    operational: '✓ All Services are Operational',
    degraded: '✗ Some Services Might be Degraded',
}

// Helpers
export const serviceIsOperational = (code) => code === 200

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
    statuses: {},
    overallStatus: null,
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

const getOverallStatus = createSelector(
    getStatuses,
    statuses => {
        let overallStatus = null;
        Object.keys(statuses).forEach((key) => {
            const status = statuses[key];
            if (overallStatus !== OverallStatusesEnums.degraded && serviceIsOperational(status.code)) {
                overallStatus = OverallStatusesEnums.operational;
            } else {
                overallStatus = OverallStatusesEnums.degraded;
            }
        });
        return overallStatus;
    }
);


export const selector = {
    getEnvironment,
    getEnvironments,
    getServices,
    getStatuses,
    getOverallStatus,
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

        dispatch(clearStatuses())

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
