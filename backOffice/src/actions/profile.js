export const SET_PROFILE_PAGE_FIELDS = 'SET_PROFILE_PAGE_FIELDS';
export const SAVE_PROFILE_CHANGE = 'SAVE_PROFILE_CHANGE';
export const SET_OPEN_PROFILE = 'SET_OPEN_PROFILE';

export const setProfilePageFields = (field, value) => ({
  type: SET_PROFILE_PAGE_FIELDS,
  field,
  value,
});

export const saveProfileChange = () => ({
  type: SAVE_PROFILE_CHANGE,
});

export const setOpenProfile = (value) => ({
  type: SET_OPEN_PROFILE,
  value,
});
