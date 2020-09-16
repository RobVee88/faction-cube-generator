import { fetchApiData } from '@/util/api';
import {
    Button,
    TextareaAutosize,
    CircularProgress,
    Typography,
    TextField,
} from '@material-ui/core';
import React from 'react';
import { SetDropDown } from './SetDropDown';
import { SelectedSetList } from './SelectedSetList';
import { SetDescription, RarityDistribution, Card, Filter } from '@/util/types';
import { generateCube } from '@/util/cube';
import { convertCubeToCockatriceFormatting } from '@/util/helpers';
import { CubeFilters } from './CubeFilters';

export const CubeSelector = () => {
    const [setList, setSetList] = React.useState<SetDescription[] | undefined>(
        undefined
    );
    const [selectedSet, setSelectedSet] = React.useState<
        SetDescription | undefined
    >(undefined);
    const [selectedSets, setSelectedSets] = React.useState<SetDescription[]>(
        []
    );
    const [rarityDistribution, setRarityDistribution] = React.useState<
        RarityDistribution
    >({ rare: 1, uncommon: 4, common: 10 });
    const [cubeSize, setCubeSize] = React.useState<number>(360);
    const [cube, setCube] = React.useState<Card[]>([]);
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [cubeFilters, setCubeFilters] = React.useState<Filter[]>([]);
    const [cardsToInclude, setCardsToInclude] = React.useState<Card[]>([]);
    const [cardsToBan, setCardsToBan] = React.useState<Card[]>([]);

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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <div style={{ marginTop: 10 }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography>
                                Selected Set card pool size:
                            </Typography>
                            <Typography style={{ opacity: 1, marginLeft: 5 }}>
                                {cardPoolSize}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography>
                                Generated Cube card pool size:
                            </Typography>
                            <Typography style={{ opacity: 1, marginLeft: 5 }}>
                                {cube.length}
                            </Typography>
                        </div>
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
                            setList={setList}
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
                                            setSelectedSets((previous) => [
                                                ...previous,
                                                setData,
                                            ]);
                                            setSetList(
                                                setList.filter(
                                                    (set) =>
                                                        set.code !==
                                                        setData.code
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
                    <div
                        style={{
                            display: 'grid',
                            marginTop: 10,
                            gridTemplateColumns: '3fr 1fr',
                            gridColumnGap: 10,
                        }}
                    >
                        <TextField
                            type='number'
                            label='Cube Size'
                            variant='outlined'
                            value={cubeSize > 0 ? cubeSize : undefined}
                            onChange={(e) =>
                                setCubeSize(Number(e.target.value))
                            }
                        />
                        <Button
                            color='primary'
                            variant='outlined'
                            disabled={
                                !selectedSets.length || fetching || !cubeSize
                            }
                            onClick={() =>
                                setCube(
                                    generateCube(
                                        selectedSets,
                                        cubeSize,
                                        rarityDistribution,
                                        cubeFilters,
                                        cardsToInclude,
                                        cardsToBan
                                    )
                                )
                            }
                        >
                            {fetching ? <CircularProgress /> : 'Generate Cube'}
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CubeFilters
                    cubeFilters={cubeFilters}
                    setCubeFilters={setCubeFilters}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SelectedSetList
                    selectedSets={selectedSets}
                    setSelectedSets={setSelectedSets}
                    setSetList={setSetList}
                />
            </div>
            {cube.length ? (
                <div style={{ marginTop: 10 }}>
                    <Button
                        color='primary'
                        variant='outlined'
                        disabled={!cube.length || fetching}
                        onClick={() => {
                            navigator.clipboard.writeText(
                                convertCubeToCockatriceFormatting(cube)
                            );
                        }}
                    >
                        Copy Cube to Clipboard
                    </Button>
                    <TextareaAutosize
                        rowsMin={15}
                        style={{ width: '100%', resize: 'none', marginTop: 10 }}
                        placeholder='Generate a cube to display cards here'
                        value={convertCubeToCockatriceFormatting(cube)}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
