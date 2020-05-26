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
import patientsReducer from './patientsReducer';
import cabinetReducer from './cabinetReducer';
import parametersReducer from './parametersReducer';
import forgotReducer from './forgotReducer';
import renewReducer from './renewReducer';
import addDoctorReducer from './addDoctorReducer';

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
  patients: patientsReducer,
  cabinet: cabinetReducer,
  parameters: parametersReducer,
  forgot: forgotReducer,
  renew: renewReducer,
  addDoctor: addDoctorReducer,
});

export default rootReducer;
