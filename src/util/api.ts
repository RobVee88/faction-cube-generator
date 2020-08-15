export const fetchApiData = async () => {
  const toRet = await new Promise((resolve) => {
    const requestUrl = 'https://mtgjson.com/api/v5/AllPrintings.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
      const data = request.response;

      resolve(
        Object.keys(data?.data)?.map((set) => {
          return {
            code: data.data[set].code,
            name: data.data[set].name,
          };
        }),
      );
    };
  });
  return toRet;
};
