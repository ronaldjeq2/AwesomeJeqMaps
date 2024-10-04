import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://iotesting.free.beeceptor.com',
  timeout: 30000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",

  }
});
console.log({apiClient})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      console.error('Error de red detectado: Verifica tu conexión o la disponibilidad del servidor.');
    }
    return Promise.reject(error);
  }
);

export { apiClient };
