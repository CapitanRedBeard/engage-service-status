import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'antd';
import menu from './partials/Menu';
import './EnvironmentSelector.css';

const propTypes = {
    environment: PropTypes.object.isRequired,
    environments: PropTypes.array,
    selectEnvironment: PropTypes.func.isRequired
};

const defaultProps = {
    environments: [],
};

const EnvironmentSelector = ({ environment, environments, selectEnvironment }) => (
    <div className="EnvironmentSelector">
        <Dropdown overlay={menu(environments, selectEnvironment)}>
            <a className="ant-dropdown-link EnvironmentSelector--dropdown--label" >
                {environment.name} environment <Icon type="down" className="EnvironmentSelector--dropdown--icon" />
            </a>
        </Dropdown>
    </div>
);

EnvironmentSelector.displayName = 'EnvironmentSelector';
EnvironmentSelector.propTypes = propTypes;
EnvironmentSelector.defaultProps = defaultProps;

export default EnvironmentSelector;
