import { SET_APPOINTMENTS_LIST, SET_OPEN_APPOINTMENT, SET_OPEN_HISTORIC } from 'src/actions/appointments';

const initialState = {
  appointmentsList: [],
  openAppointment: false,
  openHistoric: false,
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_OPEN_HISTORIC:
      return {
        ...state,
        openHistoric: action.value,
      };
    case SET_OPEN_APPOINTMENT:
      return {
        ...state,
        openAppointment: action.value,
      };
    case SET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointmentsList: action.list,
      };
    default:
      return state;
  }
};

export default mainReducer;
