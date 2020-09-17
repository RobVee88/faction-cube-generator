import { generateCube } from '@/util/cube';
import { convertCubeToCockatriceFormatting } from '@/util/helpers';
import {
    TextField,
    Button,
    CircularProgress,
    TextareaAutosize,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useCubeContext } from '../CubeContext';

export const GenerateCubeStep = () => {
    const {
        cubeSize,
        setCubeSize,
        fetching,
        selectedSets,
        rarityDistribution,
        setCube,
        cube,
        cubeFilters,
        cardsToInclude,
        cardsToBan,
    } = useCubeContext();

    return (
        <div>
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
                    onChange={(e) => setCubeSize(Number(e.target.value))}
                />
                <Button
                    color='primary'
                    variant='outlined'
                    disabled={!selectedSets.length || fetching || !cubeSize}
                    onClick={() =>
                        setCube(
                            generateCube(
                                selectedSets,
                                cubeSize,
                                cubeFilters,
                                cardsToInclude,
                                cardsToBan,
                                rarityDistribution
                            )
                        )
                    }
                >
                    {fetching ? <CircularProgress /> : 'Generate Cube'}
                </Button>
            </div>
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Generated Cube card pool size:</Typography>
                    <Typography style={{ opacity: 1, marginLeft: 5 }}>
                        {cube.length}
                    </Typography>
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
                            style={{
                                width: '100%',
                                resize: 'none',
                                marginTop: 10,
                            }}
                            placeholder='Generate a cube to display cards here'
                            value={convertCubeToCockatriceFormatting(cube)}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
