import { connect } from 'react-redux';

import { setSuscribePageFields, submitSuscribePageForm, setOpenSuscribe } from 'src/actions/suscribe';
import { setOpenConnect } from 'src/actions/connect';

import Suscribe from 'src/components/Suscribe';

const mapStateToProps = (state) => ({
  firstnameValue: state.suscribe.firstnameValue,
  firstnameError: state.suscribe.firstnameError,
  lastnameValue: state.suscribe.lastnameValue,
  lastnameError: state.suscribe.lastnameError,
  phoneValue: state.suscribe.phoneValue,
  phoneError: state.suscribe.phoneError,
  emailValue: state.suscribe.emailValue,
  emailError: state.suscribe.emailError,
  passwordValue: state.suscribe.passwordValue,
  passwordError: state.suscribe.passwordError,
  confirmPasswordValue: state.suscribe.confirmPasswordValue,
  confirmPasswordError: state.suscribe.confirmPasswordError,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setSuscribePageFields: (field, value) => {
    dispatch(setSuscribePageFields(field, value));
  },
  submitSuscribePageForm: () => {
    dispatch(submitSuscribePageForm());
  },
  setOpenSuscribe: (value) => {
    dispatch(setOpenSuscribe(value));
  },
  setOpenConnect: (value) => {
    dispatch(setOpenConnect(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suscribe);
