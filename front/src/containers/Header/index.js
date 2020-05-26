import { connect } from 'react-redux';

import { logoutUser } from 'src/actions/app';

import { setOpenConnect } from 'src/actions/connect';
import { setOpenAppointment, setOpenHistoric } from 'src/actions/appointments';
import { setOpenSuscribe } from 'src/actions/suscribe';
import { setOpenProfile } from 'src/actions/profile';

import Header from 'src/components/Header';

const mapStateToProps = (state) => ({
  isLogged: state.main.isLogged,
  userDatas: state.user.userDatas,
  doctorFirstname: state.main.parameters.firstname,
  doctorLastname: state.main.parameters.lastname,
  doctorJob: state.main.parameters.job,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => {
    dispatch(logoutUser());
  },
  setOpenConnect: (value) => {
    dispatch(setOpenConnect(value));
  },
  setOpenAppointment: (value) => {
    dispatch(setOpenAppointment(value));
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
