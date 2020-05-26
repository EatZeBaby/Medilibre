import { SET_PROFILE_PAGE_FIELDS, SET_OPEN_PROFILE } from 'src/actions/profile';

const initialState = {
  firstnameValue: '',
  errorFirstname: false,
  lastnameValue: '',
  errorLastname: false,
  emailValue: '',
  errorEmail: false,
  phoneValue: '',
  errorPhone: false,
  openProfile: false,
};

const profilenReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_OPEN_PROFILE:
      return {
        ...state,
        openProfile: action.value,
      };
    case SET_PROFILE_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default profilenReducer;
