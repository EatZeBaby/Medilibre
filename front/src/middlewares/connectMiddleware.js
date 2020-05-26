import {
  SUBMIT_CONNECT_PAGE_FORM,
  setOpenConnect,
} from 'src/actions/connect';
import {
  setToken,
  setUserId,
} from 'src/actions/user';
import {
  loginUser,
  addFlashMessage,
} from 'src/actions/app';
import Axios from 'axios';
import SERVEUR_URL from 'src/config';


const connectMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_CONNECT_PAGE_FORM: {
      const datas = {
        email: store.getState().connect.emailValue.trim().toLowerCase(),
        password: store.getState().connect.passwordValue.trim(),
      };
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/auth/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: datas,
      })
        .then((response) => {
          store.dispatch(setOpenConnect(false));
          store.dispatch(setToken(response.data.token));
          store.dispatch(setUserId(response.data.userId));
          store.dispatch(loginUser(response.data.userId));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Erreur d\'identifiant ou de mot de passe', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default connectMiddleware;
