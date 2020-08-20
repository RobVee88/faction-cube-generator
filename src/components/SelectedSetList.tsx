import React from 'react';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import { SetDescription } from '@/util/types';
import DeleteIcon from '@material-ui/icons/Delete';

export interface ISelectedSetListProps {
    selectedSets: SetDescription[];
    setSelectedSets: (sets: SetDescription[]) => void;
    setSetList: (sets: any) => void;
}

export const SelectedSetList = (props: ISelectedSetListProps) => {
    const { selectedSets, setSelectedSets, setSetList } = props;
    return (
        <List style={{ maxWidth: '500px' }}>
            {selectedSets?.map((set) => {
                return (
                    <ListItem key={`${set.code}${set.name}`}>
                        <ListItemText primary={`(${set.code}) ${set.name}`} />
                        <Button
                            style={{ maxWidth: '30px' }}
                            onClick={() => {
                                setSelectedSets(
                                    selectedSets.filter(
                                        (s) => s.code !== set.code
                                    )
                                );
                                setSetList((previous) => [...previous, set]);
                            }}
                        >
                            <DeleteIcon color='secondary' />
                        </Button>
                    </ListItem>
                );
            })}
        </List>
    );
};
