import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './Services.css';

const propTypes = {
    services: PropTypes.array,
    statuses: PropTypes.object.isRequired,
};

const defaultProps = {
    services: [],
};

const Services = ({ services, statuses }) => {
    console.log('Services: ', services)
    console.log('statuses: ', statuses)
    return (
        <div className="Services">
            {
                services.map(service => (
                    <Card key={`Service-${service.name}`} loading title={`${service.name} Service`} style={{ width: '100%', margin: '10px 20px' }}>
                        Whatever content
                </Card>
                ))
            }
        </div>
    );
}

Services.displayName = 'Services';
Services.propTypes = propTypes;
Services.defaultProps = defaultProps;

export default Services;
