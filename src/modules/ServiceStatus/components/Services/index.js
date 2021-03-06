import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './Services.css';
import LoadedStatusCard from './LoadedStatusCard'
import UnloadedStatusCard from './UnloadedStatusCard'

const propTypes = {
    services: PropTypes.array,
    statuses: PropTypes.object.isRequired,
};

const defaultProps = {
    services: [],
};

const Services = ({ services, statuses }) => (
    <div className="Services">
        {
            services.map(service => {
                const status = statuses[service.name];
                return (
                    status
                        ? (
                            <LoadedStatusCard
                                serviceName={service.name}
                                status={status} 
                                key={`Service-${service.name}`} 
                            />
                        ) 
                        : (
                            <UnloadedStatusCard
                                serviceName={service.name}
                                status={status}
                                key={`Service-${service.name}`} 
                            />
                        )
                )
            })
        }
    </div>
);
Services.displayName = 'Services';
Services.propTypes = propTypes;
Services.defaultProps = defaultProps;

export default Services;
