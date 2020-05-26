import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import homePageReducer from './homePageReducer';
import userReducer from './userReducer';
import connectReducer from './connectReducer';
import suscribeReducer from './suscribeReducer';
import appointmentsReducer from './appointmentsReducer';
import profileReducer from './profileReducer';
import adminReducer from './adminReducer';
import doctorReducer from './doctorReducer';
import newUserReducer from './newUserReducer';
import searchPageReducer from './searchPageReducer';
import renewReducer from './renewReducer';
import renewPasswordReducer from './renewPasswordReducer';

const rootReducer = combineReducers({
  main: mainReducer,
  homePage: homePageReducer,
  user: userReducer,
  connect: connectReducer,
  suscribe: suscribeReducer,
  appointments: appointmentsReducer,
  profile: profileReducer,
  admin: adminReducer,
  doctor: doctorReducer,
  newUser: newUserReducer,
  searchPage: searchPageReducer,
  renew: renewReducer,
  renewPassword: renewPasswordReducer,
});

export default rootReducer;
