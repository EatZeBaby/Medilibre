import { SET_TABLE_STATE } from 'src/actions/patients';

const initialState = {
  tableState: {
    columns: [
      { title: 'Nom', field: 'lastname' },
      { title: 'Prénom', field: 'firstname' },
      { title: 'N° de téléphone', field: 'phone' },
      { title: 'email', field: 'email', editable: 'never' },
    ],
    data: [],
  },
};

const newUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TABLE_STATE:
      return {
        ...state,
        tableState: action.newTableState,
      };
    default:
      return state;
  }
};

export default newUserReducer;
