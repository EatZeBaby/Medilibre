import axios from 'axios';
import SERVEUR_URL from 'src/config';
import {
  GET_PARAMETERS,
  CHECK_SESSION,
  LOGOUT_USER,
  saveParameters,
  setLoading,
  loginUser,
  setIsLogged,
  toggleShowMenu,
  getSchedule,
  addFlashMessage,
  set404,
} from 'src/actions/app';

import {
  setToken,
  setUserId,
  setUserDatas,
} from 'src/actions/user';

// eslint-disable-next-line no-unused-vars
const logMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      sessionStorage.clear();
      store.dispatch(setIsLogged(false));
      store.dispatch(addFlashMessage('Vous êtes déconnecté', 'default'));
      store.dispatch(setToken(''));
      store.dispatch(setUserId(''));
      store.dispatch(setUserDatas({}));
      store.dispatch(toggleShowMenu());
      break;
    }
    case CHECK_SESSION: {
      const { token, userId } = sessionStorage;
      axios({
        method: 'post',
        url: `${SERVEUR_URL}/auth/checkislogged`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId,
        },
      }).then(() => {
        // eslint-disable-next-line no-underscore-dangle
        store.dispatch(setToken(token));
        store.dispatch(setUserId(userId));
        store.dispatch(loginUser(userId));
      }).catch(() => {});
      break;
    }
    case GET_PARAMETERS: {
      axios({
        method: 'get',
        url: `${SERVEUR_URL}/doctor/slug/${action.slug}`,
      })
        .then((response) => {
          if (!response.data) {
            store.dispatch(set404(true));
          }
          else {
            store.dispatch(saveParameters(response.data));
            store.dispatch(getSchedule());
            store.dispatch(setLoading(false));
          }
        })
        .catch(() => {
        });
      break;
    }
    default:
      next(action);
  }
};

export default logMiddleware;
