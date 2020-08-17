export const fetchApiData = async (
  onResolve: (data: any) => any,
  jsonFile: string,
) => {
  const toRet = await new Promise((resolve) => {
    const requestUrl = `https://mtgjson.com/api/v5/${jsonFile}.json`;
    const request = new XMLHttpRequest();
    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
      const data = request.response;
      resolve(onResolve(data));
    };
  });
  return toRet;
};
