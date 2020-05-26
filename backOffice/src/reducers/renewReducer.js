import { SET_RENEW_FIELDS } from 'src/actions/renew';

const initialState = {
  renewToken: '',
  password: '',
  errorPassword: false,
  confirmPassword: '',
  errorConfirmPassword: false,
  success: false,
};

const renewReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RENEW_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default renewReducer;
