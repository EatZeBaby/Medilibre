import {
  SAVE_PARAMETERS,
  SET_LOADING,
  SET_ISLOGGED,
  SET_ISADMIN,
  TOGGLE_SHOW_MENU,
  SET_SCHEDULE,
  ADD_FLASH_MESSAGE,
} from 'src/actions/app';

const initialState = {
  parameters: {},
  schedule: {},
  loading: true,
  isLogged: false,
  isAdmin: false,
  showMenu: false,
  flashMessage: [],
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ISADMIN:
      return {
        ...state,
        isAdmin: action.value,
      };
    case ADD_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: [action.message, action.variant],
      };
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule,
      };
    case TOGGLE_SHOW_MENU:
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    case SET_ISLOGGED:
      return {
        ...state,
        isLogged: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SAVE_PARAMETERS:
      return {
        ...state,
        parameters: action.parameters,
      };
    default:
      return state;
  }
};

export default mainReducer;
