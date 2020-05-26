export const SET_SUSCRIBE_PAGE_FIELDS = 'SET_SUSCRIBE_PAGE_FIELDS';
export const SUBMIT_SUSCRIBE_PAGE_FORM = 'SUBMIT_SUSCRIBE_PAGE_FORM';
export const SET_OPEN_SUSCRIBE = 'SET_OPEN_SUSCRIBE';

export const setSuscribePageFields = (field, value) => ({
  type: SET_SUSCRIBE_PAGE_FIELDS,
  field,
  value,
});

export const submitSuscribePageForm = () => ({
  type: SUBMIT_SUSCRIBE_PAGE_FORM,
});

export const setOpenSuscribe = (value) => ({
  type: SET_OPEN_SUSCRIBE,
  value,
});
