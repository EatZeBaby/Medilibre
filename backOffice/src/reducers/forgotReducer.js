import { SET_FORGOT_EMAIL } from 'src/actions/forgot';

const initialState = {
  email: '',
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FORGOT_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
};

export default mainReducer;
