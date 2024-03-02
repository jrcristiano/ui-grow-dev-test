import { API_TOKEN_KEY } from '@/constants/user.api';
import { getItem } from '@/utils/local.storage.util';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Authorization': getItem(API_TOKEN_KEY)
  },
});

export default api;
