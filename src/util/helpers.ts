import { Card, SetDescription } from './types';

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
    return colorIdentityStats;
};
