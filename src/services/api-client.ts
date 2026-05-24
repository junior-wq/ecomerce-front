// import axios from 'axios'

// export default axios.create({
//   baseURL:'http://127.0.0.1:8000'
 
// })


// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });




import axios from 'axios';
import { getAuthToken } from './local-storage-servivces';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
    headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use((config) => {
//   const token = getAuthToken()
//   if (token) {
//     config.headers.Authorization = `JWT ${token}`;
//   }
//   return config;
// });

export default apiClient;
