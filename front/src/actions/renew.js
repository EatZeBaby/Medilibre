export const SET_OPEN_RENEW = 'SET_OPEN_RENEW';
export const SET_RENEW_FIELDS = 'SET_RENEW_FIELDS';
export const SUBMIT_RENEW_FORM = 'SUBMIT_RENEW_FORM';

export const setOpenRenew = (value) => ({
  type: SET_OPEN_RENEW,
  value,
});

export const setRenewFields = (field, value) => ({
  type: SET_RENEW_FIELDS,
  field,
  value,
});

export const submitRenewForm = () => ({
  type: SUBMIT_RENEW_FORM,
});
