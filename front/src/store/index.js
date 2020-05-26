import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'src/reducers';

import logMiddleware from 'src/middlewares/logMiddleware';
import homePageMiddleware from 'src/middlewares/homePageMiddleware';
import connectMiddleware from 'src/middlewares/connectMiddleware';
import suscribeMiddleware from 'src/middlewares/suscribeMiddleware';
import appointmentsMiddleware from 'src/middlewares/appointmentsMiddleware';
import profileMiddleware from 'src/middlewares/profileMiddleware';
import adminMiddleware from 'src/middlewares/adminMiddleware';
import searchPageMiddleware from 'src/middlewares/searchPageMiddleware';
import renewMiddleware from 'src/middlewares/renewMiddleware';
import renewPasswordMiddleware from 'src/middlewares/renewPasswordMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    logMiddleware,
    homePageMiddleware,
    connectMiddleware,
    suscribeMiddleware,
    appointmentsMiddleware,
    profileMiddleware,
    adminMiddleware,
    searchPageMiddleware,
    renewMiddleware,
    renewPasswordMiddleware,
  ),
);

const store = createStore(rootReducer, enhancers);

export default store;
