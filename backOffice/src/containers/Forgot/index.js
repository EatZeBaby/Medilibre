import { connect } from 'react-redux';

import { setForgotEmail, submitForgotForm } from 'src/actions/forgot';

import Forgot from 'src/components/Forgot';

const mapStateToProps = (state) => ({
  email: state.forgot.email,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setForgotEmail: (email) => {
    dispatch(setForgotEmail(email));
  },
  submitForgotForm: () => {
    dispatch(submitForgotForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forgot);
