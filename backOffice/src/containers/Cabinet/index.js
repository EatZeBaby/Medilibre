import { connect } from 'react-redux';

import { addFlashMessage } from 'src/actions/app';
import { changeCabinetFields, saveNewCabinetParameters, changeAvatarImage } from 'src/actions/cabinet';
import { setDoctorDatas } from 'src/actions/doctor';

import Cabinet from 'src/components/Cabinet';

const mapStateToProps = (state) => ({
  civility: state.cabinet.civility,
  firstname: state.cabinet.firstname,
  lastname: state.cabinet.lastname,
  job: state.cabinet.job,
  adress: state.cabinet.adress,
  zip: state.cabinet.zip,
  city: state.cabinet.city,
  contactEmail: state.cabinet.contactEmail,
  phone: state.cabinet.phone,
  presentation: state.cabinet.presentation,
  oppeningDays: state.cabinet.oppeningDays,
  mondayFull: state.cabinet.mondayFull,
  tuesdayFull: state.cabinet.tuesdayFull,
  wednesdayFull: state.cabinet.wednesdayFull,
  thursdayFull: state.cabinet.thursdayFull,
  fridayFull: state.cabinet.fridayFull,
  saturdayFull: state.cabinet.saturdayFull,
  sundayFull: state.cabinet.sundayFull,
  mondayMorningStart: state.cabinet.mondayMorningStart,
  mondayMorningEnd: state.cabinet.mondayMorningEnd,
  mondayAfternoonStart: state.cabinet.mondayAfternoonStart,
  mondayAfternoonEnd: state.cabinet.mondayAfternoonEnd,
  tuesdayMorningStart: state.cabinet.tuesdayMorningStart,
  tuesdayMorningEnd: state.cabinet.tuesdayMorningEnd,
  tuesdayAfternoonStart: state.cabinet.tuesdayAfternoonStart,
  tuesdayAfternoonEnd: state.cabinet.tuesdayAfternoonEnd,
  wednesdayMorningStart: state.cabinet.wednesdayMorningStart,
  wednesdayMorningEnd: state.cabinet.wednesdayMorningEnd,
  wednesdayAfternoonStart: state.cabinet.wednesdayAfternoonStart,
  wednesdayAfternoonEnd: state.cabinet.wednesdayAfternoonEnd,
  thursdayMorningStart: state.cabinet.thursdayMorningStart,
  thursdayMorningEnd: state.cabinet.thursdayMorningEnd,
  thursdayAfternoonStart: state.cabinet.thursdayAfternoonStart,
  thursdayAfternoonEnd: state.cabinet.thursdayAfternoonEnd,
  fridayMorningStart: state.cabinet.fridayMorningStart,
  fridayMorningEnd: state.cabinet.fridayMorningEnd,
  fridayAfternoonStart: state.cabinet.fridayAfternoonStart,
  fridayAfternoonEnd: state.cabinet.fridayAfternoonEnd,
  saturdayMorningStart: state.cabinet.saturdayMorningStart,
  saturdayMorningEnd: state.cabinet.saturdayMorningEnd,
  saturdayAfternoonStart: state.cabinet.saturdayAfternoonStart,
  saturdayAfternoonEnd: state.cabinet.saturdayAfternoonEnd,
  sundayMorningStart: state.cabinet.sundayMorningStart,
  sundayMorningEnd: state.cabinet.sundayMorningEnd,
  sundayAfternoonStart: state.cabinet.sundayAfternoonStart,
  sundayAfternoonEnd: state.cabinet.sundayAfternoonEnd,
  success: state.cabinet.success,
  loading: state.main.loading,
  doctorDatas: state.doctor.doctorDatas,
  avatarLoading: state.cabinet.avatarLoading,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  changeCabinetFields: (field, value) => {
    dispatch(changeCabinetFields(field, value));
  },
  saveNewCabinetParameters: () => {
    dispatch(saveNewCabinetParameters());
  },
  setDoctorDatas: (doctorDatas) => {
    dispatch(setDoctorDatas(doctorDatas));
  },
  addFlashMessage: (message, status) => {
    dispatch(addFlashMessage(message, status));
  },
  changeAvatarImage: (avatar) => {
    dispatch(changeAvatarImage(avatar));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cabinet);
