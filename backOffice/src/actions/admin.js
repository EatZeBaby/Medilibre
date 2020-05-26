export const SET_ADMIN_PAGE_FIELDS = 'SET_ADMIN_PAGE_FIELDS';
export const SUBMIT_ADMIN_CONNECT_FORM = 'UBMIT_ADMIN_CONNECT_FORM';
export const GET_ALL_DOCTOR_APPOINTMENTS = 'GET_ALL_DOCTOR_APPOINTMENTS';
export const SET_ALL_DOCTOR_APPOINTMENTS = 'SET_ALL_DOCTOR_APPOINTMENTS';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const SUBMIT_NEW_ADMIN_APPOINTMENT = 'SUBMIT_NEW_ADMIN_APPOINTMENT';

export const setAdminPageFields = (field, value) => ({
  type: SET_ADMIN_PAGE_FIELDS,
  field,
  value,
});

export const submitAdminConnectForm = () => ({
  type: SUBMIT_ADMIN_CONNECT_FORM,
});

export const getAllDoctorAppointments = () => ({
  type: GET_ALL_DOCTOR_APPOINTMENTS,
});

export const setAllDoctorAppointments = (appointments) => ({
  type: SET_ALL_DOCTOR_APPOINTMENTS,
  appointments,
});

export const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  users,
});

export const submitNewAdminAppointment = () => ({
  type: SUBMIT_NEW_ADMIN_APPOINTMENT,
});
