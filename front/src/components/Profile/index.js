import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import './profile.scss';

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

const Profile = ({
  firstnameValue,
  errorFirstname,
  lastnameValue,
  errorLastname,
  emailValue,
  errorEmail,
  phoneValue,
  errorPhone,
  setProfilePageFields,
  saveProfileChange,
  userDatas,
  setOpenProfile,
  password,
  errorPassword,
  confirmPassword,
  errorConfirmPassword,
  saveNewPassword,
}) => {
  useEffect(() => {
    setProfilePageFields('firstnameValue', userDatas.firstname);
    setProfilePageFields('lastnameValue', userDatas.lastname);
    setProfilePageFields('phoneValue', userDatas.phone);
    setProfilePageFields('emailValue', userDatas.email);
  }, []);

  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };
  const classes = useStyles();

  return (
    <div className="profile">
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
              setOpenProfile(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Mes informations
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="profile-content">
        <DialogContent>
          <DialogTitle id="form-dialog-title">
            Mon profil
          </DialogTitle>
        </DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let error = false;
            if (lastnameValue.length < 3) {
              setProfilePageFields('errorLastname', true);
              error = true;
            }
            if (firstnameValue.length < 3) {
              setProfilePageFields('errorFirstname', true);
              error = true;
            }
            const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!mailRegEx.test(emailValue)) {
              setProfilePageFields('errorEmail', true);
              error = true;
            }
            const phoneRegEx = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
            if (!phoneRegEx.test(phoneValue)) {
              setProfilePageFields('errorPhone', true);
              error = true;
            }
            if (!error) {
              handleClickOpen();
            }
          }}
        >
          <DialogContent>
            <TextField
              error={errorFirstname}
              id="firstname"
              label="Prénom"
              variant="outlined"
              value={firstnameValue}
              onChange={(event) => {
                setProfilePageFields('errorFirstname', false);
                if (event.target.value.length < 3) {
                  setProfilePageFields('errorFirstname', true);
                }
                setProfilePageFields('firstnameValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={errorLastname}
              id="lastname"
              label="Nom"
              variant="outlined"
              value={lastnameValue}
              onChange={(event) => {
                setProfilePageFields('errorLastname', false);
                if (event.target.value.length < 3) {
                  setProfilePageFields('errorLastname', true);
                }
                setProfilePageFields('lastnameValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={errorPhone}
              id="phone"
              label="N° de téléphone"
              variant="outlined"
              value={phoneValue}
              onChange={(event) => {
                setProfilePageFields('errorPhone', false);
                const phoneRegEx = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
                if (!phoneRegEx.test(event.target.value)) {
                  setProfilePageFields('errorPhone', true);
                }
                setProfilePageFields('phoneValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={errorEmail}
              id="mail"
              label="adresse mail"
              variant="outlined"
              value={emailValue}
              onChange={(event) => {
                setProfilePageFields('errorEmail', false);
                const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!mailRegEx.test(event.target.value)) {
                  setProfilePageFields('errorEmail', true);
                }
                setProfilePageFields('emailValue', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Sauvegarder
            </Button>
          </DialogContent>
        </form>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let error = false;
            if (password.length < 6) {
              error = true;
              setProfilePageFields('errorPassword', true);
            }
            if (confirmPassword.length < 6 || confirmPassword !== password) {
              error = true;
              setProfilePageFields('errorConfirmPassword', true);
            }
            if (!error) {
              handleClickOpenPassword();
            }
          }}
        >
          <DialogContent>
            <DialogTitle id="form-dialog-title">
              Modification du mot de passe (min 6 caractères)
            </DialogTitle>
          </DialogContent>
          <DialogContent>
            <TextField
              error={errorPassword}
              type="password"
              label="nouveau mot de passe"
              variant="outlined"
              value={password}
              onChange={(event) => {
                if (event.target.value.length < 6) {
                  setProfilePageFields('errorPassword', true);
                }
                else {
                  setProfilePageFields('errorPassword', false);
                }
                setProfilePageFields('password', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={errorConfirmPassword}
              type="password"
              label="confirmation"
              variant="outlined"
              value={confirmPassword}
              onChange={(event) => {
                if (event.target.value.length < 6 || event.target.value !== password) {
                  setProfilePageFields('errorConfirmPassword', true);
                }
                else {
                  setProfilePageFields('errorConfirmPassword', false);
                }
                setProfilePageFields('confirmPassword', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              startIcon={<VpnKeyOutlinedIcon />}
            >
              Modifier
            </Button>
          </DialogContent>
        </form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Modification du profil</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous êtes sur le point de modifier votre profil
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              annuler
            </Button>
            <Button
              onClick={() => {
                handleClose();
                saveProfileChange();
              }}
              color="primary"
              autoFocus
            >
              sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openPassword}
          onClose={handleClosePassword}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Modification du mot de passe</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous êtes sur le point de votre mot de passe
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePassword} color="primary">
              annuler
            </Button>
            <Button
              onClick={() => {
                handleClosePassword();
                saveNewPassword();
              }}
              color="primary"
              autoFocus
            >
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

Profile.propTypes = {
  firstnameValue: PropTypes.string.isRequired,
  lastnameValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  phoneValue: PropTypes.string.isRequired,
  setProfilePageFields: PropTypes.func.isRequired,
  saveProfileChange: PropTypes.func.isRequired,
  userDatas: PropTypes.object.isRequired,
  setOpenProfile: PropTypes.func.isRequired,
  errorFirstname: PropTypes.bool.isRequired,
  errorLastname: PropTypes.bool.isRequired,
  errorEmail: PropTypes.bool.isRequired,
  errorPhone: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  errorPassword: PropTypes.bool.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  errorConfirmPassword: PropTypes.bool.isRequired,
  saveNewPassword: PropTypes.func.isRequired,
};

export default Profile;
