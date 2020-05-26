import { connect } from 'react-redux';

import {
  addUser,
  deleteUser,
  updateUser,
  setTableState,
} from 'src/actions/patients';

import Patients from 'src/components/Patients';

const mapStateToProps = (state) => ({
  users: state.admin.users,
  tableState: state.patients.tableState,
  loading: state.main.loading,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => {
    dispatch(addUser(user));
  },
  deleteUser: (userId) => {
    dispatch(deleteUser(userId));
  },
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
  setTableState: (newTableState) => {
    dispatch(setTableState(newTableState));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Patients);
