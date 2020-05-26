export const GET_PARAMETERS = 'GET_PARAMETERS';
export const SAVE_PARAMETERS = 'SAVE_PARAMETERS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ISLOGGED = 'SET_ISLOGGED';
export const LOGIN_USER = 'LOGIN_USER';
export const CHECK_SESSION = 'CHECK_SESSION';
export const TOGGLE_SHOW_MENU = 'TOGGLE_SHOW_MENU';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_SCHEDULE = 'GET_SCHEDULE';
export const SET_SCHEDULE = 'SET_SCHEDULE';
export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const SET_ISADMIN = 'SET_ISADMIN';
export const SET_404 = 'SET_404';

export const getParameters = (slug) => ({
  type: GET_PARAMETERS,
  slug,
});

export const saveParameters = (parameters) => ({
  type: SAVE_PARAMETERS,
  parameters,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const setIsLogged = (value) => ({
  type: SET_ISLOGGED,
  value,
});

export const loginUser = (userId) => ({
  type: LOGIN_USER,
  userId,
});

export const checkSession = () => ({
  type: CHECK_SESSION,
});

export const toggleShowMenu = () => ({
  type: TOGGLE_SHOW_MENU,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const setSchedule = (schedule) => ({
  type: SET_SCHEDULE,
  schedule,
});

export const getSchedule = () => ({
  type: GET_SCHEDULE,
});

export const addFlashMessage = (message, variant) => ({
  type: ADD_FLASH_MESSAGE,
  message,
  variant,
});

export const setIsAdmin = (value) => ({
  type: SET_ISADMIN,
  value,
});

export const set404 = (value) => ({
  type: SET_404,
  value,
});
