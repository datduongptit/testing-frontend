// import { store } from 'store/index';

// const listUsers = store.getState().users?.listUsers;

const matchUser = (listUsers, id) => {
  const userMatched = listUsers?.find((user) => user.id === id);
  return userMatched?.username;
};

export default matchUser;
