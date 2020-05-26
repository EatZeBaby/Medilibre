import { CHANGE_CABINET_FIELDS } from 'src/actions/cabinet';

const initialState = {
  success: false,
  civility: '',
  firstname: '',
  lastname: '',
  job: '',
  adress: '',
  zip: '',
  city: '',
  contactEmail: '',
  phone: '',
  presentation: '',
  oppeningDays: [0, 1, 1, 1, 1, 1, 0],
  mondayFull: false,
  tuesdayFull: false,
  wednesdayFull: false,
  thursdayFull: false,
  fridayFull: false,
  saturdayFull: false,
  sundayFull: false,
  mondayMorningStart: '08:00',
  mondayMorningEnd: '12:00',
  mondayAfternoonStart: '14:00',
  mondayAfternoonEnd: '19:00',
  tuesdayMorningStart: '08:00',
  tuesdayMorningEnd: '12:00',
  tuesdayAfternoonStart: '14:00',
  tuesdayAfternoonEnd: '19:00',
  wednesdayMorningStart: '08:00',
  wednesdayMorningEnd: '12:00',
  wednesdayAfternoonStart: '14:00',
  wednesdayAfternoonEnd: '19:00',
  thursdayMorningStart: '08:00',
  thursdayMorningEnd: '12:00',
  thursdayAfternoonStart: '14:00',
  thursdayAfternoonEnd: '19:00',
  fridayMorningStart: '08:00',
  fridayMorningEnd: '12:00',
  fridayAfternoonStart: '14:00',
  fridayAfternoonEnd: '19:00',
  saturdayMorningStart: '08:00',
  saturdayMorningEnd: '12:00',
  saturdayAfternoonStart: '14:00',
  saturdayAfternoonEnd: '19:00',
  sundayMorningStart: '08:00',
  sundayMorningEnd: '12:00',
  sundayAfternoonStart: '14:00',
  sundayAfternoonEnd: '19:00',
  avatar: {},
  avatarLoading: false,
};

const cabinetReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_CABINET_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default cabinetReducer;
