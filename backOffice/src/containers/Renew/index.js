import { connect } from 'react-redux';

import { setRenewFields, submitRenewForm } from 'src/actions/renew';

import Renew from 'src/components/Renew';

const mapStateToProps = (state) => ({
  password: state.renew.password,
  errorPassword: state.renew.errorPassword,
  confirmPassword: state.renew.confirmPassword,
  errorConfirmPassword: state.renew.errorConfirmPassword,
  success: state.renew.success,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setRenewFields: (field, value) => {
    dispatch(setRenewFields(field, value));
  },
  submitRenewForm: () => {
    dispatch(submitRenewForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Renew);
