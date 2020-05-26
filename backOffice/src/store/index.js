import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'src/reducers';

import adminMiddleware from 'src/middlewares/adminMiddleware';
import patientsMiddleware from 'src/middlewares/patientsMiddleware';
import cabinetMiddleware from 'src/middlewares/cabinetMiddleware';
import parametersMiddleware from 'src/middlewares/parametersMiddleware';
import forgotMiddleware from 'src/middlewares/forgotMiddleware';
import renewMiddleware from 'src/middlewares/renewMiddleware';
import addDoctorMiddleware from 'src/middlewares/addDoctorMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    adminMiddleware,
    patientsMiddleware,
    cabinetMiddleware,
    parametersMiddleware,
    forgotMiddleware,
    renewMiddleware,
    addDoctorMiddleware,
  ),
);

const store = createStore(rootReducer, enhancers);

export default store;
