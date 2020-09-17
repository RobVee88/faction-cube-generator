import { filterCard, getRandomCards } from './helpers';
import { Card, Filter, RarityDistribution, SetDescription } from './types';

export const generateCube = (
    selectedSets: SetDescription[],
    cubeSize: number,
    cubeFilters: Filter[],
    cardsToInclude: Card[],
    cardsToBan: Card[],
    rarityDistribution: RarityDistribution
) => {
    const finalCubeSize = cubeSize - cardsToInclude.length;
    let cube: Card[] = [...cardsToInclude];

    let remainderBySet = finalCubeSize % selectedSets.length;

    const cardsPerSet = Math.floor(finalCubeSize / selectedSets.length);

    const rarities: string[][] = [['rare', 'mythic'], ['uncommon'], ['common']];

    selectedSets.forEach((set) => {
        const uniqueSet: Card[] = set.cards.reduce(
            (cards, card) =>
                cards.find((x) => x.name === card.name)
                    ? [...cards]
                    : [...cards, card],
            []
        );

        let finalCardsForThisSet = cardsPerSet;
        if (remainderBySet > 0) {
            finalCardsForThisSet++;
            remainderBySet--;
        }

        rarities.forEach((rarity) => {
            const numberOfRarityToBePicked = Math.floor(
                (rarityDistribution[rarity[0]] / 15) * finalCardsForThisSet
            );
            let cardsStillNeeded = numberOfRarityToBePicked;
            while (cardsStillNeeded > 0) {
                const randomCards = getRandomCards(
                    uniqueSet.filter((card) => {
                        return (
                            rarity.find((rarity) => card.rarity === rarity) &&
                            !card.supertypes.find((type) => type === 'Basic') &&
                            !cardsToBan.find(
                                (cardToBan) => cardToBan.uuid === card.uuid
                            ) &&
                            !cardsToInclude.find(
                                (cardToInclude) =>
                                    cardToInclude.uuid === card.uuid
                            ) &&
                            filterCard(card, cubeFilters)
                        );
                    }),
                    cardsStillNeeded
                );
                cube = [...cube, ...randomCards];
                cardsStillNeeded = cardsStillNeeded - randomCards.length;
                if (randomCards.length === 0) break;
            }
        });
    });
    return cube;
};

// export const generateCubeWithColorDistribution = (
//     selectedSets: SetDescription[],
//     cubeSize: number,
//     rarityDistribution: RarityDistribution
// ) => {
//     let cube: Card[] = [];

//     let remainderBySet = cubeSize % selectedSets.length;

//     const cardsPerSet = Math.floor(cubeSize / selectedSets.length);

//     const rarities: string[][] = [['rare', 'mythic'], ['uncommon'], ['common']];

//     selectedSets.forEach((set) => {
//         const uniqueSet: Card[] = set.cards.reduce(
//             (cards, card) =>
//                 cards.find((x) => x.name === card.name)
//                     ? [...cards]
//                     : [...cards, card],
//             []
//         );
//         const colorDistribution: {
//             color: string;
//             amount: number;
//         }[] = getColorDistribution(uniqueSet);

//         let finalCardsForThisSet = cardsPerSet;
//         if (remainderBySet > 0) {
//             finalCardsForThisSet++;
//             remainderBySet--;
//         }
//         const totalRaresToBePicked = Math.floor(
//             (rarityDistribution[Rarity.rare] / 15) * finalCardsForThisSet
//         );
//         const totalUncommonsToBePicked = Math.floor(
//             (rarityDistribution[Rarity.uncommon] / 15) * finalCardsForThisSet
//         );
//         let totalCommonsToBePicked = Math.floor(
//             (rarityDistribution[Rarity.common] / 15) * finalCardsForThisSet
//         );

//         let remainderByRarity =
//             finalCardsForThisSet -
//             (totalRaresToBePicked +
//                 totalUncommonsToBePicked +
//                 totalCommonsToBePicked);
//         totalCommonsToBePicked = totalCommonsToBePicked + remainderByRarity;

//         let pickedSofar = 0;
//         rarities.forEach((rarity) => {
//             colorDistribution.forEach((colorIdentity) => {
//                 const numberOfCardsByColor =
//                     (colorIdentity.amount / uniqueSet.length) * cardsPerSet;
//                 let numberOfRarityByColor =
//                     (numberOfCardsByColor / 15) * rarityDistribution[rarity[0]];
//                 if (
//                     numberOfRarityByColor < 1 &&
//                     (numberOfCardsByColor / 15) *
//                         rarityDistribution[rarity[0]] >
//                         0
//                 ) {
//                     numberOfRarityByColor = 1;
//                 } else {
//                     numberOfRarityByColor = Math.floor(numberOfRarityByColor);
//                     const randomCards = getRandomCards(
//                         uniqueSet.filter((card) => {
//                             if (colorIdentity.color === 'land') {
//                                 return (
//                                     card.type === 'Land' &&
//                                     !card.supertypes.find(
//                                         (type) => type === 'Basic'
//                                     ) &&
//                                     rarity.find(
//                                         (rarity) => card.rarity === rarity
//                                     )
//                                 );
//                             } else if (
//                                 !card.supertypes.find(
//                                     (type) => type === 'Basic'
//                                 ) &&
//                                 card.type !== 'Land'
//                             ) {
//                                 return (
//                                     card.colorIdentity.join('') ===
//                                         colorIdentity.color &&
//                                     rarity.find(
//                                         (rarity) => card.rarity === rarity
//                                     )
//                                 );
//                             }
//                         }),
//                         numberOfRarityByColor
//                     );
//                     pickedSofar += randomCards.length;
//                     cube = [...cube, ...randomCards];
//                 }
//             });
//         });
//         const primaryColors = ['W', 'U', 'B', 'R', 'G'];
//         let remainder = finalCardsForThisSet - pickedSofar;
//         if (remainder > 0) {
//             let colorIndex = 0;
//             for (let i = remainder; i > 0; i--) {
//                 if (colorIndex > 4) colorIndex = 0;
//                 cube = [
//                     ...cube,
//                     ...getRandomCards(
//                         uniqueSet.filter((card) => {
//                             return (
//                                 card.rarity === Rarity.common &&
//                                 card.colorIdentity.join('') ===
//                                     primaryColors[colorIndex] &&
//                                 !cube.includes(card) &&
//                                 !card.supertypes.find(
//                                     (type) => type === 'Basic'
//                                 )
//                             );
//                         }),
//                         1
//                     ),
//                 ];
//                 colorIndex++;
//             }
//         } else if (remainder < 0) {
//             let colorIndex = 0;
//             for (let i = remainder; i < 0; i++) {
//                 if (colorIndex > 4) colorIndex = 0;
//                 cube = [
//                     ...cube,
//                     ...getRandomCards(
//                         uniqueSet.filter(
//                             (card) =>
//                                 card.rarity === Rarity.common &&
//                                 card.colorIdentity.join('') ===
//                                     primaryColors[colorIndex] &&
//                                 !cube.includes(card) &&
//                                 !card.supertypes.find(
//                                     (type) => type === 'Basic'
//                                 )
//                         ),
//                         1
//                     ),
//                 ];
//                 colorIndex++;
//             }
//         }
//     });
//     return cube;
// };
