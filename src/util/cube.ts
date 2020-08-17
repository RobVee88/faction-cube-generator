import { SetDescription, RarityDistribution, Card, Rarity } from './types';

const getRandomCards = (cards: Card[], amount: number) => {
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

const getColorDistribution = (set: SetDescription) => {
  let colorIdentityStats = {};
  set.cards.forEach((card) => {
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

// add 'unique' parameter
// sort 'remaining' per color as well
export const generateCube = (
  selectedSets: SetDescription[],
  cubeSize: number,
  rarityDistribution: RarityDistribution,
) => {
  let cube: Card[] = [];

  let remainder = cubeSize % selectedSets.length;
  const cardsPerSet = cubeSize / selectedSets.length;

  selectedSets.forEach((set) => {
    const colorDistribution = getColorDistribution(set);

    Object.keys(colorDistribution).forEach((colorIdentity) => {
      const numberOfCardsByColor =
        (colorDistribution[colorIdentity] / set.cards.length) * cardsPerSet;
      const numberOfRaresByColor = Math.ceil(
        (numberOfCardsByColor / 15) * rarityDistribution.rares,
      );
      const numberOfUncommonsByColor = Math.ceil(
        (numberOfCardsByColor / 15) * rarityDistribution.uncommons,
      );
      const numberOfCommonsByColor = Math.ceil(
        (numberOfCardsByColor / 15) * rarityDistribution.commons,
      );
      cube = [
        ...cube,
        ...getRandomCards(
          set.cards.filter((card) => {
            if (colorIdentity === 'land') {
              return (
                card.type === 'Land' &&
                (card.rarity === Rarity.rare || card.rarity === Rarity.mythic)
              );
            } else {
              return (
                card.colorIdentity.join('') === colorIdentity &&
                (card.rarity === Rarity.rare || card.rarity === Rarity.mythic)
              );
            }
          }),
          numberOfRaresByColor,
        ),
      ];
      cube = [
        ...cube,
        ...getRandomCards(
          set.cards.filter((card) => {
            if (colorIdentity === 'land') {
              return card.type === 'Land' && card.rarity === Rarity.uncommon;
            } else {
              return (
                card.colorIdentity.join('') === colorIdentity &&
                card.rarity === Rarity.uncommon
              );
            }
          }),
          numberOfUncommonsByColor,
        ),
      ];
      let finalNumberOfCommonsByColor = numberOfCommonsByColor;
      if (remainder > 0) {
        finalNumberOfCommonsByColor++;
        remainder--;
      }
      cube = [
        ...cube,
        ...getRandomCards(
          set.cards.filter((card) => {
            if (colorIdentity === 'land') {
              return (
                card.type === 'Land' &&
                !card.supertypes.find((type) => type === 'Basic') &&
                card.rarity === Rarity.common
              );
            } else if (!card.supertypes.find((type) => type === 'Basic')) {
              return (
                card.colorIdentity.join('') === colorIdentity &&
                card.rarity === Rarity.common
              );
            }
          }),
          finalNumberOfCommonsByColor,
        ),
      ];
    });
  });

  return cube;
};
