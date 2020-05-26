import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import { SAVE_NEW_CABINET_PARAMETERS, CHANGE_AVATAR_IMAGE, changeCabinetFields } from 'src/actions/cabinet';
import { addFlashMessage } from 'src/actions/app';


// eslint-disable-next-line no-unused-vars
const cabinetMiddleware = (store) => (next) => (action) => {
  const { doctorToken } = sessionStorage;
  switch (action.type) {
    case CHANGE_AVATAR_IMAGE: {
      const data = new FormData();
      data.append('file', store.getState().cabinet.avatar);
      store.dispatch(changeCabinetFields('avatarLoading', true));
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/avatar`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Nouvel avatar enregistré', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite, veuillez réessayer ulterieurement', 'error'));
        })
        .finally(() => {
          store.dispatch(changeCabinetFields('avatarLoading', false));
        });

      break;
    }
    case SAVE_NEW_CABINET_PARAMETERS: {
      const { cabinet } = store.getState();
      const sunday = [[cabinet.sundayMorningStart, cabinet.sundayMorningEnd]];
      if (!cabinet.sundayFull) {
        sunday.push([cabinet.sundayAfternoonStart, cabinet.sundayAfternoonEnd]);
      }
      const monday = [[cabinet.mondayMorningStart, cabinet.mondayMorningEnd]];
      if (!cabinet.mondayFull) {
        monday.push([cabinet.mondayAfternoonStart, cabinet.mondayAfternoonEnd]);
      }
      const tuesday = [[cabinet.tuesdayMorningStart, cabinet.tuesdayMorningEnd]];
      if (!cabinet.tuesdayFull) {
        tuesday.push([cabinet.tuesdayAfternoonStart, cabinet.tuesdayAfternoonEnd]);
      }
      const wednesday = [[cabinet.wednesdayMorningStart, cabinet.wednesdayMorningEnd]];
      if (!cabinet.wednesdayFull) {
        wednesday.push([cabinet.wednesdayAfternoonStart, cabinet.wednesdayAfternoonEnd]);
      }
      const thursday = [[cabinet.thursdayMorningStart, cabinet.thursdayMorningEnd]];
      if (!cabinet.thursdayFull) {
        thursday.push([cabinet.thursdayAfternoonStart, cabinet.thursdayAfternoonEnd]);
      }
      const friday = [[cabinet.fridayMorningStart, cabinet.fridayMorningEnd]];
      if (!cabinet.fridayFull) {
        friday.push([cabinet.fridayAfternoonStart, cabinet.fridayAfternoonEnd]);
      }
      const saturday = [[cabinet.saturdayMorningStart, cabinet.saturdayMorningEnd]];
      if (!cabinet.saturdayFull) {
        saturday.push([cabinet.saturdayAfternoonStart, cabinet.saturdayAfternoonEnd]);
      }

      const oppeningHours = [
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
      ];
      const updatedDoctor = {
        firstname: cabinet.firstname,
        lastname: cabinet.lastname,
        job: cabinet.job,
        civility: cabinet.civility,
        oppeningHours,
        oppeningDays: cabinet.oppeningDays,
        adress: cabinet.adress,
        zip: cabinet.zip,
        city: cabinet.city,
        publicEmail: cabinet.contactEmail,
        phone: cabinet.phone,
        presentation: cabinet.presentation,
      };
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        data: updatedDoctor,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Les paramètres ont été enregistrés avec succés', 'success'));
          store.dispatch(changeCabinetFields('success', true));
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

export default cabinetMiddleware;
