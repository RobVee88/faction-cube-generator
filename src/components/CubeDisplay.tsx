import { getColorDistribution, getCubeColors } from '@/util/helpers';
import { Card, CardType, COLOR_COMBO_NAMES } from '@/util/types';
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
        W: { dark: 'black', light: '#ffffeb' },
        U: { dark: 'black', light: '#d4edff' },
        B: { dark: 'black', light: '#d6cbd6' },
        R: { dark: 'black', light: '#ffc8c8' },
        G: { dark: 'black', light: '#e9ffd4' },
        C: { dark: 'black', light: '#e9e7eb' },
        M: { dark: 'black', light: '#fcf8a9' },
    };

    return colorIdentity.length === 1
        ? displayColors[colorIdentity]
        : colorIdentity === 'M'
        ? displayColors['M']
        : displayColors['C'];
};

const CubeSection = (props: ICubeSectionProps) => {
    let { color, cards } = props;

    const displayColors = getColors(color);

    const multiColors = getColorDistribution(cards).filter(
        (multiColor) => multiColor.color !== 'land'
    );
    return (
        <div
            key={`${color}${cards[0].uuid}`}
            style={{
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
            {multiColors
                ?.sort((a, b) =>
                    a.color.length > b.color.length
                        ? 1
                        : b.color.length > a.color.length
                        ? -1
                        : 0
                )
                ?.map((multiColor) => {
                    return (
                        <div key={`${multiColor?.color}`}>
                            {multiColors.length > 1 && (
                                <Typography
                                    style={{
                                        fontSize: '14px',
                                        backgroundColor: '#f4f4f4',
                                        borderTop: `1px solid ${displayColors.dark}`,
                                    }}
                                >{`${
                                    COLOR_COMBO_NAMES[multiColor?.color]
                                }`}</Typography>
                            )}
                            {Object.keys(CardType).map((cardType, i) => {
                                const filteredCards = cards.filter((card) => {
                                    return (
                                        (card.types.includes('Creature')
                                            ? cardType === 'Creature'
                                            : card.types[0] === cardType) &&
                                        card.colorIdentity.join('') ===
                                            multiColor?.color
                                    );
                                });
                                cards = [
                                    ...cards.filter(
                                        (card) => !filteredCards.includes(card)
                                    ),
                                ];
                                return (
                                    filteredCards?.length > 0 && (
                                        <div key={`${color}${cardType}${i}`}>
                                            <Typography
                                                style={{
                                                    fontSize: '12px',
                                                    borderBottom: `1px solid ${displayColors.dark}`,
                                                    borderTop: `1px solid ${displayColors.dark}`,
                                                    backgroundColor: '#f4f4f4',
                                                }}
                                            >
                                                {`${cardType}`}
                                            </Typography>
                                            <Grid item>
                                                {filteredCards.map(
                                                    (filteredCard, i) => {
                                                        return (
                                                            <div
                                                                key={`${filteredCard.uuid}${i}`}
                                                                style={{
                                                                    backgroundColor:
                                                                        displayColors.light,
                                                                }}
                                                            >
                                                                <CardDisplay
                                                                    key={`${filteredCard}${color}${i}${cardType}`}
                                                                    card={
                                                                        filteredCard
                                                                    }
                                                                    fontSize={
                                                                        10
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </Grid>
                                        </div>
                                    )
                                );
                            })}
                        </div>
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
                        <div
                            key={`${color.title}${i}${color.index}${color.colors[0]}`}
                        >
                            <CubeSection color={color.title} cards={cards} />
                        </div>
                    )
                );
            })}
        </Grid>
    );
};
