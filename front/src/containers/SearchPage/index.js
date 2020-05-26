import { connect } from 'react-redux';

import { loadDoctorsList } from 'src/actions/searchPage';

import SearchPage from 'src/components/SearchPage';

const mapStateToProps = (state) => ({
  doctors: state.searchPage.doctors,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  loadDoctorsList: () => {
    dispatch(loadDoctorsList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
