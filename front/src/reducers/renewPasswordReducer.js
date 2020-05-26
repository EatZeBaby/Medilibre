import { SET_RENEW_PASSWORD_FIELDS } from 'src/actions/renewPassword';

const initialState = {
  password: '',
  errorPassword: false,
  confirmPassword: '',
  errorConfirmPassword: false,
  success: false,
};

const renewPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RENEW_PASSWORD_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default renewPasswordReducer;
