import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} from 'src/actions/patients';

import { addFlashMessage } from 'src/actions/app';

import {
  setAllUsers,
} from 'src/actions/admin';


// eslint-disable-next-line no-unused-vars
const patientsMiddleware = (store) => (next) => (action) => {
  const { doctorToken, doctorId } = sessionStorage;
  switch (action.type) {
    case DELETE_USER: {
      Axios({
        method: 'delete',
        url: `${SERVEUR_URL}/user/${action.userId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          Axios({
            method: 'get',
            url: `${SERVEUR_URL}/user`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${doctorToken}`,
            },
            data: {
              doctorId,
            },
          })
            .then((users) => {
              store.dispatch(setAllUsers([]));
              store.dispatch(setAllUsers(users.data));
              store.dispatch(addFlashMessage('Dossier patient mis à jour', 'success'));
            })
            .catch(() => {
              store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
            });
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
        });
      break;
    }
    case UPDATE_USER: {
      const updateUser = {
        firstname: action.lastUser.firstname,
        lastname: action.lastUser.lastname,
        phone: action.lastUser.phone,
        status: 'ADMIN_ENTRY',
        active: false,
      };
      Axios({
        method: 'put',
        // eslint-disable-next-line no-underscore-dangle
        url: `${SERVEUR_URL}/user/${action.lastUser._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: updateUser,
      })
        .then(() => {
          Axios({
            method: 'get',
            url: `${SERVEUR_URL}/user`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${doctorToken}`,
            },
            data: {
              doctorId,
            },
          })
            .then((users) => {
              store.dispatch(setAllUsers([]));
              store.dispatch(setAllUsers(users.data));
              store.dispatch(addFlashMessage('Dossier patient mis à jour', 'success'));
            })
            .catch(() => {
              store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
            });
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
        });
      break;
    }
    case ADD_USER: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/user`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          ...action.newUser,
          status: 'ADMIN_ENTRY',
          active: false,
          doctorId: store.getState().doctor.doctorId,
        },
      })
        .then(() => {
          Axios({
            method: 'get',
            url: `${SERVEUR_URL}/user`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${doctorToken}`,
            },
            data: {
              doctorId,
            },
          })
            .then((users) => {
              store.dispatch(setAllUsers(users.data));
              store.dispatch(addFlashMessage('Nouveau patient enregistré', 'success'));
            })
            .catch(() => {
              store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
            });
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default patientsMiddleware;
