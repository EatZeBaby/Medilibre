export const GET_FUTUR_APPOINTMENTS = 'GET_FUTUR_APPOINTMENTS';
export const SAVE_FUTUR_APPOINTMENTS = 'SAVE_FUTUR_APPOINTMENTS';
export const SET_SHOWED_DAYS = 'SET_SHOWED_DAYS';
export const SELECT_APPOINTMENT = 'SELECT_APPOINTMENT';
export const SET_HOME_PAGE_LOADING = 'SET_HOME_PAGE_LOADING';
export const SET_HOME_PAGE_MODAL_SHOW = 'SET_HOME_PAGE_MODAL_SHOW';
export const SELECT_CURENT_APPOINTMENT = 'SELECT_CURRENT_APPOINTMENT';
export const SET_HOME_PAGE_FIELDS = 'SET_HOME_PAGE_FIELDS';
export const SUBMIT_NEW_USER_FORM = 'SUBMIT_NEW_USER_FORM';
export const SUBMIT_CONNECT_FORM = 'SUBMIT_CONNECT_FORM';
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';

export const getFuturAppointments = () => ({
  type: GET_FUTUR_APPOINTMENTS,
});

export const saveFuturAppointments = (appointments) => ({
  type: SAVE_FUTUR_APPOINTMENTS,
  appointments,
});

export const setShowedDays = (days) => ({
  type: SET_SHOWED_DAYS,
  days,
});

export const selectAppointment = () => ({
  type: SELECT_APPOINTMENT,
});

export const sethomePageLoading = (value) => ({
  type: SET_HOME_PAGE_LOADING,
  value,
});

export const setHomePageModalShow = (value) => ({
  type: SET_HOME_PAGE_MODAL_SHOW,
  value,
});

export const selectCurrentAppointment = (dateTime) => ({
  type: SELECT_CURENT_APPOINTMENT,
  dateTime,
});

export const setHomePageFields = (fieldName, value) => ({
  type: SET_HOME_PAGE_FIELDS,
  fieldName,
  value,
});

export const submitNewUserForm = () => ({
  type: SUBMIT_NEW_USER_FORM,
});

export const submitConnectForm = () => ({
  type: SUBMIT_CONNECT_FORM,
});

export const setSelectedDay = (value) => ({
  type: SET_SELECTED_DAY,
  value,
});
