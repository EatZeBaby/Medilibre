export const SET_FORGOT_EMAIL = 'SET_FORGOT_EMAIL';
export const SUBMIT_FORGOT_FORM = 'SUBMIT_FORGOT_FORM';

export const setForgotEmail = (email) => ({
  type: SET_FORGOT_EMAIL,
  email,
});

export const submitForgotForm = () => ({
  type: SUBMIT_FORGOT_FORM,
});
