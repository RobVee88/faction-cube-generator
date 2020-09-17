import React from 'react';
import { Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { Filter } from '@/util/types';
import { useCubeContext } from './CubeContext';
export const CubeFilters = () => {
    const { cubeFilters, setCubeFilters } = useCubeContext();

    return (
        <Grid>
            {Object.keys(Filter).map((filter) => {
                return (
                    <FormControlLabel
                        key={filter}
                        control={
                            <Checkbox
                                checked={
                                    cubeFilters.filter(
                                        (cubeFilter) => cubeFilter === filter
                                    ).length > 0
                                }
                                onChange={(e) => {
                                    e.persist();
                                    setCubeFilters((prev) =>
                                        !e.target.checked
                                            ? [
                                                  ...prev.filter(
                                                      (cubeFilter) =>
                                                          cubeFilter !== filter
                                                  ),
                                              ]
                                            : [...prev, filter]
                                    );
                                }}
                                name={`filter_${filter}`}
                            />
                        }
                        label={Filter[filter]}
                    />
                );
            })}
        </Grid>
    );
};
