import { connect } from 'react-redux';

import { getParameters, checkSession, logoutUser } from 'src/actions/app';
import { setOpenConnect } from 'src/actions/connect';
import { setOpenSuscribe } from 'src/actions/suscribe';
import { setOpenHistoric } from 'src/actions/appointments';
import { setOpenProfile } from 'src/actions/profile';
import { checkIsAdmin } from 'src/actions/doctor';
import { getAllDoctorAppointments } from 'src/actions/admin';

import App from 'src/components/App';

const mapStateToProps = (state) => ({
  loading: state.main.loading,
  isLogged: state.main.isLogged,
  isAdmin: state.main.isAdmin,
  userDatas: state.user.userDatas,
  openConnect: state.connect.openConnect,
  openSuscribe: state.suscribe.openSuscribe,
  openHistoric: state.appointments.openHistoric,
  openProfile: state.profile.openProfile,
  flashMessage: state.main.flashMessage,
  superAdmin: state.doctor.doctorDatas.superAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  getParameters: () => {
    dispatch(getParameters());
  },
  checkSession: () => {
    dispatch(checkSession());
  },
  logoutUser: () => {
    dispatch(logoutUser());
  },
  setOpenConnect: (value) => {
    dispatch(setOpenConnect(value));
  },
  setOpenSuscribe: (value) => {
    dispatch(setOpenSuscribe(value));
  },
  setOpenHistoric: (value) => {
    dispatch(setOpenHistoric(value));
  },
  setOpenProfile: (value) => {
    dispatch(setOpenProfile(value));
  },
  checkIsAdmin: () => {
    dispatch(checkIsAdmin());
  },
  getAllDoctorAppointments: () => {
    dispatch(getAllDoctorAppointments());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
