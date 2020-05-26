import { connect } from 'react-redux';

import {
  setProfilePageFields,
  saveProfileChange,
  setOpenProfile,
  saveNewPassword,
} from 'src/actions/profile';

import Profile from 'src/components/Profile';

const mapStateToProps = (state) => ({
  firstnameValue: state.profile.firstnameValue,
  errorFirstname: state.profile.errorFirstname,
  lastnameValue: state.profile.lastnameValue,
  errorLastname: state.profile.errorLastname,
  phoneValue: state.profile.phoneValue,
  errorPhone: state.profile.errorPhone,
  emailValue: state.profile.emailValue,
  errorEmail: state.profile.errorEmail,
  userDatas: state.user.userDatas,
  password: state.profile.password,
  confirmPassword: state.profile.confirmPassword,
  errorPassword: state.profile.errorPassword,
  errorConfirmPassword: state.profile.errorConfirmPassword,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setProfilePageFields: (field, value) => {
    dispatch(setProfilePageFields(field, value));
  },
  saveProfileChange: () => {
    dispatch(saveProfileChange());
  },
  setOpenProfile: (value) => {
    dispatch(setOpenProfile(value));
  },
  saveNewPassword: () => {
    dispatch(saveNewPassword());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
