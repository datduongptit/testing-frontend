// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import message from './message';
import users from './users';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, message, users });

export default reducers;
