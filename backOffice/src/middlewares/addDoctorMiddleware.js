import Axios from 'axios';
import { ADD_NEW_DOCTOR, setAddDoctorFields } from 'src/actions/addDoctor';
import { addFlashMessage } from 'src/actions/app';

import SERVEUR_URL from 'src/config';


// eslint-disable-next-line no-unused-vars
const parametersMiddleware = (store) => (next) => (action) => {
  const { doctorToken } = sessionStorage;
  switch (action.type) {
    case ADD_NEW_DOCTOR: {
      store.dispatch(addFlashMessage('hello boy'));
      const state = store.getState().addDoctor;
      const doctor = {
        firstname: state.firstname,
        lastname: state.lastname.toUpperCase(),
        job: state.job,
        civility: state.civility,
        appointmentFrequency: 30,
        appointmentDuration: 30,
        appointmentDelay: 1440,
        startPlanning: 'Wed Jan 01 2020 08:00:00 GMT+0100 (heure normale d’Europe centrale)',
        endPlanning: 'Wed Jan 01 2020 21:00:00 GMT+0100 (heure normale d’Europe centrale)',
        password: 'test',
        email: state.email.trim().toLowerCase(),
        oppeningHours: [
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
          [
            [
              '08:00',
              '12:00',
            ],
            [
              '14:00',
              '19:00',
            ],
          ],
        ],
        oppeningDays: [0, 1, 1, 1, 1, 1, 0],
        adress: '1 rue de la tour',
        zip: '75000',
        city: 'Paris',
        publicEmail: 'public@email.fr'.toLowerCase(),
        phone: '0606060606',
        slug: `${state.firstname}-${state.lastname}`.toLowerCase(),
        superAdmin: state.superAdmin,
        presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel iaculis orci. Cras nunc purus, sollicitudin quis scelerisque non, tempus venenatis leo. Etiam ullamcorper vestibulum sapien ut mollis. Quisque porttitor gravida turpis sit amet consequat. Nulla placerat ex id magna varius rutrum. Proin ac justo hendrerit, suscipit leo id, lobortis sem. Ut ut eros sed lectus posuere vulputate. Nam ut lorem et neque commodo commodo quis vel magna. Pellentesque placerat porta neque ut pellentesque. Aenean tincidunt, magna in feugiat pulvinar, mauris neque aliquam velit, vel gravida ex erat vel quam        Proin id velit fringilla, placerat nisl quis, euismod arcu. Cras ac rutrum sapien, eget ornare justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam iaculis rutrum eleifend. Pellentesque sodales nulla sit amet elit convallis accumsan. Cras sollicitudin egestas nisi at facilisis. Maecenas ac erat vitae libero rhoncus pharetra. Morbi congue sem sed elementum pulvinar. Nulla ultricies magna.',
      };
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/create`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: doctor,
      })
        .then(() => {
          store.dispatch(addFlashMessage('Nouvel utilisateur créé', 'success'));
          store.dispatch(setAddDoctorFields('civility', ''));
          store.dispatch(setAddDoctorFields('firstname', ''));
          store.dispatch(setAddDoctorFields('lastname', ''));
          store.dispatch(setAddDoctorFields('email', ''));
          store.dispatch(setAddDoctorFields('job', ''));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite, veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default parametersMiddleware;
