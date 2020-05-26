import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import SERVEUR_URL, { CURRENT_SERVEUR_URL } from 'src/config';
import './cabinet.scss';

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

const Cabinet = ({
  civility,
  firstname,
  lastname,
  job,
  adress,
  zip,
  city,
  contactEmail,
  phone,
  presentation,
  changeCabinetFields,
  oppeningDays,
  mondayFull,
  tuesdayFull,
  wednesdayFull,
  thursdayFull,
  fridayFull,
  saturdayFull,
  sundayFull,
  mondayMorningStart,
  mondayMorningEnd,
  mondayAfternoonStart,
  mondayAfternoonEnd,
  tuesdayMorningStart,
  tuesdayMorningEnd,
  tuesdayAfternoonStart,
  tuesdayAfternoonEnd,
  wednesdayMorningStart,
  wednesdayMorningEnd,
  wednesdayAfternoonStart,
  wednesdayAfternoonEnd,
  thursdayMorningStart,
  thursdayMorningEnd,
  thursdayAfternoonStart,
  thursdayAfternoonEnd,
  fridayMorningStart,
  fridayMorningEnd,
  fridayAfternoonStart,
  fridayAfternoonEnd,
  saturdayMorningStart,
  saturdayMorningEnd,
  saturdayAfternoonStart,
  saturdayAfternoonEnd,
  sundayMorningStart,
  sundayMorningEnd,
  sundayAfternoonStart,
  sundayAfternoonEnd,
  saveNewCabinetParameters,
  success,
  loading,
  setDoctorDatas,
  addFlashMessage,
  changeAvatarImage,
  doctorDatas,
  avatarLoading,
}) => {
  const classes = useStyles();
  const [cabinetLoading, setCabinetLoading] = useState(true);

  useEffect(() => {
    const { doctorId } = sessionStorage;
    axios({
      method: 'get',
      url: `${SERVEUR_URL}/doctor/${doctorId}`,
    }).then((info) => {
      setDoctorDatas(info.data);

      changeCabinetFields('succes', false);
      // initialisation des champs avec les valeurs en bdd
      changeCabinetFields('civility', info.data.civility);
      changeCabinetFields('firstname', info.data.firstname);
      changeCabinetFields('lastname', info.data.lastname);
      changeCabinetFields('job', info.data.job);
      changeCabinetFields('adress', info.data.adress);
      changeCabinetFields('zip', info.data.zip);
      changeCabinetFields('city', info.data.city);
      changeCabinetFields('contactEmail', info.data.publicEmail);
      changeCabinetFields('phone', info.data.phone);
      changeCabinetFields('oppeningDays', info.data.oppeningDays);
      changeCabinetFields('presentation', info.data.presentation);
      if (info.data.oppeningHours.length > 0) {
        // chargement des horaires du dimanche
        if (info.data.oppeningHours[0].length < 2) {
          changeCabinetFields('sundayFull', true);
        }
        if (info.data.oppeningHours[0].length === 2) {
          changeCabinetFields('sundayMorningStart', info.data.oppeningHours[0][0][0]);
          changeCabinetFields('sundayMorningEnd', info.data.oppeningHours[0][0][1]);
          changeCabinetFields('sundayAfternoonStart', info.data.oppeningHours[0][1][0]);
          changeCabinetFields('sundayAfternoonEnd', info.data.oppeningHours[0][1][1]);
        }
        else if (info.data.oppeningHours[0].length === 1) {
          changeCabinetFields('sundayMorningStart', info.data.oppeningHours[0][0][0]);
          changeCabinetFields('sundayMorningEnd', info.data.oppeningHours[0][0][1]);
        }
        // chargement des horaires du lundi
        if (info.data.oppeningHours[1].length < 2) {
          changeCabinetFields('mondayFull', true);
        }
        if (info.data.oppeningHours[1].length === 2) {
          changeCabinetFields('mondayMorningStart', info.data.oppeningHours[1][0][0]);
          changeCabinetFields('mondayMorningEnd', info.data.oppeningHours[1][0][1]);
          changeCabinetFields('mondayAfternoonStart', info.data.oppeningHours[1][1][0]);
          changeCabinetFields('mondayAfternoonEnd', info.data.oppeningHours[1][1][1]);
        }
        else if (info.data.oppeningHours[1].length === 1) {
          changeCabinetFields('mondayMorningStart', info.data.oppeningHours[1][0][0]);
          changeCabinetFields('mondayMorningEnd', info.data.oppeningHours[1][0][1]);
        }
        // chargement des horaires du mardi
        if (info.data.oppeningHours[2].length < 2) {
          changeCabinetFields('tuesdayFull', true);
        }
        if (info.data.oppeningHours[2].length === 2) {
          changeCabinetFields('tuesdayMorningStart', info.data.oppeningHours[2][0][0]);
          changeCabinetFields('tuesdayMorningEnd', info.data.oppeningHours[2][0][1]);
          changeCabinetFields('tuesdayAfternoonStart', info.data.oppeningHours[2][1][0]);
          changeCabinetFields('tuesdayAfternoonEnd', info.data.oppeningHours[2][1][1]);
        }
        else if (info.data.oppeningHours[2].length === 1) {
          changeCabinetFields('tuesdayMorningStart', info.data.oppeningHours[2][0][0]);
          changeCabinetFields('tuesdayMorningEnd', info.data.oppeningHours[2][0][1]);
        }
        // chargement des horaires du mercredi
        if (info.data.oppeningHours[3].length < 2) {
          changeCabinetFields('wednesdayFull', true);
        }
        if (info.data.oppeningHours[3].length === 2) {
          changeCabinetFields('wednesdayMorningStart', info.data.oppeningHours[3][0][0]);
          changeCabinetFields('wednesdayMorningEnd', info.data.oppeningHours[3][0][1]);
          changeCabinetFields('wednesdayAfternoonStart', info.data.oppeningHours[3][1][0]);
          changeCabinetFields('wednesdayAfternoonEnd', info.data.oppeningHours[3][1][1]);
        }
        else if (info.data.oppeningHours[3].length === 1) {
          changeCabinetFields('wednesdayMorningStart', info.data.oppeningHours[3][0][0]);
          changeCabinetFields('wednesdayMorningEnd', info.data.oppeningHours[3][0][1]);
        }
        // chargement des horaires du jeudi
        if (info.data.oppeningHours[4].length < 2) {
          changeCabinetFields('thursdayFull', true);
        }
        if (info.data.oppeningHours[4].length === 2) {
          changeCabinetFields('thursdayMorningStart', info.data.oppeningHours[4][0][0]);
          changeCabinetFields('thursdayMorningEnd', info.data.oppeningHours[4][0][1]);
          changeCabinetFields('thursdayAfternoonStart', info.data.oppeningHours[4][1][0]);
          changeCabinetFields('thursdayAfternoonEnd', info.data.oppeningHours[4][1][1]);
        }
        else if (info.data.oppeningHours[4].length === 1) {
          changeCabinetFields('thursdayMorningStart', info.data.oppeningHours[4][0][0]);
          changeCabinetFields('thursdayMorningEnd', info.data.oppeningHours[4][0][1]);
        }
        // chargement des horaires du vendredi
        if (info.data.oppeningHours[5].length < 2) {
          changeCabinetFields('fridayFull', true);
        }
        if (info.data.oppeningHours[5].length === 2) {
          changeCabinetFields('fridayMorningStart', info.data.oppeningHours[5][0][0]);
          changeCabinetFields('fridayMorningEnd', info.data.oppeningHours[5][0][1]);
          changeCabinetFields('fridayAfternoonStart', info.data.oppeningHours[5][1][0]);
          changeCabinetFields('fridayAfternoonEnd', info.data.oppeningHours[5][1][1]);
        }
        else if (info.data.oppeningHours[5].length === 1) {
          changeCabinetFields('fridayMorningStart', info.data.oppeningHours[5][0][0]);
          changeCabinetFields('fridayMorningEnd', info.data.oppeningHours[5][0][1]);
        }
        // chargement des horaires du samedi
        if (info.data.oppeningHours[6].length < 2) {
          changeCabinetFields('saturdayFull', true);
        }
        if (info.data.oppeningHours[6].length === 2) {
          changeCabinetFields('saturdayMorningStart', info.data.oppeningHours[6][0][0]);
          changeCabinetFields('saturdayMorningEnd', info.data.oppeningHours[6][0][1]);
          changeCabinetFields('saturdayAfternoonStart', info.data.oppeningHours[6][1][0]);
          changeCabinetFields('saturdayAfternoonEnd', info.data.oppeningHours[6][1][1]);
        }
        else if (info.data.oppeningHours[6].length === 1) {
          changeCabinetFields('saturdayMorningStart', info.data.oppeningHours[6][0][0]);
          changeCabinetFields('saturdayMorningEnd', info.data.oppeningHours[6][0][1]);
        }
      }
      setCabinetLoading(false);
    });
    return () => {
      changeCabinetFields('success', false);
    };
  }, []);

  const handleChangeRadio = (event) => {
    const newOppenningDays = [...oppeningDays];
    if (event.target.checked) {
      newOppenningDays[event.target.name] = '1';
    }
    else {
      newOppenningDays[event.target.name] = '0';
    }
    changeCabinetFields('oppeningDays', newOppenningDays);
  };

  return (
    <div className="cabinet">
      {success && <Redirect to="/planning" />}
      <form
        className="cabinet-content"
        onSubmit={(event) => {
          event.preventDefault();
          saveNewCabinetParameters();
        }}
      >
        {!loading && !cabinetLoading && (
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DialogTitle>
                Paramètres de gestion du Cabinet
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Mes informations
                </DialogContentText>
                <div className="cabinet-content-avatar">
                  {!avatarLoading && (
                    <img src={`${CURRENT_SERVEUR_URL.substr(0, -6)}${doctorDatas.avatar}?random=${Math.floor(Math.random() * 10000)}`} alt="" className="cabinet-content-avatar-image" />
                  )}
                  {avatarLoading && (
                    <CircularProgress />
                  )}
                </div>
                <DialogContent>
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Changer l'avatar
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(event) => {
                        if (event.target.files[0] !== undefined) {
                          if (event.target.files[0].size > 2000000) {
                            addFlashMessage('fichier trop volumineux, maximum 2mo', 'error');
                          }
                          changeCabinetFields('avatar', event.target.files[0]);
                          changeAvatarImage(event.target.files[0]);
                        }
                      }}
                    />
                  </Button>
                </DialogContent>


                <DialogContent
                  className={classes.dialogContent}
                  style={{
                    textAlign: 'start',
                    marginLeft: '.5rem',
                  }}
                >
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    style={{
                      maxWidth: 120,
                    }}
                  >
                    <InputLabel id="demo-simple-select-outlined-label" style={{ maxWidth: 120 }}>Civilité</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={civility}
                      onChange={(event) => {
                        changeCabinetFields('civility', event.target.value);
                      }}
                      label="Civilité"
                      style={{ maxWidth: 120 }}
                    >
                      <MenuItem value="">
                        <em>-</em>
                      </MenuItem>
                      <MenuItem value="Mme">Mme</MenuItem>
                      <MenuItem value="M.">M.</MenuItem>
                      <MenuItem value="Dr">Dr</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogContent className={classes.dialogContent}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                      id="outlined-basic-firstname"
                      value={firstname}
                      label="Prénom"
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('firstname', event.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                      id="outlined-basic-lastname"
                      value={lastname}
                      label="Nom"
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('lastname', event.target.value);
                      }}
                    />
                  </FormControl>

                </DialogContent>
                <DialogContent>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <TextField
                      fullWidth
                      id="outlined-basic-job"
                      value={job}
                      label="Profession"
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('job', event.target.value);
                      }}
                    />
                  </FormControl>
                </DialogContent>
                <DialogContentText>
                  Mes coordonées
                </DialogContentText>
                <DialogContent>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <TextField
                      fullWidth
                      id="outlined-basic-adress"
                      value={adress}
                      label="Adresse"
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('adress', event.target.value);
                      }}
                    />
                  </FormControl>
                </DialogContent>
                <DialogContent>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                      id="outlined-basic-cp"
                      value={zip}
                      label="Code postal"
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('zip', event.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                      id="outlined-basic-city"
                      label="Ville"
                      value={city}
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('city', event.target.value);
                      }}
                    />
                  </FormControl>
                </DialogContent>
                <DialogContent>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                      type="email"
                      id="outlined-basic-city"
                      value={contactEmail}
                      label="Adresse Mail publique"
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('contactEmail', event.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                      id="outlined-basic-city"
                      label="N° de téléphone"
                      value={phone}
                      variant="outlined"
                      onChange={(event) => {
                        changeCabinetFields('phone', event.target.value);
                      }}
                    />
                  </FormControl>
                </DialogContent>
                <DialogContentText>
                  Présentation du cabinet
                </DialogContentText>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic-city"
                    label="Présentation du cabinet"
                    value={presentation}
                    variant="outlined"
                    onChange={(event) => {
                      changeCabinetFields('presentation', event.target.value);
                    }}
                    multiline
                    fullWidth
                  />
                </FormControl>
                <DialogContentText>
                  Jours d'ouverture
                </DialogContentText>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup row>
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[1], 10))} onChange={handleChangeRadio} name="1" color="primary" />}
                      label="Lundi"
                    />
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[2], 10))} onChange={handleChangeRadio} name="2" color="primary" />}
                      label="Mardi"
                    />
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[3], 10))} onChange={handleChangeRadio} name="3" color="primary" />}
                      label="Mercredi"
                    />
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[4], 10))} onChange={handleChangeRadio} name="4" color="primary" />}
                      label="Jeudi"
                    />
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[5], 10))} onChange={handleChangeRadio} name="5" color="primary" />}
                      label="Vendredi"
                    />
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[6], 10))} onChange={handleChangeRadio} name="6" color="primary" />}
                      label="Samedi"
                    />
                    <FormControlLabel
                      labelPlacement="top"
                      control={<Checkbox checked={Boolean(Number(oppeningDays[0], 10))} onChange={handleChangeRadio} name="0" color="primary" />}
                      label="Dimanche"
                    />
                  </FormGroup>
                </FormControl>
                <DialogContentText>
                  Horaires d'ouverture
                </DialogContentText>
                <DialogContent className={classes.dialogContent}>
                  {((oppeningDays[1] === '1') || (oppeningDays[1] === 1)) && (
                    <>
                      <DialogContentText style={{ textAlign: 'left' }}>
                        Lundi
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={mondayFull}
                                onChange={(event) => {
                                  changeCabinetFields('mondayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                            )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${mondayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${mondayMorningEnd}`)) {
                              newTime = mondayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('mondayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${mondayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${mondayMorningStart}`)) {
                              newTime = mondayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${mondayAfternoonStart}`)) {
                              newTime = mondayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('mondayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!mondayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="début"
                              value={new Date(`2020/01/01 ${mondayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${mondayMorningEnd}`)) {
                                  newTime = mondayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${mondayAfternoonEnd}`)) {
                                  newTime = mondayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('mondayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${mondayAfternoonStart}`)) {
                                  newTime = mondayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('mondayAfternoonEnd', newTime);
                              }}
                              value={new Date(`2020/01/01 ${mondayAfternoonEnd}`)}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                  {((oppeningDays[2] === '1') || (oppeningDays[2] === 1)) && (
                    <>
                      <DialogContentText style={{ textAlign: 'left' }}>
                        Mardi
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={tuesdayFull}
                                onChange={(event) => {
                                  changeCabinetFields('tuesdayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                            )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${tuesdayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${tuesdayMorningEnd}`)) {
                              newTime = tuesdayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('tuesdayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${tuesdayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${tuesdayMorningStart}`)) {
                              newTime = tuesdayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${tuesdayAfternoonStart}`)) {
                              newTime = tuesdayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('tuesdayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!tuesdayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="debut"
                              value={new Date(`2020/01/01 ${tuesdayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${tuesdayMorningEnd}`)) {
                                  newTime = tuesdayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${tuesdayAfternoonEnd}`)) {
                                  newTime = tuesdayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('tuesdayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              value={new Date(`2020/01/01 ${tuesdayAfternoonEnd}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${tuesdayAfternoonStart}`)) {
                                  newTime = tuesdayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('tuesdayAfternoonEnd', newTime);
                              }}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                  {((oppeningDays[3] === '1') || (oppeningDays[3] === 1)) && (
                    <>

                      <DialogContentText style={{ textAlign: 'left' }}>
                        Mercredi
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={wednesdayFull}
                                onChange={(event) => {
                                  changeCabinetFields('wednesdayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                              )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${wednesdayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${wednesdayMorningEnd}`)) {
                              newTime = wednesdayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('wednesdayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${wednesdayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${wednesdayMorningStart}`)) {
                              newTime = wednesdayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${wednesdayAfternoonStart}`)) {
                              newTime = wednesdayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('wednesdayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!wednesdayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="debut"
                              value={new Date(`2020/01/01 ${wednesdayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${wednesdayMorningEnd}`)) {
                                  newTime = wednesdayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${wednesdayAfternoonEnd}`)) {
                                  newTime = wednesdayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('wednesdayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              value={new Date(`2020/01/01 ${wednesdayAfternoonEnd}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${wednesdayAfternoonStart}`)) {
                                  newTime = wednesdayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('wednesdayAfternoonEnd', newTime);
                              }}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                  {((oppeningDays[4] === '1') || (oppeningDays[4] === 1)) && (
                    <>
                      <DialogContentText style={{ textAlign: 'left' }}>
                        Jeudi
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={thursdayFull}
                                onChange={(event) => {
                                  changeCabinetFields('thursdayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                              )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${thursdayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${thursdayMorningEnd}`)) {
                              newTime = thursdayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('thursdayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${thursdayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${thursdayMorningStart}`)) {
                              newTime = thursdayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${thursdayAfternoonStart}`)) {
                              newTime = thursdayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('thursdayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!thursdayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="debut"
                              value={new Date(`2020/01/01 ${thursdayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${thursdayMorningEnd}`)) {
                                  newTime = thursdayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${thursdayAfternoonEnd}`)) {
                                  newTime = thursdayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('thursdayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              value={new Date(`2020/01/01 ${thursdayAfternoonEnd}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${thursdayAfternoonStart}`)) {
                                  newTime = thursdayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('thursdayAfternoonEnd', newTime);
                              }}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                  {((oppeningDays[5] === '1') || (oppeningDays[5] === 1)) && (
                    <>
                      <DialogContentText style={{ textAlign: 'left' }}>
                        Vendredi
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={fridayFull}
                                onChange={(event) => {
                                  changeCabinetFields('fridayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                              )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${fridayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${fridayMorningEnd}`)) {
                              newTime = fridayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('fridayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${fridayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${fridayMorningStart}`)) {
                              newTime = fridayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${fridayAfternoonStart}`)) {
                              newTime = fridayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('fridayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!fridayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="debut"
                              value={new Date(`2020/01/01 ${fridayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${fridayMorningEnd}`)) {
                                  newTime = fridayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${fridayAfternoonEnd}`)) {
                                  newTime = fridayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('fridayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              value={new Date(`2020/01/01 ${fridayAfternoonEnd}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${fridayAfternoonStart}`)) {
                                  newTime = fridayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('fridayAfternoonEnd', newTime);
                              }}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                  {((oppeningDays[6] === '1') || (oppeningDays[6] === 1)) && (
                    <>
                      <DialogContentText style={{ textAlign: 'left' }}>
                        Samedi
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={saturdayFull}
                                onChange={(event) => {
                                  changeCabinetFields('saturdayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                              )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${saturdayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${saturdayMorningEnd}`)) {
                              newTime = saturdayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('saturdayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${saturdayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${saturdayMorningStart}`)) {
                              newTime = saturdayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${saturdayAfternoonStart}`)) {
                              newTime = saturdayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('saturdayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!saturdayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="debut"
                              value={new Date(`2020/01/01 ${saturdayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${saturdayMorningEnd}`)) {
                                  newTime = saturdayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${saturdayAfternoonEnd}`)) {
                                  newTime = saturdayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('saturdayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              value={new Date(`2020/01/01 ${saturdayAfternoonEnd}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${saturdayAfternoonStart}`)) {
                                  newTime = saturdayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('saturdayAfternoonEnd', newTime);
                              }}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                  {((oppeningDays[0] === '1') || (oppeningDays[0] === 1)) && (
                    <>
                      <DialogContentText style={{ textAlign: 'left' }}>
                        Dimanche
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent} style={{ textAlign: 'left' }}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ textAlign: 'left' }}>
                          <FormControlLabel
                            style={{ textAlign: 'left' }}
                            labelPlacement="end"
                            control={(
                              <Checkbox
                                checked={sundayFull}
                                onChange={(event) => {
                                  changeCabinetFields('sundayFull', event.target.checked);
                                }}
                                name="monday-fullDay"
                                color="primary"
                              />
                              )}
                            label="Journée Continue"
                          />
                        </FormControl>
                      </DialogContent>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <TimePicker
                          okLabel="Ok"
                          clearLabel="Effacer"
                          cancelLabel="Annuler"
                          ampm={false}
                          margin="normal"
                          id="time-picker"
                          label="debut"
                          value={new Date(`2020/01/01 ${sundayMorningStart}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event > new Date(`2020/01/01 ${sundayMorningEnd}`)) {
                              newTime = sundayMorningEnd;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('sundayMorningStart', newTime);
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
                          id="time-picker"
                          label="fin"
                          value={new Date(`2020/01/01 ${sundayMorningEnd}`)}
                          onChange={(event) => {
                            let newTime;
                            if (event < new Date(`2020/01/01 ${sundayMorningStart}`)) {
                              newTime = sundayMorningStart;
                            }
                            else if (event > new Date(`2020/01/01 ${sundayAfternoonStart}`)) {
                              newTime = sundayAfternoonStart;
                            }
                            else {
                              newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                            }
                            changeCabinetFields('sundayMorningEnd', newTime);
                          }}
                        />
                      </FormControl>
                      {!sundayFull && (
                        <>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TimePicker
                              okLabel="Ok"
                              clearLabel="Effacer"
                              cancelLabel="Annuler"
                              ampm={false}
                              margin="normal"
                              id="time-picker"
                              label="debut"
                              value={new Date(`2020/01/01 ${sundayAfternoonStart}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${sundayMorningEnd}`)) {
                                  newTime = sundayMorningEnd;
                                }
                                else if (event > new Date(`2020/01/01 ${sundayAfternoonEnd}`)) {
                                  newTime = sundayAfternoonEnd;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('sundayAfternoonStart', newTime);
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
                              id="time-picker"
                              label="fin"
                              value={new Date(`2020/01/01 ${sundayAfternoonEnd}`)}
                              onChange={(event) => {
                                let newTime;
                                if (event < new Date(`2020/01/01 ${sundayAfternoonStart}`)) {
                                  newTime = sundayAfternoonStart;
                                }
                                else {
                                  newTime = `${(`0${event.getHours()}`).substr(-2)}:${(`0${event.getMinutes()}`).substr(-2)}`;
                                }
                                changeCabinetFields('sundayAfternoonEnd', newTime);
                              }}
                            />
                          </FormControl>
                        </>
                      )}
                    </>
                  )}
                </DialogContent>
              </DialogContent>
            </MuiPickersUtilsProvider>
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
          </>
        )}
      </form>
    </div>
  );
};

Cabinet.propTypes = {
  civility: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  presentation: PropTypes.string.isRequired,
  changeCabinetFields: PropTypes.func.isRequired,
  oppeningDays: PropTypes.array.isRequired,
  mondayFull: PropTypes.bool.isRequired,
  tuesdayFull: PropTypes.bool.isRequired,
  wednesdayFull: PropTypes.bool.isRequired,
  thursdayFull: PropTypes.bool.isRequired,
  fridayFull: PropTypes.bool.isRequired,
  saturdayFull: PropTypes.bool.isRequired,
  sundayFull: PropTypes.bool.isRequired,
  mondayMorningStart: PropTypes.string.isRequired,
  mondayMorningEnd: PropTypes.string.isRequired,
  mondayAfternoonStart: PropTypes.string.isRequired,
  mondayAfternoonEnd: PropTypes.string.isRequired,
  tuesdayMorningStart: PropTypes.string.isRequired,
  tuesdayMorningEnd: PropTypes.string.isRequired,
  tuesdayAfternoonStart: PropTypes.string.isRequired,
  tuesdayAfternoonEnd: PropTypes.string.isRequired,
  wednesdayMorningStart: PropTypes.string.isRequired,
  wednesdayMorningEnd: PropTypes.string.isRequired,
  wednesdayAfternoonStart: PropTypes.string.isRequired,
  wednesdayAfternoonEnd: PropTypes.string.isRequired,
  thursdayMorningStart: PropTypes.string.isRequired,
  thursdayMorningEnd: PropTypes.string.isRequired,
  thursdayAfternoonStart: PropTypes.string.isRequired,
  thursdayAfternoonEnd: PropTypes.string.isRequired,
  fridayMorningStart: PropTypes.string.isRequired,
  fridayMorningEnd: PropTypes.string.isRequired,
  fridayAfternoonStart: PropTypes.string.isRequired,
  fridayAfternoonEnd: PropTypes.string.isRequired,
  saturdayMorningStart: PropTypes.string.isRequired,
  saturdayMorningEnd: PropTypes.string.isRequired,
  saturdayAfternoonStart: PropTypes.string.isRequired,
  saturdayAfternoonEnd: PropTypes.string.isRequired,
  sundayMorningStart: PropTypes.string.isRequired,
  sundayMorningEnd: PropTypes.string.isRequired,
  sundayAfternoonStart: PropTypes.string.isRequired,
  sundayAfternoonEnd: PropTypes.string.isRequired,
  saveNewCabinetParameters: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setDoctorDatas: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  changeAvatarImage: PropTypes.func.isRequired,
  doctorDatas: PropTypes.object.isRequired,
  avatarLoading: PropTypes.bool.isRequired,
};

export default Cabinet;
