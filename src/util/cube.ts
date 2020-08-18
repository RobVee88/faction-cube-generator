import { SetDescription, RarityDistribution, Card } from './types';
import { getColorDistribution, getRandomCards } from './helpers';
import { unwatchFile } from 'fs';

export const generateCube = (
  selectedSets: SetDescription[],
  cubeSize: number,
  rarityDistribution: RarityDistribution,
) => {
  let cube: Card[] = [];

  let remainderBySet = cubeSize % selectedSets.length;

  const cardsPerSet = Math.floor(cubeSize / selectedSets.length);

  const rarities: string[][] = [['rare', 'mythic'], ['uncommon'], ['common']];

  selectedSets.forEach((set) => {
    const uniqueSet: Card[] = set.cards.reduce(
      (cards, card) =>
        cards.find((x) => x.name === card.name) ? [...cards] : [...cards, card],
      [],
    );
    const colorDistribution = getColorDistribution(uniqueSet);

    rarities.forEach((rarity) => {
      let totalToBePicked = Math.floor(
        (rarityDistribution[rarity[0]] / 15) * cardsPerSet,
      );
      if (remainderBySet > 0) {
        totalToBePicked++;
        remainderBySet--;
      }
      let pickedSofar = 0;
      const remainingColorIdentities: string[] = [];
      Object.keys(colorDistribution).forEach((colorIdentity) => {
        const numberOfCardsByColor = Math.floor(
          (colorDistribution[colorIdentity] / uniqueSet.length) * cardsPerSet,
        );
        const numberOfRarityByColor = Math.floor(
          (numberOfCardsByColor / 15) * rarityDistribution[rarity[0]],
        );
        if (
          numberOfRarityByColor < 1 &&
          (numberOfCardsByColor / 15) * rarityDistribution[rarity[0]] > 0
        ) {
          remainingColorIdentities.push(colorIdentity);
        } else {
          const randomCards = getRandomCards(
            uniqueSet.filter((card) => {
              if (colorIdentity === 'land') {
                return (
                  card.type === 'Land' &&
                  !card.supertypes.find((type) => type === 'Basic') &&
                  rarity.find((rarity) => card.rarity === rarity)
                );
              } else if (
                !card.supertypes.find((type) => type === 'Basic') &&
                card.type !== 'Land'
              ) {
                return (
                  card.colorIdentity.join('') === colorIdentity &&
                  rarity.find((rarity) => card.rarity === rarity)
                );
              }
            }),
            numberOfRarityByColor,
          );
          pickedSofar += randomCards.length;
          cube = [...cube, ...randomCards];
        }
      });
      let remainder = totalToBePicked - pickedSofar;
      if (remainder > 0) {
        const extraAdded = getRandomCards(
          uniqueSet.filter((card) => {
            return (
              remainingColorIdentities.find(
                (colorIdentity) =>
                  card.colorIdentity.join('') === colorIdentity,
              ) && rarity.find((rarity) => card.rarity === rarity)
            );
          }),
          remainder,
        );
        cube = [...cube, ...extraAdded];
      }
    });
  });
  return cube;
};
