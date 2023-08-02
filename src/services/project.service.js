import axios from 'axios';
// import { store } from 'store/index';

const API_URL = 'http://localhost:4000/project/';
const authUser = JSON.parse(localStorage.getItem('auth-user'));
const userId = authUser?.sub;

axios.defaults.headers.common['Authorization'] = `Bearer ${authUser?.token}`;

const getAllProject = () => {
  return axios.get(API_URL + 'all');
};

const getProjectByUserId = (id, query) => {
  return axios.get(API_URL + `user/${id || userId}`, { params: query });
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

const updateProjectDetail = (data) => {
  const dataProjectUpdate = { ...data };
  // const usersAssignedUpdate = [...dataProjectUpdate.usersAssigned];
  // dataProjectUpdate.usersAssigned = JSON.stringify(usersAssignedUpdate);
  return axios.post(API_URL + 'update', { ...dataProjectUpdate });
};

const addUsersAssign = ({ data }) => {
  const dataProjectUpdate = { ...data };
  const usersAssignedUpdate = [...dataProjectUpdate.usersAssigned];
  dataProjectUpdate.usersAssigned = JSON.stringify(usersAssignedUpdate);
  return axios.post(API_URL + 'update', { ...dataProjectUpdate });
};

const deleteProjectUserAssigned = ({ data, id }) => {
  const dataProjectUpdate = { ...data };
  let usersAssignedUpdate = [...dataProjectUpdate.usersAssigned];
  usersAssignedUpdate = usersAssignedUpdate.filter((user) => user.id !== id);
  usersAssignedUpdate = usersAssignedUpdate.map((user) => user.id);
  dataProjectUpdate.usersAssigned = JSON.stringify(usersAssignedUpdate);
  return axios.post(API_URL + 'update', { ...dataProjectUpdate });
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
  updateProjectDetail,
  addUsersAssign,
  deleteProjectUserAssigned,
  updateProjectAssigned
};

export default ProjectService;
