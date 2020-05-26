import { SET_NEW_USER_FIELDS, SET_OPEN_NEW_USER_MODAL } from 'src/actions/newUser';

const initialState = {
  firstnameValue: '',
  errorFirstname: false,
  lastnameValue: '',
  errorLastname: false,
  phoneValue: '',
  errorPhone: false,
  open: false,
};

const newUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_OPEN_NEW_USER_MODAL:
      return {
        ...state,
        open: action.value,
      };
    case SET_NEW_USER_FIELDS:
      return {
        ...state,
        [action.fields]: action.value,
      };
    default:
      return state;
  }
};

export default newUserReducer;
