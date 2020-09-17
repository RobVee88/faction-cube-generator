import { Typography } from '@material-ui/core';
import React from 'react';
import { CubeFilters } from '../CubeFilters';

export const SetFiltersStep = () => {
    return (
        <div>
            <Typography style={{ fontSize: '1.5rem', marginBottom: 10 }}>
                Set Filters
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CubeFilters />
            </div>
        </div>
    );
};
