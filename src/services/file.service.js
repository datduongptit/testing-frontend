/* eslint-disable no-unused-vars */
import axios from 'axios';
// import { store } from 'store/index';

const API_URL = 'http://localhost:4000/file/';
const authUser = JSON.parse(localStorage.getItem('auth-user'));
const userId = authUser?.sub;

axios.defaults.headers.common['Authorization'] = `Bearer ${authUser?.token}`;

const getAllUsers = () => {
  return axios.get(API_URL + 'listUsers');
};

const uploadFile = (file, project, type) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', project.projectId);
    formData.append('userUpload', userId);
    formData.append('fileType', type);
    return axios.post(API_URL + `upload`, formData, { headers: { 'content-type': file.type, 'content-length': `${file.size}` } });
  } catch (error) {
    console.log(error);
  }
};

const updateFile = (file, fileId, project, type) => {
  try {
    const formData = new FormData();
    formData.append('id', fileId);
    formData.append('file', file);
    formData.append('projectId', project.projectId);
    formData.append('userUpload', userId);
    formData.append('fileType', type);
    return axios.post(API_URL + `update`, formData, { headers: { 'content-type': file.type, 'content-length': `${file.size}` } });
  } catch (error) {
    console.log(error);
  }
};

const deleteFileById = (id, url) => {
  console.log(url);
  try {
    return axios.delete(API_URL + `delete/${id}`, { data: { url } });
  } catch (error) {
    console.log(error);
  }
};

const FileService = {
  getAllUsers,
  uploadFile,
  updateFile,
  deleteFileById
};

export default FileService;
