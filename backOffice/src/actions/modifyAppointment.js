export const DELETE_SELECTED_APPOINTMENT = 'DELETE_SELECTED_APPOINTMENT';
export const MODIFY_SELECTED_APPOINTMENT = 'MODIFY_SELECTED_APPOINTMENT';

export const deleteSelectedAppointment = (id) => ({
  type: DELETE_SELECTED_APPOINTMENT,
  id,
});

export const modifySelectedAppointment = () => ({
  type: MODIFY_SELECTED_APPOINTMENT,
});
