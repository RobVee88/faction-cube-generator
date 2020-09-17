import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress } from '@material-ui/core';
import { SetDescription } from '@/util/types';
import { useCubeContext } from './CubeContext';

export interface ISetDropDownProps {
    setSelectedSet: (set: SetDescription) => void;
    selectedSet: SetDescription;
}

export const SetDropDown = (props: ISetDropDownProps) => {
    const { setList } = useCubeContext();
    const { setSelectedSet, selectedSet } = props;
    return (
        <div>
            {setList ? (
                <Autocomplete
                    id='set-list-combo'
                    value={selectedSet || { name: '', code: '' }}
                    onChange={(event, newValue: SetDescription) => {
                        if (newValue?.name !== '') setSelectedSet(newValue);
                    }}
                    options={[{ name: '', code: '' }, ...setList]}
                    getOptionLabel={(set: SetDescription) => set.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Set List'
                            variant='outlined'
                        />
                    )}
                />
            ) : (
                <CircularProgress />
            )}
        </div>
    );
};
