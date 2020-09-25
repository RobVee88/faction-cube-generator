import { getColorDistribution, getCubeColors } from '@/util/helpers';
import { Card, CardType } from '@/util/types';
import { Grid, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { useCubeContext } from './CubeContext';

interface ICubeSectionProps {
    cards: Card[];
    color: string;
}

const getColors = (colorIdentity: string) => {
    const displayColors = {
        W: { dark: 'white', light: 'white' },
        U: { dark: 'blue', light: 'blue' },
        B: { dark: 'black', light: 'black' },
        R: { dark: 'red', light: 'red' },
        G: { dark: 'green', light: 'green' },
        Colorless: { dark: 'brown', light: 'brown' },
        Multicolor: { dark: 'yellow', light: 'yellow' },
    };

    return colorIdentity.length === 1
        ? displayColors[colorIdentity]
        : colorIdentity === 'Multicolor'
        ? displayColors['Multicolor']
        : displayColors['Colorless'];
};

const CubeSection = (props: ICubeSectionProps) => {
    let { color, cards } = props;

    const displayColors = getColors(color);
    debugger;
    return (
        <div style={{ backgroundColor: displayColors.light }}>
            <Typography style={{ fontSize: '16px' }}>{`${color}`}</Typography>
            {Object.keys(CardType).map((cardType, i) => {
                const filteredCards = cards.filter((card) => {
                    return card.types.includes('Creature')
                        ? cardType === 'Creature'
                        : card.types[0] === cardType;
                });
                cards = [
                    ...cards.filter((card) => !filteredCards.includes(card)),
                ];
                return (
                    filteredCards?.length > 0 && (
                        <div key={`${color}${cardType}${i}`}>
                            <Typography
                                style={{
                                    fontSize: '16px',
                                }}
                            >
                                {`${cardType}`}
                            </Typography>
                            <Grid item>
                                {filteredCards.map((filteredCard, i) => {
                                    return (
                                        <Typography
                                            key={`${filteredCard}${color}${i}${cardType}`}
                                            style={{ fontSize: '10px' }}
                                        >
                                            {filteredCard.name}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export const CubeDisplay = () => {
    const { cube } = useCubeContext();

    if (!cube.length) return <></>;

    const colors: {
        title: string;
        colors: string[];
        index: number;
    }[] = getCubeColors(cube);

    return (
        <Grid container justify='center' xl={7}>
            {colors.map((color, i) => {
                const cards = cube.filter((card) => {
                    return color.colors.includes(card.colorIdentity.join(''));
                });
                return (
                    cards?.length > 0 && (
                        <div key={`${color}${i}`}>
                            <CubeSection color={color.title} cards={cards} />
                        </div>
                    )
                );
            })}
        </Grid>
    );
};
