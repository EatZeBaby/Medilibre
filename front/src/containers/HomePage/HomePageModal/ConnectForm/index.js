import { connect } from 'react-redux';

import { setHomePageFields, submitConnectForm } from 'src/actions/homePage';

import ConnectForm from 'src/components/HomePage/HomePageModal/ConnectForm';

const mapStateToProps = (state) => ({
  connectEmailValue: state.homePage.connectEmailValue,
  connectPasswordValue: state.homePage.connectPasswordValue,
  connectErrorEmail: state.homePage.connectErrorEmail,
  connectErrorPassword: state.homePage.connectErrorPassword,
});

const mapDispatchToProps = (dispatch) => ({
  setHomePageFields: (fieldName, value) => {
    dispatch(setHomePageFields(fieldName, value));
  },
  submitConnectForm: () => {
    dispatch(submitConnectForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectForm);
