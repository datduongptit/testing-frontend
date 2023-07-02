import axios from 'axios';
// import { store } from 'store/index';

const API_URL = 'http://localhost:4000/project/';
const authUser = JSON.parse(localStorage.getItem('auth-user'));
const userId = authUser?.sub;

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

const createProject = (data) => {
  return axios.post(API_URL + `create`, data);
};

const deleteProjectById = (id) => {
  return axios.post(API_URL + `delete`, { projectId: id });
};

const updateProject = ({ data }) => {
  console.log({ ...data });
  return axios.post(API_URL + 'update', { ...data });
};

const updateProjectAssigned = (data) => {
  return axios.post(API_URL + 'update', { ...data });
};

const ProjectService = {
  getAllProject,
  getProjectByUserId,
  getProjectById,
  createProject,
  deleteProjectById,
  updateProject,
  updateProjectAssigned
};

export default ProjectService;
