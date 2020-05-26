import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import {
  GET_USER_APPOINTMENTS,
  DELETE_APPOINTMENT,
  getUserAppointments,
  setAppointmentsList,
} from 'src/actions/appointments';
import { addFlashMessage } from '../actions/app';

const appointmentsMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().user;
  switch (action.type) {
    case DELETE_APPOINTMENT: {
      Axios({
        method: 'delete',
        url: `${SERVEUR_URL}/appointment/${action.appointmentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre rendez-vous à bien été annulé', 'success'));
          store.dispatch(getUserAppointments());
        })
        .catch((error) => {
          store.dispatch(addFlashMessage(`Une erreur c'est produite veuillez reesayer ulterieurement (${error.response.status})`, 'error'));
        });
      break;
    }
    case GET_USER_APPOINTMENTS: {
      Axios.get(`${SERVEUR_URL}/doctor`)
        .then((doctors) => {
          Axios({
            method: 'get',
            url: `${SERVEUR_URL}/appointment/user`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then((appointments) => {
            const appointmentsList = appointments.data.map((appointment) => {
              const appointmentDoctor = doctors.data.find((doctor) => (
                // eslint-disable-next-line no-underscore-dangle
                doctor._id === appointment.doctorId
              ));
              return {
                ...appointment,
                doctorName: `${appointmentDoctor.firstname} ${appointmentDoctor.lastname}`,
              };
            });
            store.dispatch(setAppointmentsList(appointmentsList));
          });
        });
      break;
    }
    default:
      next(action);
  }
};

export default appointmentsMiddleware;
