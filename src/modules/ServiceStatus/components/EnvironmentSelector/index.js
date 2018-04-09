import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'antd';
import menu from './partials/Menu';

const propTypes = {
    environment: PropTypes.object.isRequired,
    environments: PropTypes.array,
    selectEnvironment: PropTypes.func.isRequired
};

const defaultProps = {
    environments: [],
};

const EnvironmentSelector = ({ environment, environments, selectEnvironment }) => (
    <Dropdown overlay={menu(environments, selectEnvironment)}>
        <a className="ant-dropdown-link" >
            {environment.name} <Icon type="down" />
        </a>
    </Dropdown>
);

EnvironmentSelector.displayName = 'EnvironmentSelector';
EnvironmentSelector.propTypes = propTypes;
EnvironmentSelector.defaultProps = defaultProps;

export default EnvironmentSelector;
