import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import { SUBMIT_RENEW_FORM, setRenewFields } from 'src/actions/renew';
import { addFlashMessage } from 'src/actions/app';


// eslint-disable-next-line no-unused-vars
const parametersMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_RENEW_FORM: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/renew`,
        data: {
          renewToken: store.getState().renew.renewToken,
          password: store.getState().renew.password,
        },
      })
        .then(() => {
          store.dispatch(setRenewFields('success', true));
          store.dispatch(addFlashMessage('Votre mot de passe vient d\'être réinitialisé', 'success'));
        })
        .catch((error) => {
          console.log(error.response);
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default parametersMiddleware;
