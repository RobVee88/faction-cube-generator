import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress } from '@material-ui/core';

interface SetDescription {
  code: string;
  name: string;
}

export const SetDropDown = () => {
  const [setList, setSetList] = React.useState<SetDescription[] | undefined>(
    undefined,
  );

  if (!setList) {
    const requestUrl = 'https://mtgjson.com/api/v5/AllPrintings.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
      const data = request.response;
      setSetList(
        Object.keys(data?.data)?.map((set) => {
          return {
            code: data.data[set].code,
            name: data.data[set].name,
          };
        }),
      );
    };
  }
  return (
    <div>
      {setList ? (
        <Autocomplete
          id="set-list-combo"
          options={setList}
          getOptionLabel={(set: SetDescription) => set.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Set List" variant="outlined" />
          )}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
