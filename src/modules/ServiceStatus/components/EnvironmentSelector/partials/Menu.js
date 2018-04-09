import React from 'react';
import { Menu } from 'antd';

const MenuComponent = (environments, selectEnvironment) => (
    <Menu onClick={({key}) => {selectEnvironment(key)}}>
        {environments.map(environment => (
            <Menu.Item key={environment.name}>
                <a target="_blank" rel="noopener noreferrer" >{environment.name}</a>
            </Menu.Item>
        ))}
    </Menu>
);

export default MenuComponent