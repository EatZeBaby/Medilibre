import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

import './forgot.scss';

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

const Forgot = ({
  email,
  setForgotEmail,
  submitForgotForm,
}) => {
  const classes = useStyles();
  return (
    <div className="forgot">
      <form
        className="forgot-content"
        onSubmit={(event) => {
          event.preventDefault();
          submitForgotForm();
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
          Identifiant(s) oublié(s) ?
        </DialogTitle>
        <DialogContentText>
          Remplissez le formulaire ci-dessous et nous vous enverrons
          par mail les informations nécessaires pour accéder à votre compte
        </DialogContentText>
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
          <TextField
            type="email"
            id="outlined-basic-firstname"
            value={email}
            onChange={(event) => {
              setForgotEmail(event.target.value);
            }}
            label="Votre adresse Email de connexion"
            variant="outlined"
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
          Envoyer
        </Button>
      </form>
    </div>
  );
};

Forgot.propTypes = {
  email: PropTypes.string.isRequired,
  setForgotEmail: PropTypes.func.isRequired,
  submitForgotForm: PropTypes.func.isRequired,
};

export default Forgot;
