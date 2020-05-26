import { connect } from 'react-redux';

import { modifySelectedAppointment } from 'src/actions/modifyAppointment';
import { getAllDoctorAppointments, setAdminPageFields } from 'src/actions/admin';

import Planning from 'src/components/Planning';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  appointments: state.admin.appointments,
  doctorDatas: state.doctor.doctorDatas,
  openModal: state.admin.openModal,
  openModifyModal: state.admin.openModifyModal,
  loading: state.main.loading,
  startPlanning: state.parameters.start,
  endPlanning: state.parameters.end,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  getAllDoctorAppointments: () => {
    dispatch(getAllDoctorAppointments());
  },
  setAdminPageFields: (field, value) => {
    dispatch(setAdminPageFields(field, value));
  },
  modifySelectedAppointment: () => {
    dispatch(modifySelectedAppointment());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planning);
