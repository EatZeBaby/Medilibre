import { SET_SEARCH_PAGE_FIELDS } from 'src/actions/searchPage';

const initialState = {
  doctors: [],
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default mainReducer;
