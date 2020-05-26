import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker, TimePicker } from '@material-ui/pickers/';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { DialogContentText } from '@material-ui/core';

const Modal = ({
  newAppointmentStart,
  newAppointmentEnd,
  newAppointmentUser,
  newAppointmentIsHoliday,
  newAppointmentIsDomicile,
  newAppointmentIsRecurent,
  users,
  newUserName,
  setAdminPageFields,
  submitNewAdminAppointment,
  patientError,
  newUserFirstname,
  newUserLastname,
  newUserPhone,
  setNewUserFields,
  submitNewUserFormAdmin,
  open,
  setOpen,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  startRecurenceDay,
  endRecurenceDay,
}) => {
  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAdminPageFields('patientError', false);
    setAdminPageFields('startRecurenceDay', new Date(newAppointmentStart));
    setAdminPageFields('endRecurenceDay', new Date(Date.parse(newAppointmentStart) + 86400000));
  }, []);

  const disabled = !newAppointmentIsHoliday;

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // eslint-disable-next-line no-underscore-dangle
          const testUser = users.find((user) => (user._id === newAppointmentUser._id));
          if (!testUser && !newAppointmentIsHoliday) {
            setAdminPageFields('patientError', true);
          }
          else {
            submitNewAdminAppointment();
          }
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Nouveau Rendez-vous
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={(
              <Checkbox
                disabled={newAppointmentIsHoliday}
                checked={newAppointmentIsDomicile}
                onChange={() => {
                  setAdminPageFields('newAppointmentIsDomicile', !newAppointmentIsDomicile);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Domicile"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={newAppointmentIsHoliday}
                onChange={() => {
                  setAdminPageFields('newAppointmentIsHoliday', !newAppointmentIsHoliday);
                  if (!newAppointmentIsHoliday) {
                    setAdminPageFields('newAppointmentIsDomicile', false);
                  }
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Absence"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={newAppointmentIsRecurent}
                onChange={() => {
                  setAdminPageFields('newAppointmentIsRecurent', !newAppointmentIsRecurent);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Recurent"
          />
        </DialogContent>
        {newAppointmentIsRecurent && (
        <DialogContent>
          <DialogContentText>Tout les :</DialogContentText>
          <FormControlLabel
            control={(
              <Checkbox
                checked={monday}
                onChange={() => {
                  setAdminPageFields('monday', !monday);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Lundi"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={tuesday}
                onChange={() => {
                  setAdminPageFields('tuesday', !tuesday);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Mardi"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={wednesday}
                onChange={() => {
                  setAdminPageFields('wednesday', !wednesday);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Mercredi"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={thursday}
                onChange={() => {
                  setAdminPageFields('thursday', !thursday);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Jeudi"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={friday}
                onChange={() => {
                  setAdminPageFields('friday', !friday);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Vendredi"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={saturday}
                onChange={() => {
                  setAdminPageFields('saturday', !saturday);
                }}
                name="checkedB"
                color="primary"
              />
            )}
            label="Samedi"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={sunday}
                onChange={() => {
                  setAdminPageFields('sunday', !sunday);
                }}
                name="checkedB"
                color="primary"
              />
          )}
            label="Dimanche"
          />
          <DialogContentText>A partir de  la date du :</DialogContentText>
          <DialogContent>
            <DatePicker
              okLabel="Ok"
              cancelLabel="Annuler"
              margin="normal"
              id="date-picker-dialog-end"
              label="Début de la recurence"
              format="dd/MM/yyyy"
              value={startRecurenceDay}
              onChange={(event) => {
                if (new Date(event.ts) > endRecurenceDay) {
                  setAdminPageFields('endRecurenceDay', new Date(event.ts));
                }
                setAdminPageFields('startRecurenceDay', new Date(event.ts));
              }}
            />
          </DialogContent>
          <DialogContentText>jusqu'a la date du :</DialogContentText>
          <DialogContent>
            <DatePicker
              okLabel="Ok"
              cancelLabel="Annuler"
              margin="normal"
              id="date-picker-dialog-end"
              label="Fin de la recurence"
              format="dd/MM/yyyy"
              value={endRecurenceDay}
              onChange={(event) => {
                if (new Date(event.ts) < startRecurenceDay) {
                  setAdminPageFields('startRecurenceDay', new Date(event.ts));
                }
                setAdminPageFields('endRecurenceDay', new Date(event.ts));
              }}
            />
          </DialogContent>
        </DialogContent>
        )}
        <DialogContent>
          Debut
        </DialogContent>
        <DialogContent>
          <DatePicker
            disabled={newAppointmentIsRecurent}
            okLabel="Ok"
            clearLabel="Effacer"
            cancelLabel="Annuler"
            margin="normal"
            id="date-picker-dialog-start"
            label="Jour"
            format="dd/MM/yyyy"
            value={newAppointmentStart}
            onChange={(event) => {
              setAdminPageFields('newAppointmentStart', new Date(event.ts));
              if (disabled) {
                const endTs = Date.parse(newAppointmentEnd);
                const endDate = new Date(endTs);
                endDate.setDate(new Date(event.ts).getDate());
                endDate.setMonth(new Date(event.ts).getMonth());
                endDate.setFullYear(new Date(event.ts).getFullYear());
                setAdminPageFields('newAppointmentEnd', endDate);
              }
              else if (event.ts > newAppointmentEnd) {
                setAdminPageFields('newAppointmentEnd', new Date(event.ts));
              }
            }}
          />
          <TimePicker
            okLabel="Ok"
            clearLabel="Effacer"
            cancelLabel="Annuler"
            margin="normal"
            id="time-picker-start"
            label="debut"
            ampm={false}
            value={newAppointmentStart}
            onChange={(time) => {
              if (time.invalid !== 'Invalid') {
                setAdminPageFields('newAppointmentStart', time);
              }
            }}
          />
        </DialogContent>
        <DialogContent>
          Fin
        </DialogContent>
        <DialogContent>
          <DatePicker
            disabled={disabled || newAppointmentIsRecurent}
            okLabel="Ok"
            clearLabel="Effacer"
            cancelLabel="Annuler"
            margin="normal"
            id="date-picker-dialog-end"
            label="Jour"
            format="dd/MM/yyyy"
            value={newAppointmentEnd}
            onChange={(event) => {
              if (new Date(event.ts) > newAppointmentStart) {
                setAdminPageFields('newAppointmentEnd', new Date(event.ts));
              }
            }}
          />
          <TimePicker
            okLabel="Ok"
            clearLabel="Effacer"
            cancelLabel="Annuler"
            margin="normal"
            id="time-picker-start"
            label="Fin"
            ampm={false}
            value={newAppointmentEnd}
            onChange={(event) => {
              if (new Date(event.ts) > newAppointmentStart) {
                setAdminPageFields('newAppointmentEnd', new Date(event.ts));
              }
            }}
          />
        </DialogContent>
        {!newAppointmentIsHoliday && (
          <>
            <DialogContent>
              Patient
            </DialogContent>
            <DialogContent>
              <Box display="flex" justifyContent="space-between">
                <Autocomplete
                  id="combo-box-demo"
                  inputValue={newUserName}
                  options={users}
                  getOptionLabel={(option) => `${option.lastname.toUpperCase()} ${option.firstname.charAt(0).toUpperCase()}${option.firstname.slice(1)}`}
                  style={{ width: 300 }}
                  onInputChange={(event, value) => {
                    setAdminPageFields('newUserName', value);
                  }}
                  onChange={(event, value) => {
                    setAdminPageFields('newAppointmentUser', value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      error={patientError}
                      {...params}
                      label="patient"
                      variant="outlined"
                    />
                  )}
                />
                <Fab color="primary" aria-label="add" onClick={handleClickOpenModal}>
                  <AddIcon />
                </Fab>
              </Box>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setAdminPageFields('openModal', false);
            }}
            color="primary"
          >
            Annuler
          </Button>
          <Button type="submit" color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </form>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitNewUserFormAdmin();
          }}
        >
          <DialogTitle id="alert-dialog-title">Nouveau Patient</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic-lastname"
              label="Nom"
              variant="outlined"
              value={newUserLastname}
              onChange={(event) => {
                setNewUserFields('lastnameValue', event.target.value);
              }}
            />
            <TextField
              id="outlined-basic-firstname"
              label="Prénom"
              variant="outlined"
              value={newUserFirstname}
              onChange={(event) => {
                setNewUserFields('firstnameValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="outlined-basic-phone"
              label="N° de téléphone"
              variant="outlined"
              value={newUserPhone}
              onChange={(event) => {
                setNewUserFields('phoneValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Retour
            </Button>
            <Button type="submit" onClick={handleCloseModal} color="primary" autoFocus>
              Créer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  newAppointmentStart: PropTypes.object.isRequired,
  newAppointmentEnd: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  newUserName: PropTypes.string.isRequired,
  setAdminPageFields: PropTypes.func.isRequired,
  submitNewAdminAppointment: PropTypes.func.isRequired,
  patientError: PropTypes.bool.isRequired,
  newAppointmentUser: PropTypes.object.isRequired,
  newUserFirstname: PropTypes.string.isRequired,
  newUserLastname: PropTypes.string.isRequired,
  newUserPhone: PropTypes.string.isRequired,
  setNewUserFields: PropTypes.func.isRequired,
  submitNewUserFormAdmin: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  newAppointmentIsHoliday: PropTypes.bool.isRequired,
  newAppointmentIsDomicile: PropTypes.bool.isRequired,
  newAppointmentIsRecurent: PropTypes.bool.isRequired,
  monday: PropTypes.bool.isRequired,
  tuesday: PropTypes.bool.isRequired,
  wednesday: PropTypes.bool.isRequired,
  thursday: PropTypes.bool.isRequired,
  friday: PropTypes.bool.isRequired,
  saturday: PropTypes.bool.isRequired,
  sunday: PropTypes.bool.isRequired,
  startRecurenceDay: PropTypes.object.isRequired,
  endRecurenceDay: PropTypes.object.isRequired,
};

export default Modal;
