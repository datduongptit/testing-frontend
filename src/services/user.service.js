import axios from 'axios';
// import { store } from 'store/index';

const API_URL = 'http://localhost:4000/user/';
const authUser = JSON.parse(localStorage.getItem('auth-user'));

axios.defaults.headers.common['Authorization'] = `Bearer ${authUser?.token}`;

const getAllUsers = () => {
  return axios.get(API_URL + 'listUsers');
};

const getUserInfo = (id) => {
  try {
    return axios.get(API_URL + `user-info/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const createAccount = ({ username, email, password, role }) => {
  return axios.post(API_URL + 'signup', { username, email, password, role });
};

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin');
};

const UserService = {
  getAllUsers,
  getUserInfo,
  createAccount,
  getAdminBoard
};

export default UserService;
