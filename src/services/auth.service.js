import axios from 'axios';

const API_URL = 'http://localhost:4000/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password
  });
};

const login = async (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password
    })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('auth-user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = async () => {
  localStorage.removeItem('auth-user');
  // return axios.post(API_URL + 'signout').then((response) => {
  //   return response.data;
  // });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('auth-user'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
