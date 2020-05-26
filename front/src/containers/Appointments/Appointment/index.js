import { connect } from 'react-redux';

import { deleteAppointment } from 'src/actions/appointments';

import Appointment from 'src/components/Appointments/Appointment';

const mapStateToProps = (state) => ({
  appointmentsList: state.appointments.appointmentsList,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  deleteAppointment: (appointmentId) => {
    dispatch(deleteAppointment(appointmentId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointment);
