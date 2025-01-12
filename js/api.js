const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Routes = {
  GET: '/data',
  POST: '/',
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessages = {
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

const submitData = async (body) => await request(Routes.POST, ErrorMessages.POST, HttpMethods.POST, body);
const fetchData = async () => await request(Routes.GET, ErrorMessages.GET, HttpMethods.GET);

export{submitData, fetchData};
