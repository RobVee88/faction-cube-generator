import { fetchApiData } from '@/util/api';
import { SetDescription } from '@/util/types';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useCubeContext } from '../CubeContext';
import { SelectedSetList } from '../SelectedSetList';
import { SetDropDown } from '../SetDropDown';

export const SelectSetsStep = () => {
    const {
        setSelectedSet,
        selectedSet,
        setFetching,
        fetching,
        setSetList,
        selectedSets,
        setList,
        setSelectedSets,
    } = useCubeContext();

    const cardPoolSize = selectedSets
        ?.map((set) => set.cards?.length || 0)
        .reduce((a, b) => a + b, 0);

    if (!setList) {
        fetchApiData((data) => {
            return Object.keys(data?.data)
                ?.filter(
                    (set) =>
                        data.data[set].type === 'core' ||
                        data.data[set].type === 'expansion' ||
                        data.data[set].type === 'masters' ||
                        data.data[set].type === 'funny'
                )
                ?.map((set) => {
                    return {
                        code: data.data[set].code,
                        name: data.data[set].name,
                    };
                });
        }, 'SetList').then((data: SetDescription[]) => {
            setSetList(data);
        });
    }

    return (
        <div>
            <Typography style={{ fontSize: '1.5rem', marginBottom: 10 }}>
                Select Sets
            </Typography>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography>Selected Set card pool size:</Typography>
                <Typography style={{ opacity: 1, marginLeft: 5 }}>
                    {cardPoolSize}
                </Typography>
            </div>
            <div
                style={{
                    display: 'grid',
                    marginTop: 10,
                    gridTemplateColumns: '3fr 1fr',
                    gridColumnGap: 10,
                }}
            >
                <SetDropDown
                    setSelectedSet={setSelectedSet}
                    selectedSet={selectedSet}
                />
                <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => {
                        if (selectedSet) {
                            setFetching(true);
                            return fetchApiData((data) => {
                                return {
                                    code: data.data.code,
                                    name: data.data.name,
                                    cards: data.data.cards,
                                };
                                //ugly solution :(
                            }, `${selectedSet.code === 'CON' ? selectedSet.code + '_' : selectedSet.code}`).then(
                                (setData: SetDescription) => {
                                    const cardsWithSetCode = [];
                                    setData.cards.forEach((card) =>
                                        cardsWithSetCode.push({
                                            ...card,
                                            set: setData.code,
                                        })
                                    );
                                    const setDataWithSetCodes = {
                                        ...setData,
                                        cards: cardsWithSetCode,
                                    };
                                    debugger;
                                    setSelectedSets((previous) => [
                                        ...previous,
                                        setDataWithSetCodes,
                                    ]);
                                    setSetList(
                                        setList.filter(
                                            (set) =>
                                                set.code !==
                                                setDataWithSetCodes.code
                                        )
                                    );
                                    setSelectedSet(undefined);
                                    setFetching(false);
                                }
                            );
                        }
                    }}
                    disabled={fetching}
                >
                    {fetching ? <CircularProgress /> : 'Add Set'}
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SelectedSetList />
            </div>
        </div>
    );
};
