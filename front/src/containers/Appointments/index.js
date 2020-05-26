import { connect } from 'react-redux';

import { getUserAppointments, setOpenHistoric } from 'src/actions/appointments';

import Appointments from 'src/components/Appointments';

const mapStateToProps = (state) => ({
  appointmentsList: state.appointments.appointmentsList,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  getUserAppointments: () => {
    dispatch(getUserAppointments());
  },
  setOpenHistoric: (value) => {
    dispatch(setOpenHistoric(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointments);
