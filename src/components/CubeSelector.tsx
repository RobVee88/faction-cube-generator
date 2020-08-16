import { fetchApiData } from '@/util/api';
import { Button, TextareaAutosize } from '@material-ui/core';
import React from 'react';
import { SetDropDown } from './SetDropDown';
import { SelectedSetList } from './SelectedSetList';
import { SetDescription, RarityDistribution, Card } from '@/util/types';
import { generateCube } from '@/util/cube';

const convertCubeToCockatriceFormatting = (cube: Card[]) => {
  let cockatriceFormattedString = '';
  cube.forEach((card) => {
    cockatriceFormattedString = cockatriceFormattedString + card.name + '\n';
  });
  return cockatriceFormattedString;
};

export const CubeSelector = () => {
  const [setList, setSetList] = React.useState<SetDescription[] | undefined>(
    undefined,
  );
  const [selectedSet, setSelectedSet] = React.useState<
    SetDescription | undefined
  >(undefined);
  const [selectedSets, setSelectedSets] = React.useState<SetDescription[]>([]);
  const [rarityDistribution, setRarityDistribution] = React.useState<
    RarityDistribution
  >({ rares: 1, uncommons: 4, commons: 10 });
  const [cubeSize, setCubeSize] = React.useState<number>(360);

  const [cube, setCube] = React.useState<Card[]>([]);

  if (!setList) {
    fetchApiData().then((data: SetDescription[]) => {
      setSetList(data);
    });
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <div style={{ display: 'flex' }}>
            <SetDropDown
              setList={setList}
              setSelectedSet={setSelectedSet}
              selectedSet={selectedSet}
            />
            <Button
              onClick={() => {
                if (selectedSet) {
                  setSelectedSets((previous) => [...previous, selectedSet]);
                  setSetList(
                    setList.filter((set) => set.code !== selectedSet.code),
                  );
                  setSelectedSet(undefined);
                }
              }}
            >
              Add Set
            </Button>
          </div>
          <Button
            disabled={!selectedSets.length}
            onClick={() =>
              setCube(generateCube(selectedSets, cubeSize, rarityDistribution))
            }
          >
            Generate Cube
          </Button>
        </div>

        <SelectedSetList
          selectedSets={selectedSets}
          setSelectedSets={setSelectedSets}
          setSetList={setSetList}
        />
      </div>
      {cube.length ? (
        <TextareaAutosize
          rowsMin={15}
          style={{ width: '100%', resize: 'none' }}
          placeholder="Generate a cube to display cards here"
          value={convertCubeToCockatriceFormatting(cube)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
