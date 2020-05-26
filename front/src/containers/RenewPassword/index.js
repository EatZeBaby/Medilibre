import { connect } from 'react-redux';

import { setRenewPasswordFields, submitRenewPasswordForm } from 'src/actions/renewPassword';

import RenewPassword from 'src/components/RenewPassword';

const mapStateToProps = (state) => ({
  password: state.renewPassword.password,
  confirmPassword: state.renewPassword.confirmPassword,
  errorPassword: state.renewPassword.errorPassword,
  errorConfirmPassword: state.renewPassword.errorPassword,
  success: state.renewPassword.success,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setRenewPasswordFields: (field, value) => {
    dispatch(setRenewPasswordFields(field, value));
  },
  submitRenewPasswordForm: () => {
    dispatch(submitRenewPasswordForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenewPassword);
