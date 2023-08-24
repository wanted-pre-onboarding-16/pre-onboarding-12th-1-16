import axios from 'axios';

export const token = localStorage.getItem('access_token');

export const api = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
