import {
  SUBMIT_SUSCRIBE_PAGE_FORM,
} from 'src/actions/suscribe';
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


const suscribeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SUSCRIBE_PAGE_FORM: {
      const state = store.getState().suscribe;
      const user = {
        firstname: state.firstnameValue,
        lastname: state.lastnameValue,
        email: state.emailValue.trim().toLowerCase(),
        phone: state.phoneValue,
        password: state.passwordValue,
        status: 'PATIENT',
        // eslint-disable-next-line no-underscore-dangle
        doctorId: store.getState().main.parameters._id,
      };
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/auth/signin`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: user,
      })
        .then(() => {
          const email = state.emailValue;
          const password = state.passwordValue;
          Axios({
            method: 'post',
            url: `${SERVEUR_URL}/auth/login`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              email,
              password,
            },
          })
            .then((response) => {
              store.dispatch(setToken(response.data.token));
              store.dispatch(setUserId(response.data.userId));
              store.dispatch(loginUser(response.data.userId));
            });
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite essayez plus tard', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default suscribeMiddleware;
