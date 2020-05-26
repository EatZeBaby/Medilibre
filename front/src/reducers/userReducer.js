import { SET_TOKEN, SET_USER_ID, SET_USER_DATAS } from 'src/actions/user';

const initialState = {
  userDatas: {},
  token: '',
  userId: '',
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_DATAS:
      return {
        ...state,
        userDatas: action.user,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default mainReducer;
