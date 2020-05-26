import { SET_ADMIN_PAGE_FIELDS, SET_ALL_DOCTOR_APPOINTMENTS, SET_ALL_USERS } from 'src/actions/admin';

const initialState = {
  emailValue: '',
  errorEmail: false,
  passwordValue: '',
  errorPassword: false,
  appointments: [],
  users: [],
  newAppointmentStart: '',
  newAppointmentEnd: '',
  newAppointmentUser: {},
  newAppointmentIsHoliday: false,
  newUserName: '',
  openModal: false,
  patientError: false,
  openModifyModal: false,
  selectedEvent: {},
  modifiedAppointmentStart: {},
  modifiedAppointmentEnd: {},
  modifiedAppointmentUserId: '',
  modifiedAppointmentId: '',
};

const adminReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_ALL_DOCTOR_APPOINTMENTS:
      return {
        ...state,
        appointments: action.appointments,
      };
    case SET_ADMIN_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default adminReducer;
