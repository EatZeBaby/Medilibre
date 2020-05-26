export const SET_RENEW_FIELDS = 'SET_RENEW_FIELDS';
export const SUBMIT_RENEW_FORM = 'SUBMIT_RENEW_FORM';

export const setRenewFields = (field, value) => ({
  type: SET_RENEW_FIELDS,
  field,
  value,
});

export const submitRenewForm = () => ({
  type: SUBMIT_RENEW_FORM,
});
