import { Button, Grid, ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useCubeContext } from './CubeContext';

export const SelectedSetList = () => {
    const { selectedSets, setSelectedSets, setSetList } = useCubeContext();
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2} justify='center'>
                {selectedSets?.map((set) => {
                    return (
                        <Grid item key={`${set.code}${set.name}`}>
                            <ListItem>
                                <ListItemText
                                    primary={`(${set.code}) ${set.name}`}
                                />
                                <Button
                                    style={{ maxWidth: '20px' }}
                                    onClick={() => {
                                        setSelectedSets(
                                            selectedSets.filter(
                                                (s) => s.code !== set.code
                                            )
                                        );
                                        setSetList((previous) => [
                                            ...previous,
                                            set,
                                        ]);
                                    }}
                                >
                                    <DeleteIcon color='secondary' />
                                </Button>
                            </ListItem>
                        </Grid>
                    );
                })}
                {selectedSets.length % 2 > 0 ? (
                    <Grid key={'extra'} item></Grid>
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};
