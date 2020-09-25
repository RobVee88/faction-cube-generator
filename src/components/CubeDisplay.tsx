import { getCubeColors } from '@/util/helpers';
import { Card, CardType } from '@/util/types';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { CardDisplay } from './CardDisplay';
import { useCubeContext } from './CubeContext';

interface ICubeSectionProps {
    cards: Card[];
    color: string;
}

const getColors = (colorIdentity: string) => {
    const displayColors = {
        W: { dark: '#92927e', light: '#ffffeb' },
        U: { dark: '#3591ec', light: '#d4edff' },
        B: { dark: '#191819', light: '#d6cbd6' },
        R: { dark: '#d83a3a', light: '#ffc8c8' },
        G: { dark: '#4f712e', light: '#e9ffd4' },
        Colorless: { dark: '#76717b', light: '#e9e7eb' },
        Multicolor: { dark: '#e4da13', light: '#fcf8a9' },
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

    return (
        <div
            style={{
                backgroundColor: displayColors.light,
                border: `1px solid ${displayColors.dark}`,
                margin: '0px 5px',
                maxWidth: 120,
                marginTop: 20,
            }}
        >
            <Typography
                style={{
                    fontSize: '16px',
                    backgroundColor: '#f4f4f4',
                }}
            >{`${color} (${cards.length})`}</Typography>
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
                                    fontSize: '14px',
                                    borderBottom: `1px solid ${displayColors.dark}`,
                                    borderTop: `1px solid ${displayColors.dark}`,
                                    backgroundColor: '#f4f4f4',
                                }}
                            >
                                {`${cardType}`}
                            </Typography>
                            <Grid item>
                                {filteredCards.map((filteredCard, i) => {
                                    return (
                                        <CardDisplay
                                            key={`${filteredCard}${color}${i}${cardType}`}
                                            card={filteredCard}
                                            fontSize={10}
                                        />
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
        <Grid container justify='center'>
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
