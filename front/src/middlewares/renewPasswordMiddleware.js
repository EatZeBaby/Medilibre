import Axios from 'axios';

import {
  addFlashMessage,
} from 'src/actions/app';
import { SUBMIT_RENEW_PASSWORD_FORM, setRenewPasswordFields } from 'src/actions/renewPassword';
import SERVEUR_URL from 'src/config';


const renewPasswordMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_RENEW_PASSWORD_FORM: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/user/renew`,
        data: {
          renewToken: store.getState().renewPassword.renewToken,
          password: store.getState().renewPassword.password,
        },
      })
        .then(() => {
          store.dispatch(setRenewPasswordFields('success', true));
          store.dispatch(addFlashMessage('Votre mot de passe vient d\'être réinitialisé', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default renewPasswordMiddleware;
