import React from 'react';
import PropTypes from 'prop-types';
import { OverallStatusesEnums } from '../../index';
import './OverallStatus.css';

const propTypes = {
    overallStatus: PropTypes.string,
};

const defaultProps = {
    overallStatus: '',
};

const overallStatusClass = overallStatus => {
    if(overallStatus === OverallStatusesEnums.operational) {
        return 'OverallStatus--operational';
    } else if (overallStatus === OverallStatusesEnums.degraded) {
        return 'OverallStatus--degraded';
    }
    return '';
}

const OverallStatus = ({ overallStatus }) => {
    return (
        <div className={`OverallStatus ${overallStatusClass(overallStatus)}`}>
            <p className="OverallStatus-label">{overallStatus}</p>
        </div>
    );
}

OverallStatus.displayName = 'OverallStatus';
OverallStatus.propTypes = propTypes;
OverallStatus.defaultProps = defaultProps;

export default OverallStatus;
