export const SET_RENEW_PASSWORD_FIELDS = 'SET_RENEW_PASSWORD_FIELDS';
export const SUBMIT_RENEW_PASSWORD_FORM = 'SUBMIT_RENEW_PASSWORD_FORM';

export const setRenewPasswordFields = (field, value) => ({
  type: SET_RENEW_PASSWORD_FIELDS,
  field,
  value,
});

export const submitRenewPasswordForm = () => ({
  type: SUBMIT_RENEW_PASSWORD_FORM,
});
