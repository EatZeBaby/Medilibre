import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Redirect } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import './parameters.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 617,
  },
  dialogContent: {
    maxWidth: 700,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Parameters = ({
  loading,
  duration,
  frequency,
  delay,
  start,
  end,
  setParametersFields,
  submitParameters,
  doctorDatas,
  success,
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  submitNewPassword,
  groupSessions,
  groupSize,
  period,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setParametersFields('success', false);
    if (doctorDatas) {
      setParametersFields('duration', doctorDatas.appointmentDuration);
      setParametersFields('frequency', doctorDatas.appointmentFrequency);
      setParametersFields('delay', doctorDatas.appointmentDelay);
      setParametersFields('start', doctorDatas.startPlanning);
      setParametersFields('end', doctorDatas.endPlanning);
      setParametersFields('groupSessions', doctorDatas.groupSessions);
      setParametersFields('groupSize', doctorDatas.groupSize);
    }
  }, [loading]);

  return (
    <>
      <div className="parameters">
        {success && <Redirect to="/planning" />}
        <div>
          {!loading && (
            <form
              className="parameters-content"
              onSubmit={(event) => {
                event.preventDefault();
                submitParameters();
              }}
            >
              <DialogTitle>
                Modification du mot de passe
              </DialogTitle>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<VpnKeyIcon />}
                style={{
                  alignSelf: 'center',
                }}
                onClick={handleClickOpen}
              >
                Modifier
              </Button>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DialogTitle>
                  Paramètres des séances
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Durée totale d'une séance
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-duration"
                        type="number"
                        value={parseInt(duration, Number)}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('duration', Number(value));
                        }}
                        label="Durée"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Min</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogContentText>
                    Delai minimun entre deux début de séance
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-frequency"
                        type="number"
                        value={parseInt(frequency, Number)}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('frequency', Number(value));
                        }}
                        label="Delai"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Min</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogContentText>
                    Delai minimum entre la prise d'un rendez-vous et le rdv
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-fréquency"
                        type="number"
                        value={parseInt((delay / 60), Number)}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('delay', (value * 60).toString());
                        }}
                        label="Delai"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Heures</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogContentText>
                    Nombre de jours ouvert à la prise de rendez-vous
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-fréquency"
                        type="number"
                        value={period}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('period', value.toString());
                        }}
                        label="Delai"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Jours</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogContentText>
                    Séances de groupe
                  </DialogContentText>
                  <DialogContent>
                    <FormControlLabel
                      labelPlacement="end"
                      control={(
                        <Checkbox
                          checked={groupSessions}
                          onChange={(event) => {
                            setParametersFields('groupSessions', event.target.checked);
                          }}
                          name="4"
                          color="primary"
                        />
                        )}
                      label="Autoriser les séances de groupe"
                    />
                  </DialogContent>
                  {groupSessions && (
                    <DialogContent>
                      <TextField
                        id="outlined-basic-fréquency"
                        type="number"
                        value={groupSize}
                        onChange={(event) => {
                          let value = Number(event.target.value);
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('groupSize', value);
                        }}
                        label="maximum de patients simultanés"
                        variant="outlined"
                      />
                    </DialogContent>
                  )}
                  <DialogTitle>
                    Affichage de l'agenda
                  </DialogTitle>
                  <DialogContentText>
                    Amplitude de l'affichage
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TimePicker
                        okLabel="Ok"
                        clearLabel="Effacer"
                        cancelLabel="Annuler"
                        ampm={false}
                        margin="normal"
                        id="time-picker-start"
                        label="Heure de Debut de journée"
                        value={new Date(start)}
                        onChange={(event) => {
                          setParametersFields('start', event.toString());
                        }}
                      />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TimePicker
                        okLabel="Ok"
                        clearLabel="Effacer"
                        cancelLabel="Annuler"
                        ampm={false}
                        margin="normal"
                        id="time-picker-end"
                        label="Heure de Fin de journée"
                        value={new Date(end)}
                        onChange={(event) => {
                          setParametersFields('end', event.toString());
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                </DialogContent>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: '5rem',
                  }}
                >
                  Enregistrer
                </Button>
              </MuiPickersUtilsProvider>
            </form>
          )}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modification du mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez entrez votre nouveau mot de passe (min 6 caractères)
          </DialogContentText>
          <DialogContent>
            <FormControl variant="outlined" style={{ margin: '1rem' }}>
              <TextField
                error={passwordError}
                id="outlined-basic-password"
                type="password"
                value={password}
                onChange={(event) => {
                  if (event.target.value.length < 6) {
                    setParametersFields('passwordError', true);
                  }
                  else {
                    setParametersFields('passwordError', false);
                  }
                  setParametersFields('password', event.target.value);
                }}
                label="Mot de passe"
                variant="outlined"
              />
            </FormControl>
          </DialogContent>
          <DialogContent>
            <FormControl variant="outlined" style={{ margin: '1rem' }}>
              <TextField
                error={confirmPasswordError}
                id="outlined-basic-confirm"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  if (event.target.value !== password || event.target.length < 6) {
                    setParametersFields('confirmPasswordError', true);
                  }
                  else {
                    setParametersFields('confirmPasswordError', false);
                  }
                  setParametersFields('confirmPassword', event.target.value);
                }}
                label="Confirmation"
                variant="outlined"
              />
            </FormControl>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setParametersFields('passwordError', false);
              setParametersFields('password', '');
              setParametersFields('confirmPasswordError', false);
              setParametersFields('confirmPassword', '');
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              if (confirmPassword !== password || confirmPassword.length < 6) {
                setParametersFields('confirmPasswordError', true);
              }
              else {
                setParametersFields('confirmPasswordError', false);
              }
              if (password.length < 6) {
                setParametersFields('passwordError', true);
              }
              else {
                setParametersFields('passwordError', false);
              }
              if (!passwordError && !confirmPasswordError && password.length >= 6) {
                submitNewPassword();
                handleClose();
              }
            }}
            color="primary"
            variant="contained"
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Parameters.propTypes = {
  loading: PropTypes.bool.isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  frequency: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  setParametersFields: PropTypes.func.isRequired,
  submitParameters: PropTypes.func.isRequired,
  doctorDatas: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  passwordError: PropTypes.bool.isRequired,
  confirmPasswordError: PropTypes.bool.isRequired,
  submitNewPassword: PropTypes.func.isRequired,
  groupSessions: PropTypes.bool.isRequired,
  groupSize: PropTypes.number.isRequired,
  period: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Parameters;
