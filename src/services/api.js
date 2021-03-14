import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/'
})




api.interceptors.request.use( config => {
  config.url = `${config.url},br&units=metric&lang=pt_br&appid=6b942f47c22e18ac6f20ab9dc8e95916`;
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;