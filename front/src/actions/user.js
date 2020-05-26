export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_DATAS = 'SET_USER_DATAS';

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUserId = (id) => ({
  type: SET_USER_ID,
  id,
});

export const setUserDatas = (user) => ({
  type: SET_USER_DATAS,
  user,
});
