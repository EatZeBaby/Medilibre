import Axios from 'axios';

import {
  addFlashMessage,
} from 'src/actions/app';
import { SUBMIT_RENEW_FORM } from 'src/actions/renew';
import SERVEUR_URL, { CURRENT_SERVEUR_URL } from 'src/config';


const renewMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_RENEW_FORM: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/user/forgot`,
        data: {
          email: store.getState().renew.email.trim().toLowerCase(),
          url: CURRENT_SERVEUR_URL,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre demande à bien été prise en compte', 'success'));
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

export default renewMiddleware;
