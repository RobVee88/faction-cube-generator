import { SetDescription, RarityDistribution, Card, Rarity } from './types';

const getRandomCards = (cards: Card[], amount: number) => {
  const result: Card[] = new Array(amount);
  let len = cards.length;
  const taken = new Array(len);
  if (amount > len)
    throw new RangeError('getRandomCards: more cards taken than available');
  while (amount--) {
    const x = Math.floor(Math.random() * len);
    result[amount] = cards[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

// possible add 'unique' parameter?
export const generateCube = (
  selectedSets: SetDescription[],
  cubeSize: number,
  rarityDistribution: RarityDistribution,
) => {
  let cube: Card[] = [];

  let remainder = cubeSize % selectedSets.length;
  const cardsPerSet = cubeSize / selectedSets.length;
  const numberOfRares = Math.floor(
    (cardsPerSet / 15) * rarityDistribution.rares,
  );
  const numberOfUnCommons = Math.floor(
    (cardsPerSet / 15) * rarityDistribution.uncommons,
  );
  const numberOfCommons = Math.floor(
    (cardsPerSet / 15) * rarityDistribution.commons,
  );

  selectedSets.forEach((set) => {
    cube = [
      ...cube,
      ...getRandomCards(
        set.cards.filter(
          (card) =>
            card.rarity === Rarity.rare || card.rarity === Rarity.mythic,
        ),
        numberOfRares,
      ),
    ];
    cube = [
      ...cube,
      ...getRandomCards(
        set.cards.filter((card) => card.rarity === Rarity.uncommon),
        numberOfUnCommons,
      ),
    ];
    let finalNumberOfCommons = numberOfCommons;
    if (remainder > 0) {
      finalNumberOfCommons++;
      remainder--;
    }
    cube = [
      ...cube,
      ...getRandomCards(
        set.cards.filter((card) => card.rarity === Rarity.common),
        finalNumberOfCommons,
      ),
    ];
  });

  return cube;
};
