import {
  SAVE_FUTUR_APPOINTMENTS,
  SET_SHOWED_DAYS,
  SET_HOME_PAGE_LOADING,
  SET_HOME_PAGE_MODAL_SHOW,
  SELECT_CURENT_APPOINTMENT,
  SET_HOME_PAGE_FIELDS,
  SET_SELECTED_DAY,
} from 'src/actions/homePage';

const initialState = {
  selectedDay: '',
  futurAppointments: [],
  appointmentsDays: [],
  showedDays: [],
  homePageLoading: true,
  homePageModalShow: false,
  currentAppointment: '',
  newFirstname: '',
  firstnameError: false,
  newLastname: '',
  lastnameError: false,
  newEmail: '',
  emailError: false,
  newPhone: '',
  phoneError: false,
  newPassword: '',
  passwordError: false,
  newConfirmPassword: '',
  confirmPasswordError: false,
  connectEmailValue: '',
  connectErrorEmail: false,
  connectErrorPassword: false,
  connectPasswordValue: '',
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.value,
      };
    case SET_HOME_PAGE_FIELDS:
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    case SELECT_CURENT_APPOINTMENT:
      return {
        ...state,
        currentAppointment: action.dateTime,
      };
    case SET_HOME_PAGE_MODAL_SHOW:
      return {
        ...state,
        homePageModalShow: action.value,
      };
    case SET_HOME_PAGE_LOADING:
      return {
        ...state,
        homePageLoading: action.value,
      };
    case SET_SHOWED_DAYS:
      return {
        ...state,
        showedDays: action.days,
      };
    case SAVE_FUTUR_APPOINTMENTS:
      return {
        ...state,
        futurAppointments: action.appointments,
      };
    default:
      return state;
  }
};

export default mainReducer;
