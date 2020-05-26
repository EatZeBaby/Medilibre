export const SET_SEARCH_PAGE_FIELDS = 'SET_SEARCH_PAGE_FIELDS';
export const LOAD_DOCTORS_LIST = 'LOAD_DOCTOR_LIST';

export const setSearchPageFields = (field, value) => ({
  type: SET_SEARCH_PAGE_FIELDS,
  field,
  value,
});

export const loadDoctorsList = () => ({
  type: LOAD_DOCTORS_LIST,
});
