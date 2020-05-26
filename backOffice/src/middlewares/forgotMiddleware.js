import Axios from 'axios';
import SERVEUR_URL, { CURRENT_SERVEUR_URL } from 'src/config';

import { SUBMIT_FORGOT_FORM } from 'src/actions/forgot';
import { addFlashMessage } from 'src/actions/app';


// eslint-disable-next-line no-unused-vars
const parametersMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_FORGOT_FORM: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/forgot`,
        data: {
          email: store.getState().forgot.email.trim().toLowerCase(),
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

export default parametersMiddleware;
