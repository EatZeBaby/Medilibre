import axios from 'axios';
import SERVEUR_URL from 'src/config';

import {
  SUBMIT_NEW_USER_FORM_ADMIN,
  setOpenNewUserModal,
} from 'src/actions/newUser';
import {
  SUBMIT_ADMIN_CONNECT_FORM,
  GET_ALL_DOCTOR_APPOINTMENTS,
  SUBMIT_NEW_ADMIN_APPOINTMENT,
  setAllDoctorAppointments,
  setAllUsers,
  getAllDoctorAppointments,
  setAdminPageFields,
} from 'src/actions/admin';
import {
  setDoctorToken,
  setDoctorId,
  setDoctorDatas,
  CHECK_ISADMIN,
  LOGOUT_DOCTOR,
} from 'src/actions/doctor';
import {
  DELETE_SELECTED_APPOINTMENT,
  MODIFY_SELECTED_APPOINTMENT,
} from 'src/actions/modifyAppointment';
import { setIsAdmin, addFlashMessage } from 'src/actions/app';

// eslint-disable-next-line no-unused-vars
const adminMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case MODIFY_SELECTED_APPOINTMENT: {
      const appointment = {
        startTime: Date.parse(store.getState().admin.modifiedAppointmentStart),
        endTime: Date.parse(store.getState().admin.modifiedAppointmentEnd),
        free: false,
        userId: store.getState().admin.modifiedAppointmentUserId,
      };

      const { doctorToken, doctorId } = sessionStorage;
      axios({
        method: 'put',
        url: `${SERVEUR_URL}/appointment/admin/${store.getState().admin.modifiedAppointmentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          ...appointment,
          doctorId,
        },
      })
        .then(() => {
          store.dispatch(getAllDoctorAppointments());
          store.dispatch(setAdminPageFields('openModifyModal', false));
          store.dispatch(addFlashMessage('Le rendez-vous est Modifié', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
        });
      break;
    }
    case DELETE_SELECTED_APPOINTMENT: {
      const { doctorToken, doctorId } = sessionStorage;
      axios({
        method: 'delete',
        url: `${SERVEUR_URL}/appointment/admin/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          doctorId,
        },
      })
        .then(() => {
          store.dispatch(getAllDoctorAppointments());
          store.dispatch(setAdminPageFields('openModifyModal', false));
          store.dispatch(addFlashMessage('Le rendez-vous est Annulé', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
        });
      break;
    }
    case SUBMIT_NEW_USER_FORM_ADMIN: {
      const { doctorToken, doctorId } = sessionStorage;
      const user = {
        firstname: store.getState().newUser.firstnameValue,
        lastname: store.getState().newUser.lastnameValue,
        phone: store.getState().newUser.phoneValue,
        active: false,
        status: 'ADMIN_ENTRY',
      };
      axios({
        method: 'post',
        url: `${SERVEUR_URL}/user`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: user,
      })
        .then((newUser) => {
          store.dispatch(setAdminPageFields('newAppointmentUser', newUser.data.user));
          const newUserSlug = `${newUser.data.user.lastname.toUpperCase()} ${newUser.data.user.firstname.charAt(0).toUpperCase()}${newUser.data.user.firstname.slice(1)}`;
          store.dispatch(setAdminPageFields('newUserName', newUserSlug));
          axios({
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
              store.dispatch(setOpenNewUserModal(false));
              store.dispatch(addFlashMessage('Nouveau patient enregistré', 'success'));
            });
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez reesayer plus tard', 'error'));
        });
      break;
    }
    case SUBMIT_NEW_ADMIN_APPOINTMENT: {
      const { doctorToken, doctorId } = sessionStorage;
      const data = {
        startTime: Date.parse(store.getState().admin.newAppointmentStart),
        endTime: Date.parse(store.getState().admin.newAppointmentEnd),
        // eslint-disable-next-line no-underscore-dangle
        userId: store.getState().admin.newAppointmentUser._id,
        free: false,
        doctorId,
        isHoliday: store.getState().admin.newAppointmentIsHoliday,
      };
      axios({
        method: 'post',
        url: `${SERVEUR_URL}/appointment/admin`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data,
      })
        .then(() => {
          store.dispatch(getAllDoctorAppointments());
          store.dispatch(setAdminPageFields('openModal', false));
          store.dispatch(addFlashMessage('Le rendez-vous est enregistré', 'success'));
        });
      break;
    }
    case GET_ALL_DOCTOR_APPOINTMENTS: {
      const { doctorToken, doctorId } = sessionStorage;
      axios({
        method: 'get',
        url: `${SERVEUR_URL}/appointment`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          doctorId,
        },
      })
        .then((response) => {
          const allAppointments = response.data;
          axios({
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
              const appointments = allAppointments.map((appointment) => {
                // eslint-disable-next-line no-underscore-dangle
                let appointmentUser = users.data.find((user) => user._id === appointment.userId);
                let title;
                if (!appointmentUser) {
                  appointmentUser = {
                    firstname: 'Utilisateur',
                    lastname: 'inconnu',
                  };
                }
                if (appointment.isHoliday) {
                  title = 'Absence';
                }
                else {
                  title = `${appointmentUser.firstname} ${appointmentUser.lastname}`;
                }
                return {
                  title,
                  start: new Date(appointment.startTime),
                  end: new Date(appointment.endTime),
                  allDay: false,
                  user: appointmentUser,
                  userId: appointment.userId,
                  // eslint-disable-next-line no-underscore-dangle
                  id: appointment._id,
                  isHoliday: appointment.isHoliday,
                };
              });
              axios({
                method: 'get',
                url: `${SERVEUR_URL}/doctor/${doctorId}`,
              }).then((info) => {
                store.dispatch(setDoctorDatas(info.data));
              });
              store.dispatch(setAllDoctorAppointments(appointments));
            });
        })
        .catch(() => {
        });
      break;
    }
    case LOGOUT_DOCTOR:
      sessionStorage.clear();
      store.dispatch(setIsAdmin(false));
      store.dispatch(addFlashMessage('Vous êtes déconnecté', 'default'));
      store.dispatch(setDoctorToken(''));
      store.dispatch(setDoctorId(''));
      store.dispatch(setDoctorDatas({}));
      break;
    case CHECK_ISADMIN: {
      const { doctorToken, doctorId } = sessionStorage;
      axios({
        method: 'post',
        url: `${SERVEUR_URL}/auth/checkisadmin`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      }).then(() => {
        sessionStorage.setItem('doctorToken', doctorToken);
        sessionStorage.setItem('doctorId', doctorId);
        store.dispatch(setDoctorToken(doctorToken));
        store.dispatch(setDoctorId(doctorId));
        store.dispatch(setIsAdmin(true));
        store.dispatch(addFlashMessage('Vous êtes connecté en tant qu\'administrateur', 'success'));
      }).catch(() => {
      });
      break;
    }
    case SUBMIT_ADMIN_CONNECT_FORM: {
      const data = {
        email: store.getState().admin.emailValue,
        password: store.getState().admin.passwordValue,
      };
      axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/login`,
        data,
      })
        .then((response) => {
          store.dispatch(setDoctorToken(response.data.token));
          store.dispatch(setDoctorId(response.data.doctorId));
          axios({
            method: 'get',
            url: `${SERVEUR_URL}/doctor/${response.data.doctorId}`,
          }).then((info) => {
            store.dispatch(setDoctorDatas(info.data));
          });
          sessionStorage.setItem('doctorToken', store.getState().doctor.doctorToken);
          sessionStorage.setItem('doctorId', store.getState().doctor.doctorId);
          store.dispatch(addFlashMessage('Vous êtes connecté en tant qu\'administrateur', 'success'));
          store.dispatch(setIsAdmin(true));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            store.dispatch(addFlashMessage('erreur d\'identifiant ou de mot de passe', 'error'));
          }
          else {
            store.dispatch(addFlashMessage('Une erreur est survenue veuillez reesayer plus tard', 'error'));
          }
        });
      break;
    }
    default:
      next(action);
  }
};

export default adminMiddleware;
