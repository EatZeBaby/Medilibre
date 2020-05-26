import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import PropTypes from 'prop-types';

import './appointment.scss';

const Appointment = ({ appointment, deleteAppointment }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  const start = new Date(appointment.startTime);
  const futur = appointment.startTime > Date.now();
  const info = `${days[start.getDay()]} ${start.getDate()} ${months[start.getMonth()]} à ${(`0${start.getHours()}`).substr(-2)}:${(`0${start.getMinutes()}`).substr(-2)}`;

  const classes = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  return (
    <>
      <div className="appointment">
        <div className="appointment-infos">
          {info}
        </div>
        <div className="appointment-doctor">
          {appointment.doctorName}
        </div>
        <div className="appointment-button">
          {futur && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                handleClickOpen();
              }}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Annulation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous êtes sur le point d'annuler votre rendez-vous du
          </DialogContentText>
          <DialogContentText>
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Retour
          </Button>
          <Button
            onClick={() => {
              handleClose();
              // eslint-disable-next-line no-underscore-dangle
              deleteAppointment(appointment._id);
            }}
            color="secondary"
            autoFocus
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Appointment.propTypes = {
  appointment: PropTypes.object.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

export default Appointment;
