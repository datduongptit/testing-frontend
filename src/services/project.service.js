import axios from 'axios';
// import { store } from 'store/index';

const API_URL = 'http://localhost:4000/project/';
const authUser = JSON.parse(localStorage.getItem('auth-user'));
const userId = authUser.sub;

axios.defaults.headers.common['Authorization'] = `Bearer ${authUser?.token}`;

const getAllProject = () => {
  return axios.get(API_URL + 'all');
};

const getProjectByUserId = (id) => {
  return axios.get(API_URL + `user/${id || userId}`);
};

const getProjectById = (id) => {
  return axios.get(API_URL + `${id}`);
};

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin');
};

const ProjectService = {
  getAllProject,
  getProjectByUserId,
  getProjectById,
  getAdminBoard
};

export default ProjectService;
