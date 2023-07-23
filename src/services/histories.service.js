import axios from 'axios';
// import { store } from 'store/index';

const API_URL = 'http://localhost:4000/histories/';
const authUser = JSON.parse(localStorage.getItem('auth-user'));

axios.defaults.headers.common['Authorization'] = `Bearer ${authUser?.token}`;

const getHistories = (query) => {
  try {
    return axios.get(API_URL + 'search', { params: query });
  } catch (error) {
    console.log(error);
  }
};

const HistoriesService = {
  getHistories
};

export default HistoriesService;
