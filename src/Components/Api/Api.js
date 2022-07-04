const privatbankApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11'

export const GetEndpoint = async () => {
  const response = await fetch(privatbankApi);

  return response.json();
};