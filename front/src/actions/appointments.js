export const GET_USER_APPOINTMENTS = 'GET_USER_APPOINTMENTS';
export const SET_APPOINTMENTS_LIST = 'SET_APPOINTMENTS_LIST';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';
export const SET_OPEN_APPOINTMENT = 'SET_OPEN_APPOINTMENT';
export const SET_OPEN_HISTORIC = 'SET_OPEN_HISTORIC';

export const getUserAppointments = () => ({
  type: GET_USER_APPOINTMENTS,
});

export const setAppointmentsList = (list) => ({
  type: SET_APPOINTMENTS_LIST,
  list,
});

export const deleteAppointment = (appointmentId) => ({
  type: DELETE_APPOINTMENT,
  appointmentId,
});

export const setOpenAppointment = (value) => ({
  type: SET_OPEN_APPOINTMENT,
  value,
});

export const setOpenHistoric = (value) => ({
  type: SET_OPEN_HISTORIC,
  value,
});
