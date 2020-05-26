import { connect } from 'react-redux';

import { setHomePageFields, submitNewUserForm } from 'src/actions/homePage';

import NewUserForm from 'src/components/HomePage/HomePageModal/NewUserForm';

const mapStateToProps = (state) => ({
  newFirstname: state.homePage.newFirstname,
  firstnameError: state.homePage.firstnameError,
  newLastname: state.homePage.newLastname,
  lastnameError: state.homePage.lastnameError,
  newEmail: state.homePage.newEmail,
  emailError: state.homePage.emailError,
  newPhone: state.homePage.newPhone,
  phoneError: state.homePage.phoneError,
  newPassword: state.homePage.newPassword,
  passwordError: state.homePage.passwordError,
  newConfirmPassword: state.homePage.newConfirmPassword,
  confirmPasswordError: state.homePage.confirmPasswordError,
});

const mapDispatchToProps = (dispatch) => ({
  setHomePageFields: (fieldName, value) => {
    dispatch(setHomePageFields(fieldName, value));
  },
  submitNewUserForm: () => {
    dispatch(submitNewUserForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUserForm);
