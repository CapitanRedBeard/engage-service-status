import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './styles';

const propTypes = {
    services: PropTypes.array,
    statuses: PropTypes.object.isRequired,
};

const defaultProps = {
    services: [],
};


const UnloadedStatusCard = ({ serviceName, statuses }) => (
    <Card
        loading
        key={`Service-${serviceName}`}
        title={`${serviceName} Service`}
        style={styles.unloaded}
    >
        Unloaded
    </Card>
)

UnloadedStatusCard.displayName = 'UnloadedStatusCard';
UnloadedStatusCard.propTypes = propTypes;
UnloadedStatusCard.defaultProps = defaultProps;

export default UnloadedStatusCard;

