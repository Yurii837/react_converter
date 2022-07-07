const privatbankApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=';

export const GetEndpoint = async (type = 'cash') => {

  const getEnding = (type) => {
    switch (type) {
      case 'cash': return '5';
      case 'cashless': return '11';
      default: return '5';
    }
  }
  const ending = getEnding(type);

  const response = await fetch(`${privatbankApi}${ending}`);

  return response.json();
};