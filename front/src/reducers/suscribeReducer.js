import { SET_SUSCRIBE_PAGE_FIELDS, SET_OPEN_SUSCRIBE } from 'src/actions/suscribe';

const initialState = {
  firstnameValue: '',
  firstnameError: false,
  lastnameValue: '',
  lastnameError: false,
  emailValue: '',
  emailError: false,
  phoneValue: '',
  phoneError: false,
  passwordValue: '',
  passwordError: false,
  confirmPasswordValue: '',
  confirmPasswordError: false,
  openSuscribe: false,
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_OPEN_SUSCRIBE:
      return {
        ...state,
        openSuscribe: action.value,
      };
    case SET_SUSCRIBE_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default mainReducer;
