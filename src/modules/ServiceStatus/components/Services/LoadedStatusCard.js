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


const LoadedStatusCard = ({ serviceName, statuses }) => (
    <Card key={`Service-${serviceName}`} title={`${serviceName} Service`} style={styles.loaded}>
        Loaded
    </Card>
)

LoadedStatusCard.displayName = 'LoadedStatusCard';
LoadedStatusCard.propTypes = propTypes;
LoadedStatusCard.defaultProps = defaultProps;

export default LoadedStatusCard;

