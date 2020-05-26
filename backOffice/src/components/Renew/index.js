import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link, Redirect } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import './renew.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Renew = ({
  password,
  confirmPassword,
  setRenewFields,
  errorPassword,
  errorConfirmPassword,
  submitRenewForm,
  success,
}) => {
  const classes = useStyles();
  const { token } = useParams();

  useEffect(() => {
    setRenewFields('success', false);
    setRenewFields('renewToken', token);
  }, []);

  return (
    <div className="renew">
      {success && <Redirect to="/" />}
      <form
        className="renew-content"
        onSubmit={(event) => {
          event.preventDefault();
          if (password.length < 6) {
            setRenewFields('errorPassword', true);
          }
          else if (confirmPassword.length < 6 || confirmPassword !== password) {
            setRenewFields('errorConfirmPassword', true);
          }
          else {
            submitRenewForm();
          }
        }}
      >
        <Link
          to="/"
          className={classes.button}
          style={{
            alignSelf: 'flex-start',
            marginRight: '5rem',
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            retour
          </Button>
        </Link>
        <DialogTitle>
          Réinitialisation du mot de passe
        </DialogTitle>
        <DialogContentText>
          Réinitialisez votre mot de passe en
          complétant le formulaire ci dessous (min 6 ccaractères):
        </DialogContentText>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            error={errorPassword}
            type="password"
            id="outlined-basic-password"
            label="Nouveau mot de passe"
            variant="outlined"
            value={password}
            onChange={(event) => {
              if (event.target.value.length < 6) {
                setRenewFields('errorPassword', true);
              }
              else {
                setRenewFields('errorPassword', false);
              }
              setRenewFields('password', event.target.value);
            }}
            required
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            error={errorConfirmPassword}
            type="password"
            id="outlined-basic-confirmPassword"
            label="Confirmation"
            variant="outlined"
            value={confirmPassword}
            onChange={(event) => {
              if (event.target.value.length < 6 || event.target.value !== password) {
                setRenewFields('errorConfirmPassword', true);
              }
              else {
                setRenewFields('errorConfirmPassword', false);
              }
              setRenewFields('confirmPassword', event.target.value);
            }}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          style={{
            alignSelf: 'flex-end',
            marginTop: '1rem',
          }}
        >
          Réinitialiser
        </Button>
      </form>
    </div>
  );
};

Renew.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setRenewFields: PropTypes.func.isRequired,
  errorPassword: PropTypes.bool.isRequired,
  errorConfirmPassword: PropTypes.bool.isRequired,
  submitRenewForm: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Renew;
