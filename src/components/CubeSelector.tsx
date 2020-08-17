import { fetchApiData } from '@/util/api';
import { Button, TextareaAutosize, CircularProgress } from '@material-ui/core';
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
  const [fetching, setFetching] = React.useState<boolean>(false);

  if (!setList) {
    fetchApiData((data) => {
      return Object.keys(data?.data)
        ?.filter(
          (set) =>
            data.data[set].type === 'core' ||
            data.data[set].type === 'expansion' ||
            data.data[set].type === 'masters' ||
            data.data[set].type === 'funny',
        )
        ?.map((set) => {
          return {
            code: data.data[set].code,
            name: data.data[set].name,
          };
        });
    }, 'SetList').then((data: SetDescription[]) => {
      setSetList(data);
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  setFetching(true);
                  return fetchApiData((data) => {
                    return {
                      code: data.data.code,
                      name: data.data.name,
                      cards: data.data.cards,
                    };
                  }, `${selectedSet.code}`).then((setData: SetDescription) => {
                    setSelectedSets((previous) => [...previous, setData]);
                    setSetList(
                      setList.filter((set) => set.code !== setData.code),
                    );
                    setSelectedSet(undefined);
                    setFetching(false);
                  });
                }
              }}
              disabled={fetching}
            >
              {fetching ? <CircularProgress /> : 'Add Set'}
            </Button>
          </div>
          <Button
            disabled={!selectedSets.length || fetching}
            onClick={() =>
              setCube(generateCube(selectedSets, cubeSize, rarityDistribution))
            }
          >
            {fetching ? <CircularProgress /> : 'Generate Cube'}
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
