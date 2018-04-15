import React from 'react';
import PropTypes from 'prop-types';
import EnvironmentSelector from '../../ServiceStatus/containers/EnvironmentSelector';
import Services from '../../ServiceStatus/containers/Services';
import './StatusPage.css';

const propTypes = {
    fetchAllStatuses: PropTypes.func.isRequired,
};

const defaultProps = {
    services: [],
};

class StatusPage extends React.Component {
    componentDidMount() {
        this.props.fetchAllStatuses();
    }

    render() {
        return ([
            <h3>Status</h3>,
            <EnvironmentSelector />,
            <Services />,
        ])

    }   
};

StatusPage.displayName = 'StatusPage';
StatusPage.propTypes = propTypes;
StatusPage.defaultProps = defaultProps;

export default StatusPage;
