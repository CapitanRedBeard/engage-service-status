import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const propTypes = {
    serviceName: PropTypes.string,
};

const defaultProps = {
    serviceName: '',
};


const UnloadedStatusCard = ({ serviceName }) => (
    <Card
        loading
        key={`Service-${serviceName}`}
        title={`${serviceName} Service`}
        className='Card'
    >
    </Card>
)

UnloadedStatusCard.displayName = 'UnloadedStatusCard';
UnloadedStatusCard.propTypes = propTypes;
UnloadedStatusCard.defaultProps = defaultProps;

export default UnloadedStatusCard;

