import { SetDescription, RarityDistribution, Card, Rarity } from './types';
import { getColorDistribution, getRandomCards } from './helpers';

export const generateCube = (
  selectedSets: SetDescription[],
  cubeSize: number,
  rarityDistribution: RarityDistribution,
) => {
  let cube: Card[] = [];

  let remainder = cubeSize % selectedSets.length;
  const cardsPerSet = Math.floor(cubeSize / selectedSets.length);

  selectedSets.forEach((set) => {
    const colorDistribution = getColorDistribution(set);

    Object.keys(colorDistribution).forEach((colorIdentity) => {
      const numberOfCardsByColor =
        (colorDistribution[colorIdentity] / set.cards.length) * cardsPerSet;

      const rarities: string[][] = [
        ['rare', 'mythic'],
        ['uncommon'],
        ['common'],
      ];

      rarities.forEach((rarity) => {
        const numberOfRarityByColor = Math.ceil(
          (numberOfCardsByColor / 15) * rarityDistribution[rarity[0]],
        );
        cube = [
          ...cube,
          ...getRandomCards(
            set.cards.filter((card) => {
              if (colorIdentity === 'land') {
                return (
                  card.type === 'Land' &&
                  !card.supertypes.find((type) => type === 'Basic') &&
                  rarity.find((rarity) => card.rarity === rarity)
                );
              } else if (!card.supertypes.find((type) => type === 'Basic')) {
                return (
                  card.colorIdentity.join('') === colorIdentity &&
                  rarity.find((rarity) => card.rarity === rarity)
                );
              }
            }),
            numberOfRarityByColor,
          ),
        ];
      });
    });
  });

  return cube;
};
