import { Card } from './types';

export const convertCubeToCockatriceFormatting = (cube: Card[]) => {
  let cockatriceFormattedString = '';
  cube.forEach((card) => {
    cockatriceFormattedString = cockatriceFormattedString + card.name + '\n';
  });
  return cockatriceFormattedString;
};
