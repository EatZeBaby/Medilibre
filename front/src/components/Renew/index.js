import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import './renew.scss';

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

const Renew = ({
  setOpenRenew,
  email,
  errorEmail,
  setRenewFields,
  submitRenewForm,
}) => {
  const classes = useStyles();

  return (
    <div className="renew">
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
              setOpenRenew(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Mot de passe oublié
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="renew-content">
        <DialogContent>
          <DialogTitle id="form-dialog-title">Mot de passe oublié</DialogTitle>
          <DialogContentText>
            Pour recuperer votre mot de passe veuillez renseigner votre adresse email de Connexion
          </DialogContentText>
        </DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setRenewFields('errorEmail', false);
            const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!mailRegEx.test(email)) {
              setRenewFields('errorEmail', true);
            }
            else {
              submitRenewForm();
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
              value={email}
              onChange={(event) => {
                setRenewFields('errorEmail', false);
                const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!mailRegEx.test(event.target.value)) {
                  setRenewFields('errorEmail', true);
                }
                setRenewFields('email', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Envoyer
            </Button>
          </DialogContent>
        </form>
      </div>
    </div>
  );
};

Renew.propTypes = {
  setOpenRenew: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  errorEmail: PropTypes.bool.isRequired,
  setRenewFields: PropTypes.func.isRequired,
  submitRenewForm: PropTypes.func.isRequired,
};

export default Renew;
