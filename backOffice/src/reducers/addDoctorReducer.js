import { SET_ADDDOCTOR_FIELDS } from 'src/actions/addDoctor';

const initialState = {
  civility: '',
  firstname: '',
  lastname: '',
  job: '',
  email: '',
  superAdmin: false,
};

const addDoctorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ADDDOCTOR_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default addDoctorReducer;
