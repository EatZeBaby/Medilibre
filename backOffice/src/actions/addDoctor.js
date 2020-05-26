export const SET_ADDDOCTOR_FIELDS = 'SET_ADD_DOCTOR_FIELDS';
export const ADD_NEW_DOCTOR = 'ADD_NEW_DOCTOR';

export const setAddDoctorFields = (field, value) => ({
  type: SET_ADDDOCTOR_FIELDS,
  field,
  value,
});

export const addNewDoctor = () => ({
  type: ADD_NEW_DOCTOR,
});
