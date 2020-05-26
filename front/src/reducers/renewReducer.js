import { SET_OPEN_RENEW, SET_RENEW_FIELDS } from 'src/actions/renew';

const initialState = {
  openRenew: false,
  email: '',
  errorEmail: false,
};

const renewReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RENEW_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_OPEN_RENEW:
      return {
        ...state,
        openRenew: action.value,
      };
    default:
      return state;
  }
};

export default renewReducer;
