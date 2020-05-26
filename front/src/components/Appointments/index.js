/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

import './appointments.scss';

import Appointment from 'src/containers/Appointments/Appointment';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Appointments = ({ appointmentsList, getUserAppointments, setOpenHistoric }) => {
  useEffect(() => {
    getUserAppointments();
  }, []);

  const classes = useStyles();

  return (
    <div className="appointments">
      <AppBar
        className={classes.appBar}
        style={{
          backgroundColor: '#242a65',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpenHistoric(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Mes rendez-vous
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="appointments-content">
        <DialogContent>
          <DialogTitle id="form-dialog-title">
            historique de mes rendez-vous
          </DialogTitle>
        </DialogContent>
        <DialogContent>
          <div className="appointment">
            <div className="appointment-infos">
              Date
            </div>
            <div className="appointment-doctor">
              professionel
            </div>
            <div className="appointment-button">
              -
            </div>
          </div>
        </DialogContent>

        {appointmentsList.map((appointment) => (
          <DialogContent key={appointment._id}>
            <Appointment appointment={appointment} />
          </DialogContent>
        ))}
      </div>
    </div>
  );
};

Appointments.propTypes = {
  appointmentsList: PropTypes.array.isRequired,
  getUserAppointments: PropTypes.func.isRequired,
  setOpenHistoric: PropTypes.func.isRequired,
};

export default Appointments;
