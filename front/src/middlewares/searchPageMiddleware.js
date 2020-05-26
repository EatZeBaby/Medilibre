import Axios from 'axios';

import SERVEUR_URL from 'src/config';

import { LOAD_DOCTORS_LIST, setSearchPageFields } from 'src/actions/searchPage';

// eslint-disable-next-line no-unused-vars
const profileMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_DOCTORS_LIST: {
      Axios({
        method: 'get',
        url: `${SERVEUR_URL}/doctor`,
      })
        .then((response) => {
          store.dispatch(setSearchPageFields('doctors', response.data));
        });
      break;
    }
    default:
      next(action);
  }
};

export default profileMiddleware;
