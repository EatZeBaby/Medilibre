export const SET_CONNECT_PAGE_FIELDS = 'SET_CONNECT_PAGE_FIELDS';
export const SUBMIT_CONNECT_PAGE_FORM = 'SUBMIT_CONNECT_PAGE_FORM';
export const SET_OPEN_CONNECT = 'SET_OPEN_CONNECT';

export const setConnectPageFields = (field, value) => ({
  type: SET_CONNECT_PAGE_FIELDS,
  field,
  value,
});

export const submitConnectPageForm = () => ({
  type: SUBMIT_CONNECT_PAGE_FORM,
});

export const setOpenConnect = (value) => ({
  type: SET_OPEN_CONNECT,
  value,
});
