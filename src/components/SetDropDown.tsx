import React from 'react';

export const SetDropDown = () => {
  fetch('https://mtgjson.com/api/v5/set', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log('error fetching data');
    });

  return <div>drop</div>;
};
