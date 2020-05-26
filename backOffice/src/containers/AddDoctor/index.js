import { connect } from 'react-redux';

import { setAddDoctorFields, addNewDoctor } from 'src/actions/addDoctor';

import AddDoctor from 'src/components/AddDoctor';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  civility: state.addDoctor.civility,
  firstname: state.addDoctor.firstname,
  lastname: state.addDoctor.lastname,
  job: state.addDoctor.job,
  email: state.addDoctor.email,
  superAdmin: state.addDoctor.superAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  setAddDoctorFields: (field, value) => {
    dispatch(setAddDoctorFields(field, value));
  },
  addNewDoctor: () => {
    dispatch(addNewDoctor());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDoctor);
