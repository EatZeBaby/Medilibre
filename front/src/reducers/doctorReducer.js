import { SET_DOCTOR_TOKEN, SET_DOCTOR_ID, SET_DOCTOR_DATAS } from 'src/actions/doctor';

const initialState = {
  doctorDatas: {},
  doctorToken: '',
  doctorId: '',
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DOCTOR_DATAS:
      return {
        ...state,
        doctorDatas: action.doctor,
      };
    case SET_DOCTOR_ID:
      return {
        ...state,
        doctorId: action.id,
      };
    case SET_DOCTOR_TOKEN:
      return {
        ...state,
        doctorToken: action.doctorToken,
      };
    default:
      return state;
  }
};

export default mainReducer;
