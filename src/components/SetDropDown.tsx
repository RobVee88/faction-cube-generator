import React from 'react';

interface SetDescription {
  setAbv: string;
  setFullName: string;
}

export const SetDropDown = () => {
  const [setList, setSetList] = React.useState<SetDescription[] | undefined>(
    undefined,
  );

  const requestUrl = 'https://mtgjson.com/api/v5/AllPrintings.json';
  const request = new XMLHttpRequest();
  request.open('GET', requestUrl);
  request.responseType = 'json';
  request.send();
  request.onload = () => {
    const data = request.response;
    console.log(data);
  };

  return <div>drop</div>;
};
