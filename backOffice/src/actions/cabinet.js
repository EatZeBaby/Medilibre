export const CHANGE_CABINET_FIELDS = 'CHANGE_CABINET_FIELDS';
export const SAVE_NEW_CABINET_PARAMETERS = 'SAVE_NEW_CABINET_PARAMETERS';
export const CHANGE_AVATAR_IMAGE = 'CHANGE_AVATAR_IMAGE';

export const changeCabinetFields = (field, value) => ({
  type: CHANGE_CABINET_FIELDS,
  field,
  value,
});

export const saveNewCabinetParameters = () => ({
  type: SAVE_NEW_CABINET_PARAMETERS,
});

export const changeAvatarImage = (avatar) => ({
  type: CHANGE_AVATAR_IMAGE,
  avatar,
});
