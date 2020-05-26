import { connect } from 'react-redux';

import { setAdminPageFields } from 'src/actions/admin';
import { deleteSelectedAppointment, modifySelectedAppointment } from 'src/actions/modifyAppointment';

import ModifyModal from 'src/components/Planning/ModifyModal';


// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  selectedEvent: state.admin.selectedEvent,
  modifiedAppointmentStart: state.admin.modifiedAppointmentStart,
  modifiedAppointmentEnd: state.admin.modifiedAppointmentEnd,
  modifiedAppointmentUserId: state.admin.modifiedAppointmentUserId,
  modifiedAppointmentId: state.admin.modifiedAppointmentId,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setAdminPageFields: (field, value) => {
    dispatch(setAdminPageFields(field, value));
  },
  deleteSelectedAppointment: (id) => {
    dispatch(deleteSelectedAppointment(id));
  },
  modifySelectedAppointment: () => {
    dispatch(modifySelectedAppointment());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyModal);
