import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import { SUBMIT_PARAMETERS, SUBMIT_NEW_PASSWORD, setParametersFields } from 'src/actions/parameters';
import { SWITCH_ONLINE_APPOINTMENTS, setDoctorDatas } from 'src/actions/doctor';

import { addFlashMessage } from 'src/actions/app';

// eslint-disable-next-line no-unused-vars
const parametersMiddleware = (store) => (next) => (action) => {
  const { doctorToken, doctorId } = sessionStorage;
  switch (action.type) {
    case SWITCH_ONLINE_APPOINTMENTS: {
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          ...store.getState().doctor.doctorDatas,
          onlineAppointment: action.value,
        },
      })
        .then((response) => {
          const doctor = {
            ...store.getState().doctor.doctorDatas,
            ...response.data.doctor,
          };
          store.dispatch(setDoctorDatas(doctor));
        });
      break;
    }
    case SUBMIT_NEW_PASSWORD: {
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/changePassword/${doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          password: store.getState().parameters.password,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre mot de passe à été modifié avec succés', 'success'));
          store.dispatch(setParametersFields('passwordError', false));
          store.dispatch(setParametersFields('password', ''));
          store.dispatch(setParametersFields('confirmPasswordError', false));
          store.dispatch(setParametersFields('confirmPassword', ''));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case SUBMIT_PARAMETERS: {
      const { parameters } = store.getState();
      const datas = {
        oppeningHours: store.getState().doctor.doctorDatas.oppeningHours,
        oppeningDays: store.getState().doctor.doctorDatas.oppeningDays,
        appointmentDuration: parameters.duration,
        appointmentFrequency: parameters.frequency,
        appointmentDelay: parameters.delay,
        startPlanning: parameters.start,
        endPlanning: parameters.end,
        groupSessions: parameters.groupSessions,
        groupSize: parameters.groupSize,
        appointmentPeriod: parameters.period,
      };
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        data: datas,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Les paramètres ont été enregistrés avec succés', 'success'));
          store.dispatch(setParametersFields('success', true));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une rreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default parametersMiddleware;
