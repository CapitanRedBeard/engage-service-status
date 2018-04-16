import React from 'react';
import PropTypes from 'prop-types';
import EnvironmentSelector from '../../ServiceStatus/containers/EnvironmentSelector';
import Services from '../../ServiceStatus/containers/Services';
import OverallStatus from '../../ServiceStatus/containers/OverallStatus';

const propTypes = {
    fetchAllStatuses: PropTypes.func.isRequired,
};

class StatusPage extends React.Component {
    componentDidMount() {
        this.props.fetchAllStatuses();
    }

    render() {
        return ([
            <OverallStatus/>,
            <EnvironmentSelector />,
            <Services />,
        ])

    }   
};

StatusPage.displayName = 'StatusPage';
StatusPage.propTypes = propTypes;

export default StatusPage;
