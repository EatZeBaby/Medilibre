import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';

import './connect.scss';

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

const Connect = ({
  emailValue,
  passwordValue,
  setConnectPageFields,
  submitConnectPageForm,
  setOpenConnect,
  setOpenSuscribe,
  errorEmail,
  errorPassword,
  setOpenRenew,
}) => {
  const classes = useStyles();

  return (
    <div className="connect">
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
              setOpenConnect(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Connexion
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="connect-content">
        <DialogContent>
          <DialogTitle id="form-dialog-title">Connexion à votre compte</DialogTitle>
          <Button
            color="primary"
            onClick={() => {
              setOpenConnect(false);
              setOpenSuscribe(true);
            }}
          >
            Pas encore inscrit? Creer un compte
          </Button>
        </DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!errorEmail && !errorPassword && emailValue.length > 0
              && passwordValue.length > 0) {
              submitConnectPageForm();
            }
            setConnectPageFields('errorPassword', false);
            setConnectPageFields('errorEmail', false);
            if (passwordValue.length < 1) {
              setConnectPageFields('errorPassword', true);
            }
            if (emailValue.length < 1) {
              setConnectPageFields('errorEmail', true);
            }
          }}
        >
          <DialogContent>
            <TextField
              error={errorEmail}
              id="email"
              type="email"
              label="adresse mail"
              variant="outlined"
              value={emailValue}
              onChange={(event) => {
                setConnectPageFields('errorEmail', false);
                const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!mailRegEx.test(event.target.value)) {
                  setConnectPageFields('errorEmail', true);
                }
                setConnectPageFields('emailValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={errorPassword}
              id="password"
              type="password"
              label="mot de passe"
              variant="outlined"
              value={passwordValue}
              onChange={(event) => {
                setConnectPageFields('errorPassword', false);
                if (event.target.value.length < 1) {
                  setConnectPageFields('errorPassword', true);
                }
                setConnectPageFields('passwordValue', event.target.value);
              }}
            />
          </DialogContent>
          <Button
            color="primary"
            onClick={() => {
              setOpenConnect(false);
              setOpenRenew(true);
            }}
          >
            Mot de passe oublié
          </Button>
          <DialogContent>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Connexion
            </Button>
          </DialogContent>
        </form>
      </div>
    </div>
  );
};

Connect.propTypes = {
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  setConnectPageFields: PropTypes.func.isRequired,
  submitConnectPageForm: PropTypes.func.isRequired,
  setOpenConnect: PropTypes.func.isRequired,
  setOpenSuscribe: PropTypes.func.isRequired,
  errorEmail: PropTypes.bool.isRequired,
  errorPassword: PropTypes.bool.isRequired,
  setOpenRenew: PropTypes.func.isRequired,
};

export default Connect;
