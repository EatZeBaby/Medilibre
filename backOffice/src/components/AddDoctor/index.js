import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import './addDoctor.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 617,
    width: '95%',
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

const AddDoctor = ({
  civility,
  firstname,
  lastname,
  job,
  email,
  setAddDoctorFields,
  superAdmin,
  addNewDoctor,
}) => {
  const classes = useStyles();
  return (
    <div className="addDoctor">
      <form
        className="addDoctor-content"
        onSubmit={(event) => {
          event.preventDefault();
          addNewDoctor();
        }}
      >
        <DialogTitle>
          Création d'un nouvel Utlisateur
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            labelPlacement="end"
            control={(
              <Checkbox
                checked={superAdmin}
                onChange={(event) => {
                  setAddDoctorFields('superAdmin', event.target.checked);
                }}
                name="1"
                color="primary"
              />
              )}
            label="Super Admin"
          />
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
                  setAddDoctorFields('civility', event.target.value);
                }}
                label="Civilité"
                style={{ maxWidth: 120 }}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value="Mme">Mme</MenuItem>
                <MenuItem value="Mr">Mr</MenuItem>
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
                  setAddDoctorFields('firstname', event.target.value);
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
                  setAddDoctorFields('lastname', event.target.value);
                }}
              />
            </FormControl>

          </DialogContent>
          <DialogContent>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                fullWidth
                type="email"
                id="outlined-basic-city"
                value={email}
                label="Adresse Mail login"
                variant="outlined"
                onChange={(event) => {
                  setAddDoctorFields('email', event.target.value);
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogContent>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                fullWidth
                id="outlined-basic-job"
                value={job}
                label="Profession"
                variant="outlined"
                onChange={(event) => {
                  setAddDoctorFields('job', event.target.value);
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
      </form>
    </div>
  );
};

AddDoctor.propTypes = {
  civility: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setAddDoctorFields: PropTypes.func.isRequired,
  superAdmin: PropTypes.bool.isRequired,
  addNewDoctor: PropTypes.func.isRequired,
};

export default AddDoctor;
