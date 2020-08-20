import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface IcubeSizeDropDownProps {
    cubeSize: number;
    setCubeSize: (size: number) => void;
}

export const CubeSizeDropDown = (props: IcubeSizeDropDownProps) => {
    const { cubeSize, setCubeSize } = props;
    return (
        <Autocomplete
            id='cube-size-combo'
            value={cubeSize}
            onChange={(event, newValue: number) => {
                setCubeSize(newValue);
            }}
            options={[360, 450, 540, 630, 720, 810, 900, 990, 1080]}
            getOptionLabel={(cubeSize: number) => cubeSize.toString()}
            style={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label='Cube Size' variant='outlined' />
            )}
        />
    );
};
