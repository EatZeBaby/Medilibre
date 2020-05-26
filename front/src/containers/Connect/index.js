import { connect } from 'react-redux';

import { setConnectPageFields, submitConnectPageForm, setOpenConnect } from 'src/actions/connect';
import { setOpenSuscribe } from 'src/actions/suscribe';
import { setOpenRenew } from 'src/actions/renew';

import Connect from 'src/components/Connect';

const mapStateToProps = (state) => ({
  emailValue: state.connect.emailValue,
  passwordValue: state.connect.passwordValue,
  errorEmail: state.connect.errorEmail,
  errorPassword: state.connect.errorPassword,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setConnectPageFields: (field, value) => {
    dispatch(setConnectPageFields(field, value));
  },
  submitConnectPageForm: () => {
    dispatch(submitConnectPageForm());
  },
  setOpenConnect: (value) => {
    dispatch(setOpenConnect(value));
  },
  setOpenSuscribe: (value) => {
    dispatch(setOpenSuscribe(value));
  },
  setOpenRenew: (value) => {
    dispatch(setOpenRenew(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Connect);
