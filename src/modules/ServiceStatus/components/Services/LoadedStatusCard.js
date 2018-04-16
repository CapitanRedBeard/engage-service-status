import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { serviceIsOperational } from '../../index';
import './Services.css';

const propTypes = {
    serviceName: PropTypes.string.isRequired,
    status: PropTypes.object.isRequired,
};

const defaultProps = {
    services: [],
};

const StatusResponseDescriptionShape = [
    {
        label: 'Artifact',
        field: 'artifact',
    },
    {
        label: 'Version',
        field: 'version',
    },
    {
        label: 'Build Number',
        field: 'buildNumber',
    }
]

const LoadedStatusCard = ({ serviceName, status }) => (
    <Card key={`Service-${serviceName}`} className={`Card ${serviceIsOperational(status.code) ? 'Card--success' : 'Card--failure'}`} >
        <div>
            <div className='Card--header'>
                <p className='Card--title'>{serviceName} Service</p>
                <div className='Card--statusWrapper'>
                    <p className={`Card--status'}`}>
                        {`${serviceIsOperational(status.code) ? '✓' : '✗'} ${status.code} ${status.description}`}
                    </p>
                </div>
            </div>
            <div className='Card--descriptionWrapper'>
                {
                    StatusResponseDescriptionShape.map(desc => (
                        <div className='Card--descriptionFieldWrapper' key={desc.label}>
                            <p className='Card--descriptionFieldWrapper--label'>{desc.label}: </p>
                            <p className='Card--descriptionFieldWrapper--value'>{status.build[desc.field]}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </Card>
)

LoadedStatusCard.displayName = 'LoadedStatusCard';
LoadedStatusCard.propTypes = propTypes;
LoadedStatusCard.defaultProps = defaultProps;

export default LoadedStatusCard;

