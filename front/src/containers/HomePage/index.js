import { connect } from 'react-redux';

import {
  selectAppointment,
  selectCurrentAppointment,
  setHomePageModalShow,
  getFuturAppointments,
  setShowedDays,
} from 'src/actions/homePage';
import { getParameters } from 'src/actions/app';
import {
  setOpenAppointment,
} from 'src/actions/appointments';


import HomePage from 'src/components/HomePage';

const mapStateToProps = (state) => ({
  doctorFirstname: state.main.parameters.firstname,
  doctorLastname: state.main.parameters.lastname,
  doctorCivility: state.main.parameters.civility,
  doctorPresentation: state.main.parameters.presentation,
  doctorJob: state.main.parameters.job,
  showedDays: state.homePage.showedDays,
  loading: state.homePage.homePageLoading,
  homePageModalShow: state.homePage.homePageModalShow,
  isLogged: state.main.isLogged,
  openAppointment: state.appointments.openAppointment,
  doctorAdress: state.main.parameters.adress,
  doctorZip: state.main.parameters.zip,
  doctorCity: state.main.parameters.city,
  doctorPhone: state.main.parameters.phone,
  doctorPublicEmail: state.main.parameters.publicEmail,
  oppeningDays: state.main.parameters.oppeningDays,
  oppeningHours: state.main.parameters.oppeningHours,
  avatar: state.main.parameters.avatar,
  selectedDay: state.homePage.selectedDay,
  onlineAppointment: state.main.parameters.onlineAppointment,
});

const mapDispatchToProps = (dispatch) => ({
  getFuturAppointments: () => {
    dispatch(getFuturAppointments());
  },
  setShowedDays: (days) => {
    dispatch(setShowedDays(days));
  },
  selectAppointment: () => {
    dispatch(selectAppointment());
  },
  selectCurrentAppointment: (startTime) => {
    dispatch(selectCurrentAppointment(startTime));
  },
  setHomePageModalShow: (value) => {
    dispatch(setHomePageModalShow(value));
  },
  setOpenAppointment: (value) => {
    dispatch(setOpenAppointment(value));
  },
  getParameters: () => {
    dispatch(getParameters());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
