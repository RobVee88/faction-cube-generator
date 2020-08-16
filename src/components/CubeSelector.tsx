import { fetchApiData } from '@/util/api';
import { Button } from '@material-ui/core';
import React from 'react';
import { SetDropDown } from './SetDropDown';
import { SelectedSetList } from './SelectedSetList';
import { SetDescription } from '@/util/types';

export const CubeSelector = () => {
  const [setList, setSetList] = React.useState<SetDescription[] | undefined>(
    undefined,
  );
  const [selectedSet, setSelectedSet] = React.useState<
    SetDescription | undefined
  >(undefined);
  const [selectedSets, setSelectedSets] = React.useState<SetDescription[]>([]);

  if (!setList) {
    fetchApiData().then((data: SetDescription[]) => {
      setSetList(data);
    });
  }

  return (
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
        <Button disabled={!selectedSets.length}>Generate Cube</Button>
      </div>

      <SelectedSetList
        selectedSets={selectedSets}
        setSelectedSets={setSelectedSets}
        setSetList={setSetList}
      />
    </div>
  );
};
