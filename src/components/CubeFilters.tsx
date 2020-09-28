import { Filter, Filters, FilterTypes } from '@/util/types';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useCubeContext } from './CubeContext';

interface IFilterCategoryProps {
    filters: Filter[];
}

const FilterCategory = (props: IFilterCategoryProps) => {
    const { filters } = props;
    const { cubeFilters, setCubeFilters } = useCubeContext();

    return (
        <div>
            {filters.map((filter) => (
                <FormControlLabel
                    key={filter.id}
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
                            name={`filter_${filter.id}`}
                        />
                    }
                    label={filter.desc}
                />
            ))}
        </div>
    );
};

export const CubeFilters = () => {
    return (
        <div>
            {Object.values(FilterTypes).map((filterType) => {
                return (
                    <Accordion key={filterType}>
                        <AccordionSummary>
                            <Typography>{filterType}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FilterCategory
                                filters={Filters.filter((filter) => {
                                    return filter.filterType === filterType;
                                })}
                            />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
};
