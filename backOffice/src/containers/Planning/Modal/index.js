import { connect } from 'react-redux';

import { setNewUserFields, submitNewUserFormAdmin, setOpenNewUserModal } from 'src/actions/newUser';
import { getAllDoctorAppointments, setAdminPageFields, submitNewAdminAppointment } from 'src/actions/admin';

import Modal from 'src/components/Planning/Modal';


// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  newAppointmentStart: state.admin.newAppointmentStart,
  newAppointmentEnd: state.admin.newAppointmentEnd,
  newAppointmentIsHoliday: state.admin.newAppointmentIsHoliday,
  newAppointmentIsDomicile: state.admin.newAppointmentIsDomicile,
  newAppointmentIsRecurent: state.admin.newAppointmentIsRecurent,
  users: state.admin.users,
  newUserName: state.admin.newUserName,
  openModal: state.admin.openModal,
  patientError: state.admin.patientError,
  newAppointmentUser: state.admin.newAppointmentUser,
  newUserFirstname: state.newUser.firstnameValue,
  newUserLastname: state.newUser.lastnameValue,
  newUserPhone: state.newUser.phoneValue,
  open: state.newUser.open,
  monday: state.admin.monday,
  tuesday: state.admin.tuesday,
  wednesday: state.admin.wednesday,
  thursday: state.admin.thursday,
  friday: state.admin.friday,
  saturday: state.admin.saturday,
  sunday: state.admin.sunday,
  startRecurenceDay: state.admin.startRecurenceDay,
  endRecurenceDay: state.admin.endRecurenceDay,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  getAllDoctorAppointments: () => {
    dispatch(getAllDoctorAppointments());
  },
  setAdminPageFields: (field, value) => {
    dispatch(setAdminPageFields(field, value));
  },
  submitNewAdminAppointment: () => {
    dispatch(submitNewAdminAppointment());
  },
  setNewUserFields: (field, value) => {
    dispatch(setNewUserFields(field, value));
  },
  submitNewUserFormAdmin: () => {
    dispatch(submitNewUserFormAdmin());
  },
  setOpen: (value) => {
    dispatch(setOpenNewUserModal(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
