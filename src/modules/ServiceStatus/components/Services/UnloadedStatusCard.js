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
        className='Card Card--loading '>
        <div>
            <div className='Card--header'>
                <p className='Card--title'>{serviceName} Service</p>
            </div>
            <div>
                <p className={`Card--loading--block`} style={{ width: '94%' }} />
                <div>
                    <span className={`Card--loading--block`} style={{ width: '28%' }} />
                    <span className={`Card--loading--block`} style={{ width: '62%' }} />
                </div>
                <div >
                    <span className={`Card--loading--block`} style={{ width: '22%' }} />
                    <span className={`Card--loading--block`} style={{ width: '66%' }} />
                </div>
                <div >
                    <span className={`Card--loading--block`} style={{ width: '56%' }} />
                    <span className={`Card--loading--block`} style={{ width: '39%' }} />
                </div>
                <div>
                    <span className={`Card--loading--block`} style={{ width: '21%' }} />
                    <span className={`Card--loading--block`} style={{ width: '15%' }} />
                    <span className={`Card--loading--block`} style={{ width: '40%' }} />
                </div>
            </div>
        </div>
    </Card>
)

UnloadedStatusCard.displayName = 'UnloadedStatusCard';
UnloadedStatusCard.propTypes = propTypes;
UnloadedStatusCard.defaultProps = defaultProps;

export default UnloadedStatusCard;

