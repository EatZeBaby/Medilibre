import { connect } from 'react-redux';

import { setOpenRenew, setRenewFields, submitRenewForm } from 'src/actions/renew';

import Renew from 'src/components/Renew';

const mapStateToProps = (state) => ({
  openRenew: state.renew.openRenew,
  email: state.renew.email,
  errorEmail: state.renew.errorEmail,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setOpenRenew: (value) => {
    dispatch(setOpenRenew(value));
  },
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
