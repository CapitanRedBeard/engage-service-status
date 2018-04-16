import React from 'react';
import { Menu } from 'antd';

const MenuComponent = (environments, selectEnvironment) => (
    <Menu onClick={({key}) => {selectEnvironment(key)}}>
        {environments.map(environment => (
            <Menu.Item
                key={environment.name}
                className="EnvironmentSelector--dropdown--item--wrapper"
            >
                <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="EnvironmentSelector--dropdown--item"
                >
                    {environment.name}
                </a>
            </Menu.Item>
        ))}
    </Menu>
);

export default MenuComponent