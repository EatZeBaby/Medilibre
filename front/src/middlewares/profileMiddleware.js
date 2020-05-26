import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import {
  loginUser,
  addFlashMessage,
} from 'src/actions/app';

import { SAVE_PROFILE_CHANGE, SAVE_NEW_PASSWORD } from 'src/actions/profile';
// eslint-disable-next-line no-unused-vars
const profileMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().user;
  switch (action.type) {
    case SAVE_NEW_PASSWORD: {
      const { profile } = store.getState();
      const newUser = {
        password: profile.password,
      };
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/user/changePassword`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: newUser,
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre mot de passe à bien été modifié', 'success'));
          store.dispatch(loginUser(store.getState().user.userId));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case SAVE_PROFILE_CHANGE: {
      const { profile } = store.getState();
      const newUser = {
        firstname: profile.firstnameValue,
        lastname: profile.lastnameValue,
        phone: profile.phoneValue,
        email: profile.emailValue,
      };
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/user/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: newUser,
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre profil à bien été modifié', 'success'));
          store.dispatch(loginUser(store.getState().user.userId));
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

export default profileMiddleware;
