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

import './suscribe.scss';

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

const Suscribe = ({
  firstnameValue,
  firstnameError,
  lastnameValue,
  lastnameError,
  emailValue,
  emailError,
  phoneValue,
  phoneError,
  passwordValue,
  passwordError,
  confirmPasswordValue,
  confirmPasswordError,
  setSuscribePageFields,
  submitSuscribePageForm,
  setOpenSuscribe,
  setOpenConnect,
}) => {
  const classes = useStyles();

  return (
    <div className="suscribe">
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
              setOpenSuscribe(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Inscription
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="suscribe-content">
        <DialogContent>
          <DialogTitle id="form-dialog-title">Création d'un nouveau compte utilisateur</DialogTitle>
          <Button
            color="primary"
            onClick={() => {
              setOpenSuscribe(false);
              setOpenConnect(true);
            }}
          >
            Déja inscrit? Se connecter
          </Button>
        </DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let error = false;
            if (lastnameValue.length < 3) {
              setSuscribePageFields('lastnameError', true);
              error = true;
            }
            if (firstnameValue.length < 3) {
              setSuscribePageFields('firstnameError', true);
              error = true;
            }
            const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!mailRegEx.test(emailValue)) {
              setSuscribePageFields('emailError', true);
              error = true;
            }
            const phoneRegEx = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
            if (!phoneRegEx.test(phoneValue)) {
              setSuscribePageFields('phoneError', true);
              error = true;
            }
            if (passwordValue.length < 5) {
              setSuscribePageFields('passwordError', true);
              error = true;
            }
            if (confirmPasswordValue.length < 5
              || passwordValue !== confirmPasswordValue
            ) {
              error = true;
              setSuscribePageFields('confirmPasswordError', true);
            }
            if (!error) {
              submitSuscribePageForm();
            }
          }}
        >
          <DialogContent>
            <TextField
              error={lastnameError}
              id="lastname"
              type="text"
              label="Nom"
              variant="outlined"
              value={lastnameValue}
              onChange={(event) => {
                setSuscribePageFields('lastnameError', false);
                if (event.target.value.length < 3) {
                  setSuscribePageFields('lastnameError', true);
                }
                setSuscribePageFields('lastnameValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={firstnameError}
              id="firstname"
              type="text"
              label="Prénom"
              variant="outlined"
              value={firstnameValue}
              onChange={(event) => {
                setSuscribePageFields('firstnameError', false);
                if (event.target.value.length < 3) {
                  setSuscribePageFields('firstnameError', true);
                }
                setSuscribePageFields('firstnameValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={emailError}
              id="email"
              type="email"
              label="adresse mail"
              variant="outlined"
              value={emailValue}
              onChange={(event) => {
                setSuscribePageFields('emailError', false);
                const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!mailRegEx.test(event.target.value)) {
                  setSuscribePageFields('emailError', true);
                }
                setSuscribePageFields('emailValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={phoneError}
              id="phone"
              type="Phone"
              label="N° de téléphone"
              variant="outlined"
              value={phoneValue}
              onChange={(event) => {
                setSuscribePageFields('phoneError', false);
                const phoneRegEx = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
                if (!phoneRegEx.test(event.target.value)) {
                  setSuscribePageFields('phoneError', true);
                }
                setSuscribePageFields('phoneValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={passwordError}
              id="pasword"
              type="password"
              label="Mot de passe"
              variant="outlined"
              value={passwordValue}
              onChange={(event) => {
                setSuscribePageFields('passwordError', false);
                if (event.target.value.length < 5) {
                  setSuscribePageFields('passwordError', true);
                }
                setSuscribePageFields('passwordValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={confirmPasswordError}
              id="confirmPasword"
              type="password"
              label="Mot de passe confirmation"
              variant="outlined"
              value={confirmPasswordValue}
              onChange={(event) => {
                setSuscribePageFields('confirmPasswordError', false);
                if (event.target.value.length < 5
                  || event.target.value !== passwordValue
                ) {
                  setSuscribePageFields('confirmPasswordError', true);
                }
                setSuscribePageFields('confirmPasswordValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Creez votre compte
            </Button>
          </DialogContent>
        </form>
      </div>

    </div>
  );
};

Suscribe.propTypes = {
  firstnameValue: PropTypes.string.isRequired,
  firstnameError: PropTypes.bool.isRequired,
  lastnameValue: PropTypes.string.isRequired,
  lastnameError: PropTypes.bool.isRequired,
  emailValue: PropTypes.string.isRequired,
  emailError: PropTypes.bool.isRequired,
  phoneValue: PropTypes.string.isRequired,
  phoneError: PropTypes.bool.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordError: PropTypes.bool.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  confirmPasswordError: PropTypes.bool.isRequired,
  setSuscribePageFields: PropTypes.func.isRequired,
  submitSuscribePageForm: PropTypes.func.isRequired,
  setOpenSuscribe: PropTypes.func.isRequired,
  setOpenConnect: PropTypes.func.isRequired,
};

export default Suscribe;
