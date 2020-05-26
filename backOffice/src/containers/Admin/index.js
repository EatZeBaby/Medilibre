import { connect } from 'react-redux';

import { setAdminPageFields, submitAdminConnectForm } from 'src/actions/admin';

import Admin from 'src/components/Admin';

const mapStateToProps = (state) => ({
  emailValue: state.admin.emailValue,
  errorEmail: state.admin.errorEmail,
  passwordValue: state.admin.passwordValue,
  errorPassword: state.admin.errorPassword,
});

const mapDispatchToProps = (dispatch) => ({
  setAdminPageFields: (field, value) => {
    dispatch(setAdminPageFields(field, value));
  },
  submitAdminConnectForm: () => {
    dispatch(submitAdminConnectForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
