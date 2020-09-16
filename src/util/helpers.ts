import { Card, Filter } from './types';

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
    const toRet = [];
    for (const [key, value] of Object.entries(colorIdentityStats)) {
        toRet.push({ color: key, amount: value });
    }
    return toRet.sort((a, b) => a.amount - b.amount);
};

export const filterCard = (card: Card, cubeFilters: Filter[]) => {
    if (cubeFilters.find((filter) => Filter[filter] === Filter.noLand)) {
        if (card.types.find((type) => type === 'Land')) {
            return false;
        }
    }
    if (cubeFilters.find((filter) => Filter[filter] === Filter.noArtifacts)) {
        if (card.types.find((type) => type === 'Artifact')) {
            return false;
        }
    }
    if (cubeFilters.find((filter) => Filter[filter] === Filter.noCreatures)) {
        if (card.types.find((type) => type === 'Creature')) {
            return false;
        }
    }
    if (
        cubeFilters.find((filter) => Filter[filter] === Filter.noEnchantments)
    ) {
        if (card.types.find((type) => type === 'Enchantment')) {
            return false;
        }
    }
    if (cubeFilters.find((filter) => Filter[filter] === Filter.noInstants)) {
        if (card.types.find((type) => type === 'Instant')) {
            return false;
        }
    }
    if (cubeFilters.find((filter) => Filter[filter] === Filter.noSorceries)) {
        if (card.types.find((type) => type === 'Sorcery')) {
            return false;
        }
    }
    if (
        cubeFilters.find((filter) => Filter[filter] === Filter.noPlanesWalkers)
    ) {
        if (card.types.find((type) => type === 'Planeswalker')) {
            return false;
        }
    }

    return true;
};
