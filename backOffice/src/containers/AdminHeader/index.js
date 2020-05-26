import { connect } from 'react-redux';

import { logoutDoctor, SwitchOnlineAppointments } from 'src/actions/doctor';

import AdminHeader from 'src/components/AdminHeader';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  doctorDatas: state.doctor.doctorDatas,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDoctor: () => {
    dispatch(logoutDoctor());
  },
  SwitchOnlineAppointments: (value) => {
    dispatch(SwitchOnlineAppointments(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminHeader);
