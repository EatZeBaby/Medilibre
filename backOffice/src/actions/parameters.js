export const SET_PARAMETERS_FIELDS = 'SET_PARAMETERS_FIELDS';
export const SUBMIT_PARAMETERS = 'SUBMIT_PARAMETERS';
export const SUBMIT_NEW_PASSWORD = 'SUBMIT_NEW_PASSWORD';

export const setParametersFields = (field, value) => ({
  type: SET_PARAMETERS_FIELDS,
  field,
  value,
});

export const submitParameters = () => ({
  type: SUBMIT_PARAMETERS,
});

export const submitNewPassword = () => ({
  type: SUBMIT_NEW_PASSWORD,
});
