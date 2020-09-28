import { Card, Filter, FilterTypes } from './types';

export const convertCubeToCockatriceFormatting = (cube: Card[]) => {
    let cockatriceFormattedString = '';
    cube.forEach((card) => {
        cockatriceFormattedString =
            cockatriceFormattedString + card.name + '\n';
    });
    return cockatriceFormattedString;
};

export const getRandomCards = (cards: Card[], amount: number) => {
    let len = cards.length;
    if (amount > len) amount = len;
    const result: Card[] = new Array(amount);
    const taken = new Array(len);
    while (amount--) {
        const x = Math.floor(Math.random() * len);
        result[amount] = cards[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

const colorOrder = ['W', 'U', 'B', 'R', 'G', 'C', 'M'];

export const getCubeColors = (cube: Card[]) => {
    let toRet: { title: string; colors: string[]; index: number }[] = [];

    cube.reduce(
        (cards, card) =>
            cards.find(
                (x) => x.colorIdentity.join('') === card.colorIdentity.join('')
            )
                ? [...cards]
                : [...cards, card],
        []
    )
        .map((card) => card.colorIdentity.join(''))
        .forEach((color) => {
            if (color.length === 1) {
                toRet.push({
                    title: color,
                    colors: [color],
                    index: colorOrder.findIndex((x) => x === color),
                });
            } else if (color.length === 0) {
                toRet.push({
                    title: 'C',
                    colors: [color],
                    index: colorOrder.findIndex((x) => x === 'C'),
                });
            } else {
                if (toRet.find((x) => x.title === 'M')) {
                    toRet[toRet.findIndex((x) => x.title === 'M')].colors.push(
                        color
                    );
                } else {
                    toRet.push({
                        title: 'M',
                        colors: [color],
                        index: colorOrder.findIndex((x) => x === 'M'),
                    });
                }
            }
        });

    return toRet.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
    );
};

export const getColorDistribution = (cards: Card[]) => {
    let colorIdentityStats = {};
    cards.forEach((card) => {
        if (!card.supertypes.find((type) => type === 'Basic')) {
            if (card.type === 'Land') {
                if (colorIdentityStats.hasOwnProperty('land')) {
                    colorIdentityStats['land'] = colorIdentityStats['land'] + 1;
                } else {
                    colorIdentityStats['land'] = 1;
                }
            } else if (
                colorIdentityStats.hasOwnProperty(card.colorIdentity.join(''))
            ) {
                colorIdentityStats[`${card.colorIdentity.join('')}`] =
                    colorIdentityStats[`${card.colorIdentity.join('')}`] + 1;
            } else {
                colorIdentityStats[`${card.colorIdentity.join('')}`] = 1;
            }
        }
    });
    const toRet = [];
    for (const [key, value] of Object.entries(colorIdentityStats)) {
        toRet.push({ color: key, amount: value });
    }
    return toRet.sort((a, b) => a.amount - b.amount);
};

export const filterCard = (card: Card, cubeFilters: Filter[]) => {
    let toRet = true;
    cubeFilters?.forEach((filter) => {
        if (filter.filterType === FilterTypes.cardTypeFilter) {
            if (card.types.find((type) => type === filter.id)) {
                toRet = false;
            }
        }
        if (filter.filterType === FilterTypes.cmcFilter) {
            if (filter.id === 8) {
                if (card.convertedManaCost > 7) {
                    toRet = false;
                }
            } else if (card.convertedManaCost === filter.id) {
                toRet = false;
            }
        }
        if (filter.filterType === FilterTypes.colorFilter) {
            if (filter.id === 'C') {
                if (card.colorIdentity.length === 0) {
                    toRet = false;
                }
            } else if (filter.id === 'M') {
                if (card.colorIdentity.length > 1) {
                    toRet = false;
                }
            } else if (card.colorIdentity.includes(filter.id.toString())) {
                toRet = false;
            }
        }
    });
    return toRet;
};
