import { connect } from 'react-redux';

import { setParametersFields, submitParameters, submitNewPassword } from 'src/actions/parameters';

import Parameters from 'src/components/Parameters';

const mapStateToProps = (state) => ({
  loading: state.main.loading,
  duration: state.parameters.duration,
  frequency: state.parameters.frequency,
  delay: state.parameters.delay,
  start: state.parameters.start,
  end: state.parameters.end,
  doctorDatas: state.doctor.doctorDatas,
  success: state.parameters.success,
  password: state.parameters.password,
  passwordError: state.parameters.passwordError,
  confirmPassword: state.parameters.confirmPassword,
  confirmPasswordError: state.parameters.confirmPasswordError,
  groupSessions: state.parameters.groupSessions,
  groupSize: state.parameters.groupSize,
  period: state.parameters.period,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setParametersFields: (field, value) => {
    dispatch(setParametersFields(field, value));
  },
  submitParameters: () => {
    dispatch(submitParameters());
  },
  submitNewPassword: () => {
    dispatch(submitNewPassword());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Parameters);
