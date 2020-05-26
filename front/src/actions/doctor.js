export const SET_DOCTOR_TOKEN = 'SET_DOCTOR_TOKEN';
export const SET_DOCTOR_ID = 'SET_DOCTOR_ID';
export const SET_DOCTOR_DATAS = 'SET_DOCTOR_DATAS';
export const CHECK_ISADMIN = 'CHECK_ISADMIN';
export const LOGOUT_DOCTOR = 'LOGOUT_DOCTOR';

export const setDoctorToken = (doctorToken) => ({
  type: SET_DOCTOR_TOKEN,
  doctorToken,
});

export const setDoctorId = (id) => ({
  type: SET_DOCTOR_ID,
  id,
});

export const setDoctorDatas = (doctor) => ({
  type: SET_DOCTOR_DATAS,
  doctor,
});

export const checkIsAdmin = () => ({
  type: CHECK_ISADMIN,
});

export const logoutDoctor = () => ({
  type: LOGOUT_DOCTOR,
});
