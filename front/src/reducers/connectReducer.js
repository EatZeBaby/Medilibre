import { SET_CONNECT_PAGE_FIELDS, SET_OPEN_CONNECT } from 'src/actions/connect';

const initialState = {
  emailValue: '',
  errorEmail: false,
  passwordValue: '',
  errorPassword: false,
  openConnect: false,
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_OPEN_CONNECT:
      return {
        ...state,
        openConnect: action.value,
      };
    case SET_CONNECT_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default mainReducer;
