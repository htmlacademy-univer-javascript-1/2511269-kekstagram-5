const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const routes = {
  GET: '/data',
  POST: '/',
};

const httpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const errorMessages = {
  GET: 'Не удалось получить данные',
  POST: 'Не удалось отправить данные',
};

const request = async (route, errorMessage, method, body = null) => {
  try {
    const res = await fetch(BASE_URL + route, {method, body});
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  } catch {
    throw new Error(errorMessage);
  }
};

const submitData = async(body) => await request(routes.POST, errorMessages.POST, httpMethod.POST, body);
const fetchData = async() => await request(routes.GET, errorMessages.GET, httpMethod.GET);

export{submitData, fetchData};
