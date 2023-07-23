// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import message from './message';
import users from './users';
import projects from './projects';
import histories from './histories';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, users, projects, message, histories });

export default reducers;
