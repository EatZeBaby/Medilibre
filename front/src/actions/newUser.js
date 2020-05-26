export const SET_NEW_USER_FIELDS = 'SET_NEW_USER_FIELDS';
export const SUBMIT_NEW_USER_FORM_ADMIN = 'SUBMIT_NEW_USER_FORM_ADMIN';
export const SET_OPEN_NEW_USER_MODAL = 'SET_OPEN_NEW_USER_MODAL';

export const setNewUserFields = (fields, value) => ({
  type: SET_NEW_USER_FIELDS,
  fields,
  value,
});

export const submitNewUserFormAdmin = () => ({
  type: SUBMIT_NEW_USER_FORM_ADMIN,
});

export const setOpenNewUserModal = (value) => ({
  type: SET_OPEN_NEW_USER_MODAL,
  value,
});
