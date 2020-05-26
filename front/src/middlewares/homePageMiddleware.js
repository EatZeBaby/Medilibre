import {
  GET_FUTUR_APPOINTMENTS,
  SELECT_APPOINTMENT,
  SUBMIT_NEW_USER_FORM,
  SUBMIT_CONNECT_FORM,
  saveFuturAppointments,
  getFuturAppointments,
  sethomePageLoading,
  setHomePageFields,
} from 'src/actions/homePage';
import {
  setOpenSuscribe,
} from 'src/actions/suscribe';
import {
  setToken,
  setUserId,
  setUserDatas,
} from 'src/actions/user';
import {
  LOGIN_USER,
  loginUser,
  setIsLogged,
  addFlashMessage,
} from 'src/actions/app';
import Axios from 'axios';
import SERVEUR_URL from 'src/config';


// eslint-disable-next-line no-unused-vars
const homePageMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().user;
  switch (action.type) {
    case SUBMIT_CONNECT_FORM: {
      const datas = {
        email: store.getState().homePage.connectEmailValue.trim().toLowerCase(),
        password: store.getState().homePage.connectPasswordValue,
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
          store.dispatch(setToken(response.data.token));
          store.dispatch(setUserId(response.data.userId));
          store.dispatch(loginUser(response.data.userId));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Erreur d\'identifiant ou de mot de passe', 'error'));
        });
      break;
    }
    case LOGIN_USER: {
      Axios({
        method: 'get',
        url: `${SERVEUR_URL}/user/${action.userId}`,
      })
        .then((response) => {
          store.dispatch(setUserDatas(response.data));
          sessionStorage.setItem('token', store.getState().user.token);
          sessionStorage.setItem('userId', store.getState().user.userId);
          if (!store.getState().main.isLogged) {
            store.dispatch(addFlashMessage('Vous êtes connecté', 'success'));
          }
          store.dispatch(setIsLogged(true));
          store.dispatch(setOpenSuscribe(false));
        });
      break;
    }
    case SUBMIT_NEW_USER_FORM: {
      const state = store.getState().homePage;
      const user = {
        firstname: state.newFirstname,
        lastname: state.newLastname,
        email: state.newEmail.trim().toLowerCase(),
        phone: state.newPhone,
        password: state.newPassword,
        status: 'PATIENT',
        isHoliday: false,
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
          const email = state.newEmail;
          const password = state.newPassword;
          store.dispatch(addFlashMessage('Felicitation votre compte vient d\'être crée', 'success'));
          store.dispatch(setHomePageFields('newEmail', ''));
          store.dispatch(setHomePageFields('newPassword', ''));
          store.dispatch(setHomePageFields('newConfirmPassword', ''));
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
        .catch((error) => {
          store.dispatch(addFlashMessage(`Une erreur c'est produite veuillez réessayer ulterieurement (${error.response.status})`, 'error'));
        });
      break;
    }
    case GET_FUTUR_APPOINTMENTS: {
      const now = Date.parse(new Date());
      Axios({
        method: 'get',
        // eslint-disable-next-line no-underscore-dangle
        url: `${SERVEUR_URL}/appointment/${store.getState().main.parameters._id}/futur/${now}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        store.dispatch(saveFuturAppointments(response.data));
        store.dispatch(sethomePageLoading(false));
      });
      break;
    }
    case SELECT_APPOINTMENT: {
      const duration = store.getState().main.parameters.appointmentDuration * 60000;
      const data = {
        startTime: Date.parse(store.getState().homePage.currentAppointment),
        endTime: Date.parse(store.getState().homePage.currentAppointment) + duration,
        userId: store.getState().user.userId,
        isHoliday: false,
        free: false,
        // eslint-disable-next-line no-underscore-dangle
        doctorId: store.getState().main.parameters._id,
      };
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/appointment`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      })
        .then(() => {
          store.dispatch(getFuturAppointments());
          store.dispatch(addFlashMessage('Votre rendez-vous est bien enregistré', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Désolé une erreur c\'est produite, Veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default homePageMiddleware;
